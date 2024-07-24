const {getList, getOne, create, update, remove} = require('../controllers/course.controller');

const course = (app) => {
  app.get('/api/course', getList);
  app.get('/api/course/:id', getOne);
  app.post('/api/course', create);
  app.put('/api/course', update);
  app.delete('/api/course/:id', remove);
}

module.exports = {
  course
}