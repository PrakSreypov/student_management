const db = require("../config/db");
const { logError, isEmptyOrNull } = require("../config/service");

const getList = async (req, res) => {
  try {
    [list] = await db.query("SELECT * FROM Category");
    res.json({
      list,
    });
  } catch (error) {
    logError("category.getList", error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const param = {
      id: req.params.id,
    };
    const [list] = await db.query(
      "SELECT * FROM category WHERE Id = :id",
      param
    );
    res.json({
      list,
    });
  } catch (error) {
    logError("category.getOne", error, res);
  }
};

const create = async (req, res) => {
  try {
    const data = {
      Name: req.body.Name,
      Description: req.body.Description,
      IsActive: req.body.IsActive,
    };

		const error = {};

    if (isEmptyOrNull(data.Name)) {
      error.name = 'Name is required!'
    }

		if (isEmptyOrNull(data.IsActive)) {
      error.IsActive = 'IsActive is required!'
    }

		if (Object.keys(error).length > 0) {
      res.json({
				error: error
			});
			return;
    }

    const [result] = await db.query(
      'INSERT INTO category (Name, Description, IsActive) VALUES (:Name, :desc, :IsActive)',
      data
    );
    res.json({
      result
    });
  } catch (error) {
    logError("category.create", error, res);
  }
};


const update = async (req, res) => {
	try {
		const data = {
			id: req.body.id,
			Name: req.body.name,
			desc: req.body.desc,
			IsActive: req.body.IsActive
		}

		const error = {};
		if(isEmptyOrNull(data.id)){
			error.id = 'Id is required'
		}
		if (isEmptyOrNull(data.Name)) {
      error.name = 'Name is required!'
    }

		if (isEmptyOrNull(data.IsActive)) {
      error.IsActive = 'IsActive is required!'
    }

		if (Object.keys(error).length > 0) {
      res.json({
				error: error
			});
			return;
    }

		const [result] = await db.query('UPDATE category SET name= :Name, Description= :desc, IsActive=:IsActive WHERE id=:id', data);
		res.json({
			result
		})
	} catch (error) {
		logError('category.update', error, res)
	}
};

const remove = async (req, res) => {
	try {
		data = {
			id: req.params.id
		}

		const error = {};
		if(isEmptyOrNull(data.id)){
			error.id = 'Id is required'
		}
		if (Object.keys(error).length > 0) {
      res.json({
				error: error
			});
			return;
    }

		[result] = await db.query('DELETE FROM Category WHERE Id = :id', data);
		res.json({
			result
		})
	} catch (error) {
		logError('category.remove', error, res)
	}
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
};
