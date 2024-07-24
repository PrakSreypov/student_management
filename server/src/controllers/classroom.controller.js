const db = require('../config/db');
const {logError, validate_token} = require('../config/service');

const getList = async (req, res) => {
  try {
    
  } catch (error) {
    logError('classroom.getList', error, res);
  }
}

const getOne = async (req, res) => {
  try {
    
  } catch (error) {
    logError('classroom.getOne', error, res);
  }
}

const create = async (req, res) => {
  try {
    
  } catch (error) {
    logError('classroom.create', error, res);
  }
}

const update = async (req, res) => {
  try {
    
  } catch (error) {
    logError('classroom.update', error, res);
  }
}

const remove = async (req, res) => {
  try {
    
  } catch (error) {
    logError('classroom.remove', error, res);
  }
}

module.exports = {
  getList,
  getOne,
  create,
  update,
  remove
}