const db = require('../../connectors/db');
const { getSessionToken , getUser } = require('../../utils/session');

function handlePrivateBackendApi(app) {
  
//  (c) Implement API endpoints for Users:
app.get('/users/view', async (req, res) => {
  try {
      const user = await getUser(req);
      const userID = user.userID;
      if (!userID) {
          return res.status(401).send("User not logged in or session invalid.");
      }
      const result = await db.raw(`
          SELECT * 
          FROM "inventory_system"."Users"
          WHERE "userID" = ?
      `, [userID]);
      if (result.rows.length === 0) {
          return res.status(404).send("User not found.");
      }
      return res.status(200).send(result.rows[0]);
  } catch (error) {
      console.error("Error fetching user information:", error.message);
      return res.status(500).send("Internal Server Error");
  }
});
app.get('/api/v1/users/view', async (req, res) => {
  const user = await getUser(req);
  if (user.role !== 'admin') {
    return res.status(301).redirect('/login');
  }
  try {
    const result = await db.raw(`
      SELECT u."userID", u."username", u."email", u."role", u."createdAt"
      FROM "inventory_system"."Users" u
      ORDER BY u."userID";
    `);
    console.log(result);
    return res.status(200).send(result.rows);  
  } catch (err) {
    console.log("Error message", err.message);
    return res.status(400).send("Failed to fetch users");
  }
});
app.put('/api/v1/users/:id', async function (req, res) {
  const user = await getUser(req);
  if (user.role !== 'admin') {
    return res.status(301).redirect('/login');
  }

  const userId = req.params.id; 
  const { username, role } = req.body; 

  try {
    if (!username && !role) {
      return res.status(400).send({ message: 'At least one field (username or role) must be provided to update.' });
    }

    if (username) {
      const duplicateUsername = await db('inventory_system.Users')
        .where('username', username)
        .andWhere('userID', '!=', userId)
        .first();
      if (duplicateUsername) {
        return res.status(400).send({ message: 'The new username is already in use by another user.' });
      }
    }

    if (role && !['admin', 'standard user'].includes(role)) {
      return res.status(400).send({ message: "Role must be 'admin' or 'standard user'." });
    }

    const updates = {};
    if (username) updates.username = username;
    if (role) updates.role = role;

    const updatedUser = await db('inventory_system.Users')
      .where('userID', userId)
      .update(updates)
      .returning(['userID', 'username', 'role', 'email', 'createdAt']);

    return res.status(200).json({
      message: 'User updated successfully.',
      updatedUser: updatedUser[0],
    });
  } catch (err) {
    console.error('Error:', err.message);
    if (err.code === '23505') {
      return res.status(400).send({
        message: 'Username already exists.',
      });
    }
    return res.status(500).send({
      message: 'Could not update user.',
      error: err.message,
    });
  }
});
app.delete('/api/v1/users/:id', async function (req, res) {
  const user = await getUser(req);
  if (user.role !== 'admin') {
    return res.status(301).redirect('/login');
  }

  const userId = req.params.id; 

  try {
    const userExists = await db('inventory_system.Users')
      .where('userID', userId)
      .first();
    if (!userExists) {
      return res.status(404).send({ message: 'User not found.' });
    }

    await db('inventory_system.Users')
      .where('userID', userId)
      .del();
    return res.status(200).send({
      message: 'User deleted successfully.',
      deletedUser: {
        userID: userExists.userID,
        username: userExists.username,
        email: userExists.email,
        role: userExists.role,
        createdAt: userExists.createdAt,
      },
    });
  } catch (err) {
    console.error('Error:', err.message);

    return res.status(500).send({
      message: 'Could not delete user.',
      error: err.message,
    });
  }
});


//  (d) Implement API endpoints for Equipment:
app.post('/api/v1/equipment/new', async (req, res) => {
  try {
      const { equipmentName, equipmentImg, rating, modelNumber, quantity, status, location, categoryID, supplierID, price } = req.body;

      if (!equipmentName || !rating || !quantity || !status || !location || !categoryID || !supplierID || !price) {
          return res.status(400).json({ message: 'All fields are required!' });
      }

      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
      }
      if (quantity < 0) {
        return res.status(400).json({ message: 'Quantity must be bigger than zero' });
      }
      if (price < 0) {
        return res.status(400).json({ message: 'Price must be bigger than zero' });
      }
      
      const newEquipmentData = {equipmentName,equipmentImg: equipmentImg || null, rating, modelNumber,quantity, status,location,categoryID,supplierID,price,};

      const newEquipment = await db('inventory_system.Equipments').insert(newEquipmentData).returning(['equipmentID', 'equipmentName']); 
          res.status(201).json({ message: 'Equipment added successfully!', equipment: newEquipment }); 
        
        } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding equipment', error: error.message });
  }
});
app.get('/api/v1/equipment/view', async (req, res) => {
  const { equipmentID } = req.query; 
  
  try {
    console.log("Equipment ID:", equipmentID);  
    
    const result = await db.select('*').from('inventory_system.Equipments').where('equipmentID', equipmentID);
    
    if (result.length === 0) {
      return res.status(404).send("Equipment not found");
    };
    const equipment = result[0];
    if (Buffer.isBuffer(equipment.equipmentImg)) {
      equipment.equipmentImg = equipment.equipmentImg.toString();
  }
    console.log(equipment);
    return res.status(200).json(equipment);
  } catch (err) {
    console.log("Error message:", err.message);  
    return res.status(400).send("Error fetching equipment details");
  }
});
app.get('/equipment/search', async (req, res) => {
  try {
      const { category, supplier, search } = req.query;

      let query = `
          SELECT e.*, c."categoryName", s."supplierName"
          FROM "inventory_system"."Equipments" e
          JOIN "inventory_system"."Categories" c ON e."categoryID" = c."categoryID"
          JOIN "inventory_system"."Suppliers" s ON e."supplierID" = s."supplierID"
          WHERE 1=1
      `;
      const params = [];

      if (category) {
          params.push(`%${category}%`);
          query += ` AND c."categoryName" ILIKE $${params.length}`;
      }
      if (supplier) {
          params.push(`%${supplier}%`);
          query += ` AND s."supplierName" ILIKE $${params.length}`;
      }
      if (search) {
          params.push(`%${search}%`);
          query += ` AND e."equipmentName" ILIKE $${params.length}`;
      }

      const result = await db.raw(query, params);
      res.status(200).json(result.rows);
  } catch (err) {
      console.error("Error in equipment search", err.message);
      res.status(500).send("Failed to fetch equipment");
  }
});
app.put('/api/v1/equipment/:id', async function (req, res) {
  const user = await getUser(req);
  if (user.role !== 'admin') {
    return res.status(301).redirect('/login');
  }

  const equipmentID = req.params.id; 
  const { quantity, location, price } = req.body; 

  try {
    if (!quantity && !location && !price) {
      return res.status(400).send({ message: 'At least one field must be provided to update the equipment.' });
    }

    if (price !== undefined && price < 0) {
      return res.status(400).send({ message: 'Price cannot be negative.' });
  }

    if (quantity !== undefined && quantity < 0) {
      return res.status(400).send({ message: 'Quantity cannot be negative.' });
    }

    const updates = {};
    if (quantity !== undefined) updates.quantity = quantity;
    if (location) updates.location = location;
    if (price !== undefined) updates.price = price;

    const updatedEquipment = await db('inventory_system.Equipments')
      .where('equipmentID', equipmentID)
      .update(updates)
      .returning(['equipmentID', 'quantity', 'location', 'price']);

    if (updatedEquipment.length === 0) {
      return res.status(404).send({ message: 'Equipment not found.' });
    }

    return res.status(200).json({
      message: 'Equipment updated successfully.',
      updatedEquipment: updatedEquipment[0],
    });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).send({
      message: 'Could not update equipment.',
      error: err.message,
    });
  }
});
app.get('/api/v1/rating/:id', async function (req, res) {
  const equipmentId = req.params.id;
  console.log(equipmentId);

  try {
      const ratings = await db('inventory_system.Rating')
          .where('equipmentID', equipmentId)
          .select('ratingID', 'userID', 'comment', 'score');
      if (ratings.length === 0) {
          return res.status(404).json({ message: 'No ratings found for this equipment.' });
      }
      return res.status(200).json(ratings);

  } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({
          message: 'Could not retrieve ratings.',
          error: err.message,
      });
  }
});
app.delete('/api/v1/equipment/:id', async function (req, res) {
  const user = await getUser(req);
  if (user.role !== 'admin') {
    return res.status(301).redirect('/login');
  }

  const equipmentID = req.params.id; 

  try {
    const equipment = await db('inventory_system.Equipments')
      .where('equipmentID', equipmentID)
      .first();
    if (!equipment) {
      return res.status(404).send({ message: 'Equipment not found.' });
    }

    await db('inventory_system.Equipments')
      .where('equipmentID', equipmentID)
      .del();
    
    return res.status(200).send({
      message: 'Equipment deleted successfully.',
      deletedEquipment: {
        equipmentID: equipment.equipmentID,
        equipmentName: equipment.equipmentName,
        equipmentImg: equipment.equipmentImg,
        rating: equipment.rating,
        modelNumber: equipment.modelNumber,
        purchaseDate: equipment.purchaseDate,
        quantity: equipment.quantity,
        status: equipment.status,
        location: equipment.location,
        categoryID: equipment.categoryID,
        supplierID: equipment.supplierID,
        price: equipment.price
      },
    });
  } catch (err) {
    console.error('Error:', err.message);

    return res.status(500).send({
      message: 'Could not delete equipment.',
      error: err.message,
    });
  }
});
app.get('/Categories', async (req, res) => {
  try {
      const result = await db.select('*').from('inventory_system.Categories');
      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
  }
});
app.get('/Suppliers', async (req, res) => {
  try {
      const result = await db.select('supplierID','supplierName').from('inventory_system.Suppliers');
      res.status(200).json(result);
  } catch (error) {
      console.error('Error fetching Suppliers:', error);
      res.status(500).json({ error: 'Failed to fetch Suppliers' });
  }
});
app.get('/filterEquipments', async (req, res) => {
  const { supplierID, categoryID } = req.query;
  console.log("supplierID in priv api:",supplierID,"categoryID in priv api:",categoryID);
  try {
      const query = db.select('*').from("inventory_system.Equipments");
      if (supplierID) {
          query.where('supplierID', supplierID);
      }
      if (categoryID) {
          query.where('categoryID', categoryID);
      }
      const filter = await query;
      const result = filter.map(item => {
        if (Buffer.isBuffer(item.equipmentImg)) {
          item.equipmentImg = item.equipmentImg.toString();
        }
        return item;
      });
      res.status(200).json(result);
  } catch (error) {
      console.error('Error filtering equipment:', error.message);
      res.status(500).json({ error: 'Failed to filter equipment' });
  }
});




