const db = require("../config/db");
const { logError } = require("../config/service");

const getList = async (req, res) => {
  try {
		// who is request this api?
    const [data] = await db.query("SELECT * FROM Role;");

    res.json({
      Role: data,
			user_try_req: req.user
    });
  } catch (error) {
    logError("Role.getList", error, res);
    // res.status(500).send("Internal error server");
    // console.log(error)
  }
};

const getOne = async (req, res) => {
  try {
    // const Id = req.params.Id;
    const param = {
      Id: req.params.Id,
    };

    const [data] = await db.query("SELECT * FROM Role WHERE Id = :Id", param);

    res.json({
      Role: data,
    });
  } catch (error) {
    logError("Role.getOne", error, res);
  }
};

const create = async (req, res) => {
  try {
    const param = {
      Name: req.body.Name,
      Code: req.body.Code,
    };

    const [data] = await db.query(
      "INSERT INTO Role (Name, Code) VALUES (:Name, :Code);",
      param
    );
    res.json({
      msg: "Create success",
      data: data,
    });
  } catch (error) {
    logError("Role.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    const param = {
      Id: req.body.Id,
      Name: req.body.Name,
      Code: req.body.Code,
    };

    const [data] = await db.query(
      "UPDATE Role SET Name=:Name, Code=:Code WHERE Id = :Id",
      param
    );
    res.json({
      data,
    });
  } catch (error) {
    logError("Role.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    const param = {
      Id: req.params.Id,
    };

    const [data] = await db.query("DELETE FROM Role WHERE Id = :Id", param);
    res.json({
      msg: "remove success",
    });
  } catch (error) {
    logError("Role.remove", error, res);
  }
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
};
