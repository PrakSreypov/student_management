const {getList, getOne, create, update, remove} = require('../controllers/test.controller')

const test = (app) => {
    app.get('/api/test', getList);
    app.get('/api/test/:id', getOne);
    app.post('/api/test', create);
    app.put('/api/test', update);
    app.delete('/api/test/:id', remove)
}

module.exports = {
    test
}