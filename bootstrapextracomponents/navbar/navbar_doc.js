/**
 * A component that represents a navigation bar with branding and menu items.
 */

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
 * The dimensions of the navbar component.
 */
var size;

/**
 * The position of the navbar component on the form.
 */
var location;

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
     * @param {JSEvent} event The event object containing details about the click event e.g. target element, mouse coordinates
     * @param {CustomType<bootstrapextracomponents-navbar.menuItem>} menuItem The menu item object that was clicked
     */
    onMenuItemClicked: function() {},

    /**
     * Called when the user clicks on the brand logo or text
     *
     * @param {JSEvent} event The event object containing details about the click event e.g. target element, mouse coordinates
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
 * 
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
 * 
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
 * 
 * @return {dimension} the size of the item.
 */
function getSize(itemId) {
}

/**
 * Type definitions for bootstrapextracomponents-navbar types.
 */
var svy_types = {

    /**
     * Represents a menu item in the navbar.
     */
    menuItem: {

        /**
         * Additional custom HTML attributes for the menu item.
         */
        attributes : null,

        /**
         * Identifier of a menu item. This property is required to allow the component to figure out what item a user selected.
         */
        itemId : null,

        /**
         * Tab order for the menu item in the tab navigation sequence.
         */
        tabindex : null,

        /**
         * The text shown. Is used as placeholder text on INPUT or INPUT_GROUP items.
         */
        text : null,

        /**
         * Determines whether the menu item is interactive or disabled.
         */
        enabled : null,

        /**
         * Custom data associated with the menu item for reference.
         */
        userData : null,

        /**
         * An optional icon added to the menu item. Any glyphicon or font awesome icon can be used (e.g. 'fa fa-car'). When used with INPUT or INPUT_GROUP used as the button's icon.
         */
        iconName : null,

        /**
         * Controls whether an item is shown on the left or on the right of the navbar.
         */
        position : null,

        /**
         * An optional array of sub menus for a MENU_ITEM type. When set, the item will be shown as a dropdown.
         */
        subMenuItems : null,

        /**
         * Function that will be called if the item is clicked on (MENU_ITEM, BUTTON), a submenu is selected (MENU_ITEM with subMenuItems) or the user hits enter, leaves the field or clicks the optional button (INPUT, INPUT_GROUP). If not set, the component will call the onMenuItemClicked method assigned to the component itself.
         */
        onAction : null,

        /**
         * Controls the appearance of the menu item. One of 'MENU_ITEM', 'TEXT', 'BUTTON', 'INPUT' or 'INPUT_GROUP'.
         */
        displayType : null,

        /**
         * Dataprovider for a text field (only used for display types 'INPUT' and 'INPUT_GROUP')
         */
        dataProvider : null,

        /**
         * Text of the optional button shown with INPUT or INPUT_GROUP.
         */
        inputButtonText : null,

        /**
         * Style class to control the optional button shown with INPUT or INPUT_GROUP. Typically one of bootstraps button classes ('btn-default', 'btn-primary', 'btn-success', 'btn-info', 'btn-warning', 'btn-danger', 'btn-link').
         */
        inputButtonStyleClass : null,

        /**
         * When 'true', a MENU_ITEM item will be shown as 'active'.
         */
        isActive : null,

        /**
         * Additional style class(es) of the menu item.
         */
        styleClass : null,

        /**
         * Tooltip text shown when hovering over the menu item.
         */
        tooltip : null,

        /**
         * When set, an INPUT or INPUT_GROUP item will show a typeahead list.
         */
        valuelist : null,

    },

    /**
     * Represents a submenu item in the navbar.
     */
    subMenuItem: {

        /**
         * Identifier of a submenu item. This property is required to allow the component to figure out what item a user selected.
         */
        itemId : null,

        /**
         * Tab order for the submenu item in the tab navigation sequence.
         */
        tabindex : null,

        /**
         * The text shown. Is used as placeholder text on INPUT or INPUT_GROUP items.
         */
        text : null,

        /**
         * Custom data associated with the submenu item for reference.
         */
        userData : null,

        /**
         * An optional icon added to the submenu item. Any glyphicon or font awesome icon can be used (e.g. 'fa fa-car'). When used with INPUT or INPUT_GROUP used as the button's icon.
         */
        iconName : null,

        /**
         * Determines whether the submenu item is interactive or disabled.
         */
        enabled : null,

        /**
         * Function that will be called if the item is clicked.
         */
        onAction : null,

        /**
         * When this property is set to `true`, then the submenu item will be displayed as a visually divider line.
         */
        isDivider : null,

        /**
         * Additional style class(es) of the menu item.
         */
        styleClass : null,

    }
}
