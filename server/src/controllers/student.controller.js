const db = require("../config/db");
const { logError, isEmptyOrNull } = require("../config/service");

const getList = async (req, res) => {
  try {
    const sql = "SELECT * FROM Student";
    const [data] = await db.query(sql);

    res.json({
      data,
    });
  } catch (error) {
    logError("student.getList", error, res);
  }
};

const getOne = async (req, res) => {
  try {
    const param = {
      Id: req.params.id,
    };

    const sql = "SELECT * FROM Student WHERE Id = :Id";
    const [data] = await db.query(sql, param);
    res.json({
      data,
    });
  } catch (error) {
    logError("student.getOne", error, res);
  }
};

const create = async (req, res) => {
  try {
    const param = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Gender: req.body.Gender,
      Dob: req.body.Dob,
      Tel: req.body.Tel,
      Image: req.body.Image,
      Email: req.body.Email,
      Current_Address: req.body.Current_Address,
      Note: req.body.Note,
      IsActive: req.body.IsActive,
      CreateBy: req.username,
    };

    const error = {};
    if (isEmptyOrNull(param.FirstName))
      error.FirstName = "FirstName is required.";
    if (isEmptyOrNull(param.LastName)) error.LastName = "LastName is required.";
    if (isEmptyOrNull(param.Tel)) error.Tel = "Tel is required.";
    if (Object.keys(error).length > 0) {
      return res.status(400).json({ error });
    }

    const [findStudent] = await db.query(
      "SELECT Id FROM Student WHERE Tel = :Tel OR Email = :Email",
      param
    );

    if (findStudent.length > 0) {
      return res.status(409).json({
        error: {
          account_exist: "Account already exists!",
        },
      });
    } else {
      const sql = `
        INSERT INTO Student (FirstName, LastName, Gender, Dob, Tel, Image, Email, Current_Address, Note, IsActive, CreateBy)
        VALUES (:FirstName, :LastName, :Gender, :Dob, :Tel, :Image, :Email, :Current_Address, :Note, :IsActive, :CreateBy)
      `;

      const [data] = await db.query(sql, param);
      return res.status(201).json({
        message: "Student created successfully",
        data,
      });
    }
  } catch (error) {
    logError("student.create", error, res);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const update = async (req, res) => {
  try {
    const param = {
      Id: req.body.Id,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Gender: req.body.Gender,
      Dob: req.body.Dob,
      Tel: req.body.Tel,
      Image: req.body.Image,
      Email: req.body.Email,
      Current_Address: req.body.Current_Address,
      Note: req.body.Note,
      IsActive: req.body.IsActive,
      CreateBy: req.username,
    };

    // Error object
    const error = {};

    // Validation checks
    if (isEmptyOrNull(param.FirstName)) error.FirstName = 'FirstName is required.';
    if (isEmptyOrNull(param.LastName)) error.LastName = 'LastName is required.';
    if (isEmptyOrNull(param.Tel)) error.Tel = 'Tel is required.';

    // If there are validation errors, return them
    if (Object.keys(error).length > 0) {
      return res.status(400).json({ error });
    }

    // Check for existing student with the same Tel or Email
    const [findStudent] = await db.query(
      'SELECT * FROM Student WHERE (Tel = :Tel OR Email = :Email) AND Id != :Id',
      param
    );

    if (findStudent.length > 0) {
      return res.status(409).json({
        error: {
          account_exist: 'Tel or Email already exists',
        },
      });
    }

    // Update the student's information
    const sql = `
      UPDATE Student SET 
        FirstName = :FirstName, 
        LastName = :LastName, 
        Gender = :Gender, 
        Dob = :Dob, 
        Tel = :Tel, 
        Image = :Image, 
        Email = :Email, 
        Current_Address = :Current_Address, 
        Note = :Note, 
        IsActive = :IsActive, 
        CreateBy = :CreateBy 
      WHERE Id = :Id;
    `;

    const [data] = await db.query(sql, param);

    // Return the updated data
    return res.status(200).json({
      message: 'Student updated successfully',
      data,
    });

  } catch (error) {
    logError('student.update', error, res);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const remove = async (req, res) => {
  try {
    const param = {
      Id: req.params.id,
    };

    // Initialize error object
    const error = {};

    // Validate the Id parameter
    if (isEmptyOrNull(param.Id)) {
      error.Id = "Id is required";
    }

    // If validation errors exist, return them
    if (Object.keys(error).length > 0) {
      return res.status(400).json({
        error,
      });
    }

    // Execute the delete query
    const sql = "DELETE FROM Student WHERE Id = :Id";
    const [result] = await db.query(sql, param);

    // Check if any rows were affected
    if (result.affectedRows > 0) {
      return res.status(200).json({
        msg: "Delete success",
        data: result,
      });
    } else {
      return res.status(404).json({
        msg: "Student not found",
      });
    }

  } catch (error) {
    // Log error and respond with internal server error
    logError("student.remove", error, res);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const studentRegister = async (req, res) => {
  try {
    const param = {
      ClassroomId: req.body.ClassroomId,
      StudentId: req.body.StudentId,
      Discount: req.body.Discount,
      DiscountPrice: req.body.DiscountPrice,
      TotalToPay: req.body.TotalToPay,
      IsCompletedPaid: req.body.IsCompletedPaid,
      Note: req.body.Note,
      RegisterAt: req.body.ClassroomId,
      CreateBy: req.body.ClassroomId,
    }

    const sql = `
        INSERT INTO StudentRegister
        (ClassroomId, StudentId, Discount, DiscountPrice, TotalToPay, IsCompletedPaid, Note, RegisterAt, CreateBy)
        VALUES
        (:ClassroomId, :StudentId, :Discount, :DiscountPrice, :TotalToPay, :IsCompletedPaid, :Note, :RegisterAt, :CreateBy)
      `


  } catch (error) {
    logError('student.register', error, res);
  }
}

const studentPayment = async (req, res) => {
  try {
    
  } catch (error) {
    logError('student.payment', error, res);
  }
}

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove,
  studentRegister,
  studentPayment
};
