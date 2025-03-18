var isButton;

var isSplitButton;

var menuItems;

var text;

var styleClass;

var buttonStyleClass;

var imageStyleClass;

var enabled;

var size;

var visible;

var toolTipText;


var handlers = {
    /**
     * @param {JSEvent} event
     */
    onAction: function() {},

    /**
     * @param {JSEvent} event
     * @param {CustomType<bootstrapextracomponents-dropdown.MenuItem>} menuItem
     */
    onMenuItemSelected: function() {}
};

/**
 * Sets the menu items of the Dropdown
 * 
 * @param {Array<CustomType<bootstrapextracomponents-dropdown.MenuItem>>} menuItems An array of bootstrapextracomponents-dropdown.MenuItem items to be set for the Dropdown, replacing any existing items.
 */
function setMenuItems(menuItems) {
}

/**
 * Adds the given menu item to the Dropdown
 * 
 * @param {CustomType<bootstrapextracomponents-dropdown.MenuItem>} menuItem menuItem The bootstrapextracomponents-dropdown.MenuItem item to be added to the Dropdown.
 */
function addMenuItem(menuItem) {
}

/**
 * Removes the menu item with the given item ID
 * 
 * @param {String} itemId The unique identifier of the menu item to be removed from the Dropdown.
 */
function removeMenuItem(itemId) {
}



var svy_types = {

    MenuItem: {

        itemId : null,

        text : null,

        userData : null,

        iconName : null,

        enabled : null,

        onAction : null,

        isDivider : null,

    }
}