// (e) Implement API endpoints for Rating, Cart and Order:
app.post('/api/v1/rating/new', async function (req, res) {
  const { equipmentID, comment, score } = req.body;
  const user = await getUser(req); 

  if (!user) {
      return res.status(401).json({ message: 'User not logged in.' });
  }

  try {
      if (!equipmentID || !comment || !score) {
          return res.status(400).json({ message: 'Please provide equipmentID, comment, and score.' });
      }
      if (score < 1 || score > 5) {
          return res.status(400).json({ message: 'Score must be between 1 and 5.' });
      }

      const newRating = {
          userID: user.userID,  
          equipmentID,
          comment,
          score
      };

      await db('inventory_system.Rating').insert(newRating);

      return res.status(200).json({ message: 'Successfully added rating.' });
  } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({
          message: 'Could not add rating.',
          error: err.message,
      });
  }
});
app.post('/api/v1/cart/new', async function (req, res) {
  const { equipmentID, quantity } = req.body;
  const user = await getUser(req);
  console.log(user);
  if (!user) {
      return res.status(401).json({ message: 'User not logged in' });
  }
  
  try {
      if (!equipmentID || !quantity || quantity <= 0) {
          return res.status(400).json({ message: 'Please provide a valid equipmentID and quantity.' });
      }

      const equipment = await db('inventory_system.Equipments')
          .where({ equipmentID })
          .first();
      if (!equipment) {
          return res.status(404).json({ message: 'Equipment not found.' });
      }
      if (quantity > equipment.quantity) {
          return res.status(400).json({
              message: `Insufficient stock. Only ${equipment.quantity} items are available.`,
          });
      }

      const grandTotal = equipment.price * quantity;  // Calculate grandTotal

      const existingCartItem = await db('inventory_system.Cart')
          .where('userID', user.userID)
          .andWhere('equipmentID', equipmentID)
          .first();
      if (existingCartItem) {
          await db('inventory_system.Cart')
              .where('cartID', existingCartItem.cartID)
              .update({
                  quantity: existingCartItem.quantity + quantity,
                  grandTotal: (existingCartItem.quantity + quantity) * equipment.price, // Update grandTotal
              });
      } else {
          await db('inventory_system.Cart').insert({
              userID: user.userID,
              equipmentID,
              quantity,
              grandTotal, 
          });
      }
      return res.status(200).json({ message: 'Successfully added equipment to cart.' });

  } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({
          message: 'Could not add equipment to cart.',
          error: err.message,
      });
  }
});
app.delete('/api/v1/cart/delete/:cartID', async function (req, res) {
  const user = await getUser(req);
  const userID = user.userID;
  const cartID = req.params.cartID;
  console.log("User ID:",userID,"/","Cart ID:",cartID);
  try {

    await db('inventory_system.Cart').where('cartID',cartID).where('userID',userID).del();

    return res.status(200).json({ message: 'Successfully removed item from cart.' });
  } catch (err) {
    console.error('Error:', err.message);
    return res.status(500).json({
      message: 'Could not remove equipment from cart.',
      error: err.message,
    });
  }
});
app.post('/api/v1/order/new', async function (req, res) {
  const user = await getUser(req);
  
  if (!user) {
      return res.status(401).json({ message: 'User not logged in' });
  }

  try {
      const cartItems = await db('inventory_system.Cart')
          .where('userID', user.userID);

      if (cartItems.length === 0) {
          return res.status(400).json({ message: 'Cart is empty.' });
      }

      if (user.role === 'standard user') {
          for (const item of cartItems) {
              const equipment = await db('inventory_system.Equipments')
                  .where('equipmentID', item.equipmentID)
                  .first();

              if (!equipment) {
                  return res.status(404).json({
                      message: `Equipment with ID ${item.equipmentID} not found.`,
                  });
              }

              if (equipment.quantity < item.quantity) {
                  return res.status(400).json({
                      message: `Insufficient quantity for equipment: ${equipment.equipmentName}.`,
                      equipmentID: equipment.equipmentID,
                      requested: item.quantity,
                      available: equipment.quantity,
                  });
              }
          }
      }

      const orderItems = cartItems.map(item => ({
          userID: user.userID,
          equipmentID: item.equipmentID,
          quantity: item.quantity,
      }));

      const insertedOrders = await db('inventory_system.Orders').insert(orderItems).returning('orderID');

      const orderID = insertedOrders[0].orderID; 

      const equipmentOrderItems = cartItems.map(item => ({
          orderID: orderID,
          equipmentID: item.equipmentID,
          quantity: item.quantity,
      }));

      if (user.role === 'standard user') {
          for (const item of cartItems) {
              await db('inventory_system.Equipments').where('equipmentID', item.equipmentID).decrement('quantity', item.quantity);
          }
      }

      if (user.role === 'admin') {
          for (const item of cartItems) {
              await db('inventory_system.Equipments')
                  .where('equipmentID', item.equipmentID)
                  .increment('quantity', item.quantity);
          }

          await db('inventory_system.EquipmentOrder').insert(equipmentOrderItems);
      }

      await db('inventory_system.Cart').where('userID', user.userID).del();

      return res.status(201).json({ message: 'Order placed successfully.',orderItems, });

  } catch (err) {
      console.error('Error:', err.message);
      return res.status(500).json({ message: 'Could not place order.', error: err.message,});
  }
});


app.post('/update-cart', async (req, res) => {
  const { cartID, quantity } = req.body;

  if (isNaN(quantity) || quantity <= 0) {
    return res.json({ success: false, message: 'Invalid quantity' });
  }

  try {
    const result = await db.select('Cart.*', 'Equipments.price')
      .from('inventory_system.Cart as Cart')
      .join('inventory_system.Equipments as Equipments', 'Cart.equipmentID', 'Equipments.equipmentID')
      .where('Cart.cartID', cartID);

    if (result.length === 0) {
      return res.json({ success: false, message: 'Cart item not found' });
    }

    const cartItem = result[0];
    const newGrandTotal = cartItem.price * quantity;

    await db('inventory_system.Cart')
      .where('cartID', cartID)
      .update({ quantity, grandTotal: newGrandTotal });

    const totalResult = await db('inventory_system.Cart')
      .sum('grandTotal as total')
      .where('userID', cartItem.userID);

    console.log('Total result:', totalResult);

    const newTotal = totalResult[0].total ? Number(totalResult[0].total) : 0;

    console.log('New total:', newTotal);

    return res.json({
      success: true,
      newGrandTotal: newGrandTotal,  
      newTotal: newTotal  
    });

  } catch (error) {
    console.error('Error updating cart:', error);
    return res.json({ success: false, message: 'Failed to update cart item' });
  }
});
app.get('/api/equipments', async (req, res) => {
  try {
    const result = await db.select('equipmentID','equipmentName','equipmentImg','quantity','rating').from(' inventory_system.Equipments').limit(10);
    res.json(result); 
  } catch (err) {
    console.error('Error fetching equipments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/order/:orderID', async function (req, res) {
  const user = await getUser(req); 
  const userID = user.userID;
  const role = user.role; 
  const orderID = req.params.orderID;

  console.log("User ID:", userID, "Order ID:", orderID, "Role:", role);

  try {
    const order = await db('inventory_system.Orders')
      .select('equipmentID', 'quantity').where({ orderID, userID }).first();

    if (!order) {
      return res.status(404).json({ message: 'Order not found or does not belong to the user.' });
    }

    const { equipmentID, quantity } = order;

    if (role === 'admin') {
      const updateResult = await db('inventory_system.Equipments').where({ equipmentID }).decrement('quantity', quantity);

      if (!updateResult) {
        return res.status(400).json({ message: 'Failed to update equipment quantity.' });
      }
    } else if (role === 'standard user') {
      const updateResult = await db('inventory_system.Equipments').where({ equipmentID }).increment('quantity', quantity);
      if (!updateResult) {
        return res.status(400).json({ message: 'Failed to update equipment quantity.' });
      }
    } else {
      return res.status(400).json({ message: 'Invalid user role.' });
    }

    await db('inventory_system.Orders')
      .where({ orderID, userID })
      .del();

    return res.status(200).json({ message: 'Successfully removed order and updated equipment quantity.' });
  } catch (err) {console.error('Error:', err.message);
    return res.status(500).json({message: 'Could not remove order.',error: err.message, });
  }
});


};
module.exports = {handlePrivateBackendApi};