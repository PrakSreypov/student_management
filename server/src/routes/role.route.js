const {getList, getOne, create, update, remove} = require('../controllers/role.controller');
const {validate_token} = require('../config/service')

const role = (app) => {
    app.get('/api/role', validate_token(), getList);
    app.get('/api/role/:id', getOne);
    app.post('/api/role', validate_token(), create);
    app.put('/api/role', update);
    app.delete('/api/role/:id', remove);
}

module.exports = {
    role,
}