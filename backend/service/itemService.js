var db = require("../db/database");
var validateItem = require("./validateItem");

/**
 * CRUD service for Item Entity :
 * getAllItems, getItemById, createItem, updateItemById
 *
 * Objects used by ItemService:
 * db : Database Connection object
 * validateItem :  Utility function to evaluate validity of Item Form object
 */
itemService = {
  /**
   * Function to get all items in inventory.
   * @param {Function} callback Callback function to be passed by Service user to state logic for Service Result or Error Handling;
   * Callback takes two parameters :  error, result
   */
  getAllItems: function (callback) {
    var sql = "select * from item";
    var params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, rows);
    });
  },
  /**
   * Function to query Item Entity based on their ID or Primary Key
   * @param {int} id Id or Primary Key of the Item being queried
   * @param {Function} callback Callback function to be passed by Service user to state logic for Service Result or Error Handling;
   * Callback takes two parameters :  error, result
   */
  getItemById: function (id, callback) {
    var sql = "select * from item where id = ?";
    var params = [id];
    db.get(sql, params, (err, row) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, row);
    });
  },
  /**
   * Function to persist a new Item Object to the database
   * @param {Object} item Item Form object to be persisted to the Database
   * @param {Function} callback Callback function to be passed by Service user to state logic for Service Result or Error Handling;
   * Callback takes two parameters :  error, result
   */
  createItem: function (item, callback) {
    let errors = validateItem(item);
    if (errors.length > 0) {
      callback({ message: errors.join(",") }, null);
      return;
    }
    var data = {
      name: item.name,
      price: parseFloat(item.price),
      tags: item.tags ? item.tags : "",
      inventoryCount: item.inventoryCount ? parseInt(item.inventoryCount) : 0,
    };
    var sql =
      "INSERT INTO item (name, price, tags, inventory_count) VALUES (?,?,?,?)";
    var params = [data.name, data.price, data.tags, data.inventoryCount];
    db.run(sql, params, function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, {
        data: data,
        id: this.lastID,
      });
    });
  },
  /**
   * Function to update an existing Item Entity in the database
   * @param {Object} item Item Object with changes to be persisted to the database
   * @param {id} id ID or Primary Key of the Item entity to be updated
   * @param {Function} callback Callback function to be passed by Service user to state logic for Service Result or Error Handling;
   * Callback takes two parameters :  error, result
   */
  updateItemById: function (item, id, callback) {
    var data = {
      name: item.name,
      price: item.price ? parseFloat(item.price) : null,
      tags: item.tags ? item.tags : null,
      inventoryCount: item.inventoryCount
        ? parseInt(item.inventoryCount)
        : null,
    };
    var sql = `UPDATE item set 
           name = COALESCE(?,name), 
           price = COALESCE(?,price), 
           tags = COALESCE(?,tags),
           inventory_count = COALESCE(?,inventory_count)
           WHERE id = ?`;
    var params = [data.name, data.price, data.tags, data.inventoryCount, id];
    db.run(sql, params, function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, {
        data: data,
        changes: this.changes,
      });
    });
  },
  /**
   * Function to delete an Item Entity from the database
   * @param {int} id ID or Primary Key of the Item Entity to be deleted
   * @param {Function} callback Callback function to be passed by Service user to state logic for Service Result or Error Handling;
   * Callback takes two parameters :  error, result
   */
  deleteItemById: function (id, callback) {
    db.run("DELETE FROM item WHERE id = ?", id, function (err, result) {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, { changes: this.changes });
    });
  },
};

module.exports = itemService;
