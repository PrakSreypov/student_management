const db = require("../config/db");
const { logError, isEmptyOrNull } = require("../config/service");

const getList = async (req, res) => {
  try {
    const sql = "SELECT * FROM Course";
    const [data] = await db.query(sql);

    res.json({
      data,
    });
  } catch (error) {
    logError("course.getList", error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const param = {
      Id: req.params.id,
    };

    const sql = "SELECT * FROM Course WHERE Id = :Id";
    const [data] = await db.query(sql, param);

    res.json({
      data,
    });
  } catch (error) {
    logError("course.getOne", error, res);
  }
};

const create = async (req, res) => {
  try {
    const param = {
      CategoryId: req.body.CategoryId,
      Name: req.body.Name,
      Description: req.body.Description,
      Image: req.body.Image,
      TotalHour: req.body.TotalHour,
      Price: req.body.Price,
      IsActive: req.body.IsActive,
      CreateBy: req.body.CreateBy,
    };

    const error = {};
    if (isEmptyOrNull(param.CategoryId)) error.CategoryId = "CategoryId is Required.";
    if (isEmptyOrNull(param.Name)) error.Name = "Name is Required.";
    if (Object.keys(error).length > 0) {
      res.json({
        error,
      });
      return;
    }

    const sql = `
      INSERT INTO Course 
        (CategoryId, Name, Description, Image, TotalHour, Price, IsActive, CreateBy) 
      VALUES 
        (:CategoryId, :Name, :Description, :Image, :TotalHour, :Price, :IsActive, :CreateBy)
    `;

    const [data] = await db.query(sql, param);
    return res.status(201).json({
      message: "Course created successfully",
      data,
    });

  } catch (error) {
    logError("course.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    const param = {
      Id: req.body.Id,
      CategoryId: req.body.CategoryId,
      Name: req.body.Name,
      Desc: req.body.Desc,
      Image: req.body.Image,
      TotalHour: req.body.TotalHour,
      Price: req.body.Price,
      IsActive: req.body.IsActive,
    };

    const error = {};
    if (isEmptyOrNull(Id)) error.Id = "Id is required.";
    if (isEmptyOrNull(CategoryId)) error.CategoryId = "CategoryId is Required.";
    if (isEmptyOrNull(Name)) error.Name = "Name is Required.";
    if (Object.keys(error).length > 0) {
      res.json({
        error,
      });
      return;
    }

    const sql =
      "UPDATE Course SET CategoryId=:CategoryId, Name=:Name, Desc=:Desc, Image=:Image, TotalHour=:TotalHour, Price=:Price, IsActive=:IsActive";
    const [data] = await db.query(sql, param);

    res.json({
      data,
    });
  } catch (error) {
    logError("course.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    const param = {
      Id: req.params.id,
    };

    if (isEmptyOrNull(Id)) error.Id = "Id is Required.";
    if (Object.keys(error).length > 0) {
      res.json({
        error,
      });
    }

    const sql = "DELETE FROM Course WHERE Id = :Id";
    const [data] = await db.query(sql, param);

    res.json({
      data,
    });
  } catch (error) {
    logError("course.getOne", error, res);
  }
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
};
