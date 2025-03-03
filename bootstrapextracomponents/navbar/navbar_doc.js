/**
 * The CSS class(es) to be added to navbar element.
 */
var styleClass;

/**
 * An optional branding text shown in the upper left corner (after the optional brandLogo).
 */
var brandText;

/**
 * Tab order for the brandText in the tab navigation sequence.
 */
var brandTextTabindex;

/**
 * An optional media shown as branding logo in the upper left corner.
 */
var brandLogo;

/**
 * An optional media shown as branding logo in the upper left corner.
 */
var brandLogoStyleClass;

/**
 * Tab order for the brandLogo in the tab navigation sequence.
 */
var brandLogoTabindex;

/**
 * The array holding all menu items currently shown. Menu items can be specified either by menuItems or servoyMenu property.
 */
var menuItems;

/**
 * Menu property that defines the menu items to be shown (and all its properties). Can be used instead of menuItems property.
 */
var servoyMenu;

/**
 * Controls whether the component is visible or hidden.
 */
var visible;

/**
 * Inverts the color scheme of the navbar for dark backgrounds.
 */
var inverse;

/**
 * Controls whether the toolbar is fixed to either top or bottom of the screen.
 */
var fixed;

/**
 * When 'true', items of displayType MENU_ITEM will be shown as 'active' when clicked.
 */
var markClickedItemActive;

/**
 * Indicates if the navbar should have a collapsing behavior.
 */
var collapsing;

/**
 * Controls whether the navbar collapses when a menu item is clicked (typically for mobile views).
 */
var collapseOnClick;



var handlers = {
    /**
     * Called whenever a menu item is clicked or a submenu item is selected with the JSEvent and the menuItem object clicked on
     * 
     * @param {JSEvent} event
     * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem
     */
    onMenuItemClicked: function() {},

    /**
     * Called when the user clicks on the brand logo or text
     * 
     * @param {JSEvent} event
     */
    onBrandClicked: function() {}
};

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
