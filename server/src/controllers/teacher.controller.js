const { db } = require('../config/db');
const { logError } = require("../config/service");

const getList = async (req, res) => {
  try {
    const sql = "SELECT * FROM Teacher";
    const [data] = await db.query(sql);

    res.json({
      data,
    });
  } catch (error) {
    logError("teacher.getList", error, res);
  }
};

// Get one teacher 
const getOne = async (req, res) => {
  try {
    const param = {
      Id: req.params.id,
    };

    const sql = "SELECT * FROM Teacher WHERE Id = :Id";
    const [data] = await db.query(sql, param);

    res.json({
      data,
    });
  } catch (error) {
    logError("teacher.getOne", error, res);
  }
};

const create = (req, res) => {
  try {
  } catch (error) {
    logError("teacher.getList", error, res);
  }
};

const update = (req, res) => {
  try {
  } catch (error) {
    logError("teacher.getList", error, res);
  }
};

const remove = (req, res) => {
  try {
  } catch (error) {
    logError("teacher.getList", error, res);
  }
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
};
