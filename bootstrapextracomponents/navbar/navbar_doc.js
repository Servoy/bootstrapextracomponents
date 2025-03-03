/**
 * Sets the menu items of the Navbar
 * 
 * @param {Array<CustomType<bootstrapextracomponents-navbar.menuItem>>} menuItems An array of menu items to be set for the Navbar, replacing any existing menu configuration.
 * 
 * @example
 * %%elementName%%.setMenuItems(menuItems)
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
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>} A newly created menu item object with the specified text, optional ID, and position alignment.
 */
function createMenuItem(text, itemId, position) {
}

/**
 * Removes the menu item with the given item ID
 * 
 * @example
 * %%elementName%%.removeMenuItem('itemID')
 * 
 * @param {String} itemId The unique identifier of the menu item to be removed from the Dropdown.
 */
function removeMenuItem(itemId) {
}

/**
 * Sets the menu item with the given item ID to selected
 * 
 * @example
 * %%elementName%%.setMenuSelected('itemID')
 * 
 * @param {String} itemId The unique identifier of the menu item to be set as selected.
 */
function setMenuSelected(itemId) {
}

/**
 * Enables or disables the menu with the given item ID
 * 
 * @example
 * %%elementName%%.setMenuItemEnabled('itemID',false)
 * 
 * @param {String} itemId The unique identifier of the menu item to enable or disable.
 * @param {Boolean} enabled A flag indicating whether to enable (true) or disable (false) the specified menu item.
 */
function setMenuItemEnabled(itemId, enabled) {
}

/**
 * Enables or disables the submenu with the given item ID of the menu with the given item ID
 * 
 * @example
 * %%elementName%%.setSubMenuItemEnabled('itemID','submenuID',false)
 * 
 * @param {String} itemId The unique identifier of the menu item containing the submenu.
 * @param {String} submenuItemId The unique identifier of the submenu item to enable or disable.
 * @param {Boolean} enabled A flag indicating whether to enable (true) or disable (false) the specified submenu item.
 */
function setSubMenuItemEnabled(itemId, submenuItemId, enabled) {
}

/**
 * Returns the menu item with the given ID or null if not found
 * 
 * @param {String} itemId The unique identifier of the menu item to retrieve.
 * 
 * @example
 * var item = %%elementName%%.getMenuItem('itemID')
 * 
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>} The menu item with the specified ID, or null if no such item exists.
 */
function getMenuItem(itemId) {
}

/**
 * Returns the currently selected menu item
 * 
 * @example
 * var item = %%elementName%%.getSelectedMenu()
 * 
 * @return {CustomType<bootstrapextracomponents-navbar.menuItem>} The currently selected menu item, or null if no item is selected.
 */
function getSelectedMenu() {
}

/** 
 * Sets focus on the passed element on the navbar
 * 
 * @example
 * %%elementName%%.requestFocus('itemId')
 * 
 * @param {String} itemId The unique identifier of the menu item on the navbar to set focus on.
 */
function requestFocus(itemId) {
}

/** 
 * Opens the submenu of the specified menu item.
 * 
 * @example
 * %%elementName%%.openSubMenu('itemId')
 * 
 * @param {String} itemId The unique identifier of the menu item whose submenu should be opened.
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
