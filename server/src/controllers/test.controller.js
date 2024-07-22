let TestList = [
    {
        id: 1,
        title: 'test1',
        desc: 'test1'
    },

    {
        id: 2,
        title: 'test2',
        desc: 'test2'
    },

    {
        id: 3,
        title: 'test3',
        desc: 'test3'
    },
    {
        id: 4,
        title: 'test4',
        desc: 'test4'
    },
]


const getList = (req, res) => {
    res.json({
        TestList
    })
}

const getOne = (req, res) => {
    const id = req.params.id;
    let dataTmp = {};

    TestList.map(item => {
        if (id == item.id) dataTmp = item
    })

    res.json({
        dataTmp
    })
}

const create = (req, res) => {
    let body = req.body;
    TestList.push(body);

    res.json(
        {
            TestList
        }
    )
}

const update = (req, res) => {
    let body = req.body;

    TestList.map((item, index) => {
        if (body.id == item.id){
            TestList[index].title = body.title
            TestList[index].desc = body.desc
        }
    })

    res.json(
        {
            msg: 'update success',
            TestList
        }
    )
}

const remove = (req, res) => {
    var id = req.params.id;
    var dataTmp = [];
    
    TestList.map((item, index) => {
        if (id != item.id) {
            dataTmp.push(item);
        }
    })

    TestList = dataTmp;

    res.json(
        {
            msg: 'Remove Success',
        }
    )
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove
}