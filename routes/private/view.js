const db = require('../../connectors/db');
const { getSessionToken , getUser } = require('../../utils/session');


function handlePrivateFrontEndView(app) {

app.get('/dashboard' , async (req , res) => {
        
        const user = await getUser(req);
        if (!user) {
            return res.status(401).redirect('/login'); 
        }
        console.log('user info' , user)
        if(user.role == "admin" ){
            return res.render('adminHomepage');
        }
        else{
        return res.render('customerHomepage' , {name : user.username});
        }
});
app.get('/home' , (req , res) => {    
            return res.render('index' , 
            {title : "Engineered Assets" , 
            desc : "A professional and technical name, referring to the assets (tools and equipment) used in engineering.",
            });
});
//users
app.get('/userprofile', async (req, res) => {
    return res.render('userprofile');
});
app.get('/customerHomepage', async (req, res) => {
    return res.render('customerHomepage');
});
app.get('/UserEquipments',async (req, res) => {
    let result;
    try{
        const user = await getUser(req);
        if(user.role != "standard user"){
            return res.status(401).send("Un authorized User")
        }
        result = await db.select('*').from("inventory_system.Equipments");
        console.log("Equipments" , result);
        return res.render('UserEquipments' , {result});
    }catch(error){
        console.log("error message",error.message);
        result = error.message;
    }
    return res.render('UserEquipments' , {result});
});
app.get('/cart', async (req, res) => {
    let result;
    const user = await getUser(req);
    if(user.role != "standard user"){
        return res.status(401).send("Un authorized User")
    }
    try {
        result = await db
        .select(
            'Cart.cartID',
            'Cart.quantity',
            'Equipments.equipmentID',
            'Equipments.equipmentName',
            'Equipments.equipmentImg',
            'Equipments.price',
            db.raw('"Equipments"."price" * "Cart"."quantity" AS "totalPrice"') // Correctly reference table and column names
        )
        .from('inventory_system.Cart')
        .join('inventory_system.Equipments', 'Cart.equipmentID', 'Equipments.equipmentID')
        .where('Cart.userID', user.userID);
    

        // Calculate the grand total
        const grandTotal = result.reduce((sum, item) => sum + Number(item.totalPrice), 0);

        console.log("Cart items for user", result);
        console.log("Grand Total:", grandTotal);

        return res.render('cart', { cartItems: result, grandTotal });
    } catch (error) {
        console.log("Error message:", error.message);
        return res.render('cart', { cartItems: [], grandTotal: 0, error: error.message });
    }
});
app.get('/order', async (req, res) => {
    let result;
    const user = await getUser(req); // Fetch the logged-in user
  
    if (!user) {
        return res.status(401).redirect('/login'); // Unauthorized, redirect to login
    }
  
    try {
        // Fetch all orders for the logged-in user
        result = await db
            .select(
                'Orders.orderID',
                'Orders.userID',
                'Equipments.equipmentName',
                'Orders.quantity',
                'Equipments.price',
                db.raw('"Orders"."quantity" * "Equipments"."price" as "totalPrice"') // Calculate total price
            )
            .from('inventory_system.Orders')
            .join('inventory_system.Equipments', 'Orders.equipmentID', 'Equipments.equipmentID')
            .where('Orders.userID', user.userID)
            .groupBy('Orders.orderID', 'Equipments.equipmentName', 'Orders.quantity', 'Equipments.price');

        const grandTotal = result.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

        console.log(`All orders for user ${user.userID}:`, result);
        console.log(`Grand total for user ${user.userID}:`, grandTotal);
  
        return res.render('order', { result, grandTotal });
    } catch (error) {
        console.log("Error fetching orders:", error.message);
        return res.render('order', { orders: {}, grandTotal: 0, error: error.message });
    }
});
//admins
app.get('/adminHomepage', async (req, res) => {
    return res.render('adminHomepage');
});
app.get('/profile' ,async (req , res) => {
        const user = await getUser(req);
        if(user.role != "admin"){
            return res.status(401).send("Un authorized User")
        }    
        return res.render('profile');
});
app.get('/Equipments' , async (req , res) => {
    const user = await getUser(req);
    if(user.role != "admin"){
        return res.status(401).send("Un authorized User")
    }  
        let result;
        try{
            const user = await getUser(req);
            if(user.role != "admin"){
                return res.status(401).send("Un authorized User")
            }
            result = await db.select('*').from("inventory_system.Equipments");
            console.log("Equipments" , result);
            return res.render('Equipments' , {result : result});
        }catch(error){
            console.log("error message",error.message);
            result = error.message;
        }
        return res.render('Equipments' , {result});
});
app.get('/addEquipments',async (req, res) => {
        const user = await getUser(req);
        if(user.role != "admin"){
            return res.status(401).send("Un authorized User")
        }
        return res.render('AddEquipments');
});
app.get('/admincart', async (req, res) => {
        let result;
        const user = await getUser(req);
        if (!user) {
            return res.status(401).redirect('/login'); 
        }
        try {
            result = await db
            .select(
                'Cart.cartID',
                'Cart.quantity',
                'Equipments.equipmentID',
                'Equipments.equipmentName',
                'Equipments.equipmentImg',
                'Equipments.price',
                db.raw('"Equipments"."price" * "Cart"."quantity" AS "totalPrice"') // Correctly reference table and column names
            )
            .from('inventory_system.Cart')
            .join('inventory_system.Equipments', 'Cart.equipmentID', 'Equipments.equipmentID')
            .where('Cart.userID', user.userID);
        
    
            // Calculate the grand total
            const grandTotal = result.reduce((sum, item) => sum + Number(item.totalPrice), 0);
    
            console.log("Cart items for user", result);
            console.log("Grand Total:", grandTotal);
    
            return res.render('admincart', { cartItems: result, grandTotal });
        } catch (error) {
            console.log("Error message:", error.message);
            return res.render('admincart', { cartItems: [], grandTotal: 0, error: error.message });
        }
});
app.get('/adminorder', async (req, res) => {
    let result;
    const user = await getUser(req); // Fetch the logged-in user
  
    if (!user) {
        return res.status(401).redirect('/login'); // Unauthorized, redirect to login
    }
  
    try {
        // Fetch all orders for the logged-in user
        result = await db
            .select(
                'Orders.orderID',
                'Orders.userID',
                'Equipments.equipmentName',
                'Orders.quantity',
                'Equipments.price',
                db.raw('"Orders"."quantity" * "Equipments"."price" as "totalPrice"') // Calculate total price
            )
            .from('inventory_system.Orders')
            .join('inventory_system.Equipments', 'Orders.equipmentID', 'Equipments.equipmentID')
            .where('Orders.userID', user.userID)
            .groupBy('Orders.orderID', 'Equipments.equipmentName', 'Orders.quantity', 'Equipments.price');

        const grandTotal = result.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

        console.log(`All orders for user ${user.userID}:`, result);
        console.log(`Grand total for user ${user.userID}:`, grandTotal);
  
        return res.render('adminorder', { result, grandTotal });
    } catch (error) {
        console.log("Error fetching orders:", error.message);
        return res.render('adminorder', { orders: {}, grandTotal: 0, error: error.message });
    }
});
      
} 
module.exports = {handlePrivateFrontEndView};
  