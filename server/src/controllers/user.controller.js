const { Config } = require('../config/config');
const db = require('../config/db');
const {logError, isEmptyOrNull} = require('../config/service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getList = async (req, res) => {
  try {
    const sql = 'SELECT User.*, Role.Name AS RoleName FROM User LEFT JOIN Role ON User.RoleId = Role.Id;';

    const [users]  = await db.query(sql);
    res.json({
      users
    })
  } catch (error) {
    logError('user.getlist', error, res)
  }
}

const getOne = async (req, res) => {
  try {
    const param = {
      id: req.params.id
    }

    const [user] = await db.query('SELECT * FROM User WHERE Id = :id', param);
    res.json({
      user
    })
  } catch (error) {
    logError('user.getOne', error, res)
  }
}

const create = async (req, res) => {
  try {

    // const hashPwd = bcrypt.hashSync(Password, 10);
    const param = {
      Username: req.body.Username,
      Password: bcrypt.hashSync(req.body.Password, 10),
      RoleId: req.body.RoleId
    }


    const error = {};
    if(isEmptyOrNull(param.Username)) error.Username = 'Username is require!';
    if(isEmptyOrNull(param.Password)) error.Password = 'Password is require!';
    if(isEmptyOrNull(param.RoleId)) error.RoleId = 'RoleId is require!';

    if(Object.keys(error).length > 0){
      res.json({
        error: error
      })
      return;
    }

    const [user] = await db.query('INSERT INTO User (Username, Password, RoleId) VALUES (:Username, :Password, :RoleId)', param);
    res.json({
      user
    })

  } catch (error) {
    logError('user.create', error, res)
  }
}

const update = async (req, res) => {
  try {
    const param = {
      Id: req.body.id,
      Password: req.body.Password
    }

    if (isEmptyOrNull(param.id)) error.Id = 'Id is required';
    if (isEmptyOrNull(param.Password)) error.Password = 'Password is required';

    if(Object.keys(error).length >0) {
      res.json({
        error
      })
      return;
    }

    const [user] = await db.query('UPDATE User SET (Password=:Password) WHERE Id=:Id', param)
  } catch (error) {
    logError('user.update', error, res)
  }
}

const remove = async (req, res) => {
	try {
		data = {
			Id: req.params.id
		}

		const error = {};
		if(isEmptyOrNull(data.Id)){
			error.Id = 'Id is required'
		}
		if (Object.keys(error).length > 0) {
      res.json({
				error: error
			});
			return;
    }

		[result] = await db.query('DELETE FROM User WHERE Id = :Id', data);
		res.json({
			result
		})
	} catch (error) {
		logError('category.remove', error, res)
	}
}

const login = async (req, res) => {
  try {
    const data = {
      Username: req.body.Username,
      Password: req.body.Password,
    };

    const error = {};
    if (isEmptyOrNull(data.Username)) error.Username = "Username is required";
    if (isEmptyOrNull(data.Password)) error.Password = "Password is required";

    if (Object.keys(error).length > 0) {
      res.json({ error });
      return;
    }

    const [users] = await db.query("SELECT * FROM User WHERE Username = :Username", data);

    if (users.length > 0) {
      const user = users[0];
      const isCorrectPwd = bcrypt.compareSync(data.Password, user.Password);

      // Log in success 
      if (isCorrectPwd) {
        // remove property Password from object user 
        delete user.Password;

        // generate JWT 
        const access_token = await jwt.sign({data: user}, Config.ACCESS_TOKEN_KEY, {expiresIn: '1d'})
        res.json({
          msg: "Login success",
          user,
          access_token
        });
        return;
      } 
      
      // Incorrect username or  password
      else {
        res.json({
          error: {
            Password: "Password incorrect",
          },
        });
        return;
      }
    } else {
      res.json({
        error: {
          Username: "User does not exist",
        },
      });
      return;
    }
  } catch (error) {
    logError("user.login", error, res);
  }
};


module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
  login
}