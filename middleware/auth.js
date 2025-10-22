const db = require('../connectors/db');
const {getSessionToken} = require('../utils/session');

async function authMiddleware(req, res, next) {
  

// Check if the "Equipments" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables
    where table_schema = 'inventory_system' 
    and table_name = 'Equipments');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Equipments' in schema 'inventory_system'");
}

// Check if the "Suppliers" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Suppliers');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Suppliers' in schema 'inventory_system'");
}

// Check if the "Users" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Users');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Users' in schema 'inventory_system'");
}

// Check if the "Orders" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Orders');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Orders' in schema 'inventory_system'");
}

// Check if the "Cart" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Cart');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Cart' in schema 'inventory_system'");
}

// Check if the "Rating" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Rating');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Rating' in schema 'inventory_system'");
}

// Check if the "EquipmentOrder" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'EquipmentOrder');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'EquipmentOrder' in schema 'inventory_system'");
}

// Check if the "Categories" table exists
result = await db.raw(`
  select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Categories');
`);
status = result.rows[0].exists;
if (status == false) {
  return res.send("You need to create the database table 'Categories' in schema 'inventory_system'");
}

  result = await db.raw(`select exists (
    select * 
    from information_schema.tables 
    where table_schema = 'inventory_system' 
    and table_name = 'Session');`);
  status = result.rows[0].exists;
  if(status == false){
    return res.send("you need to create database table Session in schema backendTutorial")
  }

  const sessionToken = getSessionToken(req);
  //console.log(sessionToken)
  if (!sessionToken) {
    console.log("sesison token is null")
    return res.status(301).redirect('/login');
  }
  // We then get the session of the user from our session map
  // that we set in the signinHandler
  const userSession = await db.select('*').from('inventory_system.Session').where('token', sessionToken).first();
  if (!userSession) {
    console.log("user session token is not found")
    // If the session token is not present in session map, return an unauthorized error
    return res.status(301).redirect('/login');
  }
  // if the session has expired, return an unauthorized error, and delete the 
  // session from our map
  if (new Date() > userSession.expiresAt) {
    console.log("expired session");
    return res.status(301).redirect('/login');
  }

  // If all checks have passed, we can consider the user authenticated
  next();
};


module.exports = {authMiddleware}