const {getList, create, update, remove, getOne, studentRegister, studentPayment} = require('../controllers/student.controller');
const {validate_token} = require('../config/service')

const student = (app) => {
    app.get('/api/student', validate_token(),  getList);
    app.get('/api/student/:id', validate_token(), getOne);
    app.post('/api/student', validate_token(), create);
    app.put('/api/student', validate_token(), update);
    app.delete('/api/student/:id', validate_token(), remove);
    app.post('/api/student', validate_token(), studentRegister);
    app.post('/api/student', validate_token(), studentPayment);
}

module.exports = {
    student
}