/**
 * Sets the menu items of the Navbar
 * 
 * @example
 * %%elementName%%.setMenuItems(menuItems)
 * 
 * @param {Array<CustomType<bootstrapextracomponents-navbar.menuItem>>} menuItems
 */
function setMenuItems(menuItems) {
}

/**
 * Adds the given menu item to the Navbar
 * 
 * @example
 * %%elementName%%.addMenuItem(%%elementName%%.createMenuItem('my menu'))
 * 
 * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem the menuItem to add
 * @param {Number} [index] optional index where the item will be inserted
 */
function addMenuItem(menuItem, index) {
}

/**
 * Creates a new menuItem
 * 
 * @example
 * %%elementName%%.addMenuItem(%%elementName%%.createMenuItem('my menu'))
 * 
 * @param {String} text the item's text
 * @param {String} [itemId] optional ID to identify the item in scripting
 * @param {String} [position] alignment of the item in the navbar as either LEFT or RIGHT
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
 */
function createMenuItem(text, itemId, position) {
}

/**
 * Removes the menu item with the given item ID
 * 
 * @example
 * %%elementName%%.removeMenuItem('itemID')
 * 
 * @param {String} menuItemId
 */
function removeMenuItem(menuItemId) {
}

/**
 * Sets the menu item with the given item ID to selected
 * 
 * @example
 * %%elementName%%.setMenuSelected('itemID')
 * 
 * @param {String} menuItemId
 */
function setMenuSelected(menuItemId) {
}

/**
 * Enables or disables the menu with the given item ID
 * 
 * @example
 * %%elementName%%.setMenuItemEnabled('itemID',false)
 * 
 * @param {String} menuItemId
 * @param {Boolean} enabled
 */
function setMenuItemEnabled(menuItemId, enabled) {
}

/**
 * Enables or disables the submenu with the given item ID of the menu with the given item ID
 * 
 * @example
 * %%elementName%%.setSubMenuItemEnabled('itemID','submenuID',false)
 * 
 * @param {String} menuItemId
 * @param {String} subMenuItemId
 * @param {Boolean} enabled
 */
function setSubMenuItemEnabled(menuItemId, subMenuItemId, enabled) {
}

/**
 * Returns the menu item with the given ID or null if not found
 * 
 * @example
 * var item = %%elementName%%.getMenuItem('itemID')
 * 
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
 */
function getMenuItem(itemId) {
}

/**
 * Returns the currently selected menu item
 * 
 * @example
 * var item = %%elementName%%.getSelectedMenu()
 * 
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>}
 */
function getSelectedMenu() {
}

/** 
 * Sets focus on the passed element on the navbar
 * 
 * @example
 * %%elementName%%.requestFocus('itemId')
 * 
 * @param {String} menuItemId
 */
function requestFocus(itemId) {
}

/** 
 * Opens the submenu of the specified menu item.
 * 
 * @example
 * %%elementName%%.openSubMenu('itemId')
 * 
 * @param {String} menuItemId
 */
function openSubMenu(itemId) {
}

/**
 * Retrieves the screen location of a specific navbar item. Returns the location as point (object with x and y properties).
 * 
 * @example
 * var location = %%elementName%%.getLocation('itemID')
 * 
 * @param {string} itemId the node to retrieve location for.
 * @return {point} the location of the item.
 */
function getLocation(itemId) {
}

/**
 * Retrieves the size of a specific navbar item. Returns the size as dimension (object with width and height properties).
 * 
 * @example
 * var size = %%elementName%%.getSize('itemID')
 * 
 * @param {string} itemId the node to retrieve size for.
 * @return {dimension} the size of the item.
 */
function getSize(itemId) {
}
