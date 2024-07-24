const db = require("../config/db");
const { logError, isEmptyOrNull } = require("../config/service");

const getList = async (req, res) => {
  try {
    const sql = "SELECT * FROM Teacher";
    const [data] = await db.query(sql);

    res.json({
      data: data,
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

const create = async (req, res) => {
  try {
    // const param  = {
    //   Firstname: req.body.FirstName,
    //   Lastname: req.body.Lastname,
    //   Gender: req.body.Gender,
    //   Dob: req.body.Dob,
    //   Tel: req.body.Tel,
    //   Image: req.body.Image,
    //   Email: req.body.Email,
    //   Current_Address: req.body.Current_Address,
    //   Note: req.body.Note,
    //   IsActive: req.body.IsActive,
    //   CreateBy: req.body.IsActive,
    // }

    const {
      FirstName,
      LastName,
      Gender,
      Dob,
      Tel,
      Image,
      Email,
      Current_Address,
      Note,
      IsActive,
      CreateBy,
    } = req.body;

    const error = {};
    if (isEmptyOrNull(FirstName)) error.FirstName = "Firstname is required";
    if (isEmptyOrNull(LastName)) error.Lastname = "Lastname is required";
    if (isEmptyOrNull(Tel)) error.Tel = "Tel is required";
    if (Object.keys(error).length > 0) {
      res.json({
        error,
      });
      return;
    }

    const param = {
      FirstName,
      LastName,
      Gender,
      Dob,
      Tel,
      Image,
      Email,
      Current_Address,
      Note,
      IsActive,
      CreateBy: req.username,
    };

    // find existing teacher
    const [findTeacher] = await db.query(
      "SELECT Id from Teacher where (Tel = :Tel OR Email = :Email)",
      param
    );
    if (findTeacher.length > 0) {
      res.json({
        error: {
          account_exist: "Account Already Exist!",
        },
      });
    } else {
      const sql =
        "INSERT INTO Teacher (FirstName, LastName, Gender, Dob, Tel, Image, Email, Current_Address, Note, IsActive, CreateBy) VALUES (:FirstName, :LastName, :Gender, :Dob, :Tel, :Image, :Email, :Current_Address, :Note, :IsActive, :CreateBy)";
      const [data] = await db.query(sql, param);

      res.json({
        list: data,
      });
    }
  } catch (error) {
    logError("teacher.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    const {
      Id,
      FirstName,
      LastName,
      Gender,
      Dob,
      Tel,
      Image,
      Email,
      Current_Address,
      Note,
      IsActive,
      CreateBy,
    } = req.body;

    const error = {};
    if (isEmptyOrNull(Id)) error.Id = "Id is required";
    if (isEmptyOrNull(FirstName)) error.FirstName = "Firstname is required";
    if (isEmptyOrNull(LastName)) error.LastName = "Lastname is required";
    if (isEmptyOrNull(Tel)) error.Tel = "Tel is required";
    if (Object.keys(error).length > 0) {
      res.json({
        error,
      });
      return;
    }

    const param = {
      Id,
      FirstName,
      LastName,
      Gender,
      Dob,
      Tel,
      Image,
      Email,
      Current_Address,
      Note,
      IsActive,
      CreateBy: req.username,
    };

    // find existing teacher
    const [findTeacher] = await db.query(
      "SELECT * from Teacher WHERE (Tel = :Tel OR Email = :Email) AND Id != :Id",
      param
    );
    if (findTeacher.length > 0) {
      res.json({
        error: {
          account_exist: "Tel or Email Already Exist!",
        },
      });
    } else {
      const sql =
        "UPDATE Teacher SET FirstName = :FirstName, LastName=:LastName, Gender=:Gender, Dob=:Dob, Tel=:Tel, Image=:Image, Email=:Email, Current_Address=:Current_Address, Note=:Note, IsActive=:IsActive, CreateBy=:CreateBy WHERE Id = :Id";
      const [data] = await db.query(sql, param);

      res.json({
        list: data,
      });
    }

  } catch (error) {
    logError("teacher.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    param = {
			Id: req.params.id
		}

		const error = {};
		if(isEmptyOrNull(param.Id)){
			error.Id = 'Id is required'
		}
		if (Object.keys(error).length > 0) {
      res.json({
				error: error
			});
			return;
    }

		[result] = await db.query('DELETE FROM Teacher WHERE Id = :Id', param);
		res.json({
			result
		})
  } catch (error) {
    logError("teacher.remove", error, res);
  }
};

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
};
