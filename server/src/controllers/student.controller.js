const getList = (req, res) => {
    res.send('get list student from controller');
}

const create = (req, res) => {
    res.send('create student from controller');
}

const update = (req, res) => {
    res.send('update student from controller');
}

const remove = (req, res) => {
    res.send('remove student from controller')
}

module.exports = {
    getList,
    create,
    update,
    remove
}