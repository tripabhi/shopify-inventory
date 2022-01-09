/**
 * Form Validation function for Inventory Items
 * @param {Object} item Item Form objected to be validated
 * @returns
 */
function validateItem(item) {
  var errors = [];
  // Each Item must have a non-null name
  if (!item.name) {
    errors.push("Item Name not specified");
  }
  // Each item must have a non-null price
  if (!item.price) {
    errors.push("Item Price not specified");
  }
  return errors;
}

module.exports = validateItem;
