const {getList, getOne, create, update, remove} = require('../controllers/classroom.controller');

const classroom = (app) => {
  app.get('/api/classroom', getList);
  app.get('/api/classroom/:id', getOne);
  app.post('/api/classroom', create);
  app.put('/api/classroom', update);
  app.delete('/api/classroom', remove);
}

module.exports = {
  classroom
}