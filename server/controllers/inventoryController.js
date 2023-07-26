// require in userModelSQL
const db = require('../models/userModelSQL');

// define inventoryController object
const inventoryController = {};

// define query getIdQuery to grab user id; search using email
const getIdQuery = `SELECT id FROM users WHERE email = ($1)`;

// @description Get items
// @route GET /api/items
// @access Public
inventoryController.getItem = async (req, res, next) => {
  // deconstruct request parameters
  const { email } = req.params;

  try {
    // execute getIdQuery, assign response to constant user
    const user = await db.query(getIdQuery, [email]);
    // declare a constant id, assign it the row id value from user
    const id = user.rows[0].id;
    // define query getFridgeQuery to grab all fridge_contents data associated with this user
    const getFridgeQuery = `SELECT * FROM fridge_contents WHERE user_id = ($1)`;
    // execute getFridgeQuery, assign response to to constant fridgeContents
    const fridgeContents = await db.query(getFridgeQuery, [id]);
    // assign fridgeContents to res.locals.getItem
    res.locals.getItem = fridgeContents;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.error(error);
    // return invocation of next, passing in err
    return next(error);
  }
};

// @description Set items
// @route POST /api/items
// @access Private
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

    // date stuff
    const expDate = new Date(purchaseDate);
    const days = expDate.getDate() + shelfLifeData.rows[0].exp_days;
    expDate.setDate(days);
    
    // execute getIdQuery, assign response to constant user
    const user = await db.query(getIdQuery, [email]);
    // declare a constant id, assign it the row id value from user
    const id = user.rows[0].id;
    // declare values array for setItemQuery query
    const values = [id, name, type, category, expDate];
    /// define query setItemQuery to insert new row into fridge_contents; return new data
    const setItemQuery = 'INSERT INTO fridge_contents (user_id, name, type, category, exp_date) VALUES ($1, $2, $3, $4, $5)';
    // execute setItemQuery, assign response to constant newItem
    const newItem = await db.query(setItemQuery, values);

    /* newItem is SQL response with nothing in it, as we are not returning anything from setItemQuery */

    // assign newItem to res.locals.newItem
    res.locals.newItem = newItem;
    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.error(error);
    // return invocation of next, passing in err
    return next(error);
  }
};

// @description Update items
// @route PUT /api/items/:id
// @access Private
inventoryController.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, item, type, category, expDate } = req.body;

    // find user in database
    const user = await UserData.findOne({ email });

    // if no user in database
    if (!user) {
      return res.status(400).json({ message: "No user found" });
    }

    // if each fridgeContents object has a unique id
    const itemIndex = user.fridgeContents.findIndex((food) => {
      return food._id === id;
    });

    // if item not found in fridge
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Fridge content not found" });
    }

    // if item is found update it
    user.fridgeContents[itemIndex] = {
      item,
      type,
      category,
      expDate,
    };

    // save updated document
    await user.save();

    // idea from Robert:
    // get user then copy contetns into obj
    // try findOneandUpdate
    // then change it and re save to database
    // lookup way to go inside a propery in model

    res.locals.updatedItem = user.fridgeContents;
    return next();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// @description Delete item
// @route DELETE /api/items/:id
// @access Private
inventoryController.deleteItem = async (req, res, next) => {
  // deconstruct request body
  const { email, fridgeContents } = req.body;
  // console.log('fridgeContents', fridgeContents);

  try {

    const newFridgeContents = fridgeContents;

    // find user in database
    const user = await UserData.findOneAndUpdate({ email }, 
    {
     fridgeContents: newFridgeContents
    }, 
    {
      upsert: true,
      new: true
    });

    // return invocation of next
    return next();

  // catch - if error experienced during database queries
  } catch (error) {
    // log error
    console.error(error);
    // return invocation of next, passing in err
    return next(error);
  }
};

// export inventoryController
module.exports = inventoryController;