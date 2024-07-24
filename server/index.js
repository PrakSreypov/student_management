const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json()) // for parsing application/json 
app.use(express.urlencoded({extended: true}))

app.use(cors({ origin: '*' }));

// Route - teacher
const {teacher} = require('./src/routes/teacter.route')
teacher(app)

// Route - student
const {student} = require('./src/routes/student.route')
student(app)

// Route category 
const {category} = require('./src/routes/category.route');
category(app)

// Route test
const {test} = require('./src/routes/test.route')
test(app)

// Route role
const {role} = require('./src/routes/role.route')
role(app)

// Route user
const {user} = require('./src/routes/user.route')
user(app)

// Route classroom
const {classroom} = require('./src/routes/classroom.route')
classroom(app)

const port = 8800;
app.listen(port, () => {
    console.log('Server is running on port', port)
})
