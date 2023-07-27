// require in userModelSQL
const db = require('../models/userModel');

// define inventoryController object
const inventoryController = {};

// define query getIdQuery to grab user id; search using email
const getIdQuery = `SELECT id FROM users WHERE email = ($1)`;
// define query getFridgeQuery to grab wholistic fridge_contents data for a user
const getFridgeQuery = `SELECT * FROM fridge_contents WHERE user_id = ($1)`;

// @description Get types data for dropdown menu
// @route GET /api/inventory/types
// @access Public
inventoryController.getTypes = async (req, res, next) => {
  try {
    // define getTypesQuery to grab wholistic shelf_life data
    const getTypesQuery = 'SELECT * FROM shelf_life';
    // execute getTypesQuery, assign response to constant shelfLifeData
    const shelfLifeData = await db.query(getTypesQuery);
    // assign res.locals.shelfLifeData to shelfLifeData
    res.locals.shelfLifeData = shelfLifeData;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.log(error);
    // return invocation of next, passing in error
    return next(error);
  }
}

// @description Get fridge items for a user
// @route GET /api/inventory/:email
// @access Public
inventoryController.getItem = async (req, res, next) => {
  // deconstruct request parameters
  const { email } = req.params;

  try {
    // execute getIdQuery, assign response to constant user
    const user = await db.query(getIdQuery, [email]);
    // declare a constant id, assign it the row id value from user
    const id = user.rows[0].id;
    // execute getFridgeQuery, assign response to constant fridgeContents
    const fridgeContents = await db.query(getFridgeQuery, [id]);
    // assign res.locals.fridgeContents to fridgeContents
    res.locals.fridgeContents = fridgeContents;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.log(error);
    // return invocation of next, passing in error
    return next(error);
  }
};

// @description Add new fridge item for a user
// @route POST /api/inventory
// @access Public
inventoryController.setItem = async (req, res, next) => {
  // deconstruct request body
  const { email, name, type, purchaseDate } = req.body;

  try {
    // define query shelfLifeQuery to grab all shelf_life data associated with type
    const shelflifeQuery = `SELECT * FROM shelf_life WHERE type = ($1)`;
    // execute shelfLifeQuery, assign response to constant shelfLifeData
    const shelfLifeData = await db.query(shelflifeQuery, [type]);
    // declare constant category, assign to category value from shelfLifeData
    const category = shelfLifeData.rows[0].category;

    // convert expDate to desired date format
    const expDate = new Date(purchaseDate);
    const days = expDate.getDate() + shelfLifeData.rows[0].exp_days;
    expDate.setDate(days);
    expDate.toDateString();
    
    // execute getIdQuery, assign response to constant user
    const user = await db.query(getIdQuery, [email]);
    // declare a constant id, assign it the row id value from user
    const id = user.rows[0].id;
    // declare values array for setItemQuery query
    const values = [id, name, type, category, expDate];
    /// define query setItemQuery to insert new row into fridge_contents; return new data
    const setItemQuery = 'INSERT INTO fridge_contents (user_id, name, type, category, exp_date) VALUES ($1, $2, $3, $4, $5)';
    // execute setItemQuery to add item into database
    await db.query(setItemQuery, values);
    // execute getFridgeQuery, assign response to constant fridgeContents
    const fridgeContents = await db.query(getFridgeQuery, [id]);
    // assign res.locals.fridgeContents to fridgeContents
    res.locals.fridgeContents = fridgeContents;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.log(error);
    // return invocation of next, passing in err
    return next(error);
  }
};

// @description Delete fridge items for a user
// @route DELETE /api/inventory
// @access Public
inventoryController.deleteItem = async (req, res, next) => {
  // deconstruct request body
  const { email, selectedRows } = req.body;

  try {
    // define query deleteQuery to delete item from fridge_contents
    const deleteQuery = `DELETE FROM fridge_contents WHERE id = $1`
    // loop through selectedRows array 
    for (let i = 0; i < selectedRows.length; i++){
      // execute selectedRows with value of current selectedRows elements id
      await db.query(deleteQuery, [selectedRows[i].id]);
    }

    // execute getIdQuery, assign response to constant user
    const user = await db.query(getIdQuery, [email]);
    // declare a constant id, assign it the row id value from user
    const id = user.rows[0].id;
    // execute getFridgeQuery, assign response to constant fridgeContents
    const fridgeContents = await db.query(getFridgeQuery, [id]);
    // assign res.locals.fridgeContents to fridgeContents
    res.locals.fridgeContents = fridgeContents;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.log(error);
    // return invocation of next, passing in err
    return next(error);
  }
};

// export inventoryController
module.exports = inventoryController;