const {getList, getOne, create, update, remove, login, refresh_token} = require('../controllers/user.controller');
const {validate_token} = require('../config/service');

const user = (app) => {
  app.get('/api/user',validate_token(),  getList);
  app.post('/api/user/login', login);
  app.get('/api/user/:id', validate_token(), getOne);
  app.post('/api/user', validate_token(),create);
  app.put('/api/user', validate_token(), update);
  app.delete('/api/user/:id', validate_token(), remove);
  app.post('/api/user/refresh_token', refresh_token)
}

module.exports = {
  user
}