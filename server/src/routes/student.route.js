const {getList, create, update, remove} = require('../controllers/student.controller')

const student = (app) => {
    app.get('/api/student/getList', getList);
    app.post('/api/student/create', create);
    app.put('/api/student/update', update);
    app.delete('/api/student/remove', remove)
}

module.exports = {
    student
}