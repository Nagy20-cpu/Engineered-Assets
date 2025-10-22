const db = require('../connectors/db');

function getSessionToken(req) {
  
  //console.log("cookie",req.headers.cookie);
  if(!req.headers.cookie){
    return null
  }
  const cookies = req.headers.cookie.split(';')
    .map(function (cookie) { return cookie.trim() })
    .filter(function (cookie) { return cookie.includes('session_token') })
    .join('');

  const sessionToken = cookies.slice('session_token='.length);
  if (!sessionToken) {
    return null;
  }
  return sessionToken;
}

async function getUser(req) {
try{
  const sessionToken = getSessionToken(req);
  if (!sessionToken) {
    console.log("no session token is found")
    return res.status(401).redirect('/login');
  }

  const user = await db.select('*')
    .from({ s: 'inventory_system.Session' })
    .where('token', sessionToken)
    .innerJoin('inventory_system.Users as u', 's.userID', 'u.userID')
    .first(); 

  
  console.log('user =>', user)
  return user;  
}
catch (error) {
  console.error('Error fetching user:', error);
  return null;
}
}

module.exports = {getSessionToken , getUser};