const fs = require('fs/promises');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const {Config} = require('../config/config')

// npm i moment 
// create folder logs 

const logError = async (controller, message, res) => {
  try {
    // Append the log message to the file (create the file if it doesn't exist)
    const timestamp = moment().format("DD/MM/YYYY HH:mm:ss"); // Use 'moment' for formatted timestamp
    const path = './logs/' + controller + '.txt';
    const logMessage = '[' + timestamp + ']' + message + '\n\n';
    await fs.appendFile(path, logMessage);
  } catch (error) {
    console.log('Error writing to log File: ', error);
  }

  res.status(500).send("Internal Server Error!");
}

const isEmptyOrNull = (value) => {
  if(value === "" || value === null || value === undefined){
    return true;
  }
  return;
}

// call in middleware in route that we want to protect (role route, user route, teacher route)
const validate_token = () => {
  return (req, res, next) => {
    let authorization = req.headers.authorization; // token from client
    let token_from_client = null;

    if (authorization != null && authorization != ''){
      token_from_client = authorization.split(' '); // authorization: "Bearer slfoweptklfkjsp;eowp84058947%^"
      token_from_client = token_from_client[1]; // Get only access_token
    }

    if (token_from_client == null ){
      res.status(401).send({
        message: 'Unauthorization',
      });
    } else {
      jwt.verify(token_from_client, Config.ACCESS_TOKEN_KEY, (error, result) => {
        if(error) {
          res.status(401).send({
            message: 'Unauthorization',
            error: error
          });
        } else {
          req.user = result.data; // write user property
          req.user_id = result.data.Id; // write user property
          req.username = result.data.Username; // write user property
          next();
        }
      })
    }

  }
}

module.exports = {
  logError,
  isEmptyOrNull,
  validate_token
}