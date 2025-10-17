/*
 * A component that combines an input field with optional add-ons and add-on buttons.
 */

/**
 * Bound data provider identifier for the input group's value.
 */
var dataProvider;

/**
 * Flag indicating whether the input group is enabled for user interaction.
 */
var enabled;

/**
 * Flag indicating whether the input group is editable.
 */
var editable;

/**
 * Format string used to display and parse the input group's value.
 */
var format;

/**
 * The input type for the text field within the input group (e.g. text, password, number).
 */
var inputType;

/**
 * Flag indicating whether the input group is read-only.
 */
var readOnly;

/**
 * Placeholder text displayed when the input field is empty.
 */
var placeholderText;

/**
 * CSS style classes applied to the input group.
 */
var styleClass;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Flag indicating whether the input group is visible.
 */
var visible;

/**
 * An array of add-on objects attached to the input group.
 * Each add-on provides additional content (such as icons or text) adjacent to the input field.
 */
var addOns;

/**
 * An array of add-on button objects attached to the input group.
 * Each add-on button may have its own action handlers and styling.
 */
var addOnButtons;

/**
 * Dimensions of the input group component (width and height).
 */
var size;

/**
 * Tooltip text displayed when hovering over the input group.
 */
var toolTipText;


var handlers = {
    /**
     * Fired when the input group is activated.
     *
     * @param {JSEvent} event The event object containing details about the action event e.g. target element, mouse coordinates
     */
    onAction: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
     *
     * @param {dataproviderType} oldValue The previous value from the data provider
     * @param {dataproviderType} newValue The new value to be set in the data provider
     * @param {JSEvent} event The event object associated with the data change
     * 
     * @return {Boolean} True if the new value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {},

    /**
     * Fired when the input group gains focus.
     *
     * @param {JSEvent} event The event object containing details about the focus gained event
     */
    onFocusGainedMethodID: function() {},

    /**
     * Fired when the input group loses focus.
     *
     * @param {JSEvent} event The event object containing details about the focus lost event
     */
    onFocusLostMethodID: function() {},

    /**
     * Fired when the input group is right-clicked.
     *
     * @param {JSEvent} event The event object containing details about the right-click event
     */
    onRightClick: function() {}
};

/**
 * Adds an addOn to this input group
 *
 * AddOn has the following properties:
 *
 * text - the text of the item
 * position - LEFT or RIGHT (defaults to LEFT)
 *
 * @param {CustomType<bootstrapextracomponents-input-group.AddOn>} addOn - object with text, position (LEFT, RIGHT)
 */
function addAddOn(addOnToAdd) {
}

/**
 * Sets all addOns of this input group
 *
 * AddOn has the following properties:
 *
 * text - the text of the item
 * position - LEFT or RIGHT (defaults to LEFT)
 *
 * @param {Array<CustomType<bootstrapextracomponents-input-group.AddOn>>} addOns addOns - Array of objects with text, position (LEFT, RIGHT)
 */
function setAddOns(addOns) {
}

/**
 * Removes all addOns from this input group
 */
function clearAddOns() {
}

/**
 * Adds an addOnButton to this input group
 *
 * AddOnButton has the following properties:
 *
 * text - the button text
 * position - LEFT or RIGHT (defaults to RIGHT)
 * onAction - function to be called on button click
 * onDoubleClick - function to be called on button double click
 * onRightClick - function to be called on button right click
 * styleClass - the style class of the button (e.g. btn-danger)
 * imageStyleClass - image style class of the button
 *
 * @param {CustomType<bootstrapextracomponents-input-group.AddOnButton>} addOnButton addButtonOnToAdd
 */
function addAddOnButton(addButtonOnToAdd) {
}

/**
 * Sets all addOnButtons of this input group
 *
 * AddOnButton has the following properties:
 *
 * text - the button text
 * position - LEFT or RIGHT (defaults to RIGHT)
 * onAction - function to be called on button click
 * onDoubleClick - function to be called on button double click
 * onRightClick - function to be called on button right click
 * styleClass - the style class of the button (e.g. btn-danger)
 * imageStyleClass - image style class of the button
 *
 * @param {Array<CustomType<bootstrapextracomponents-input-group.AddOnButton>>} addOnButtons An array of AddOnButton objects to configure the input group's buttons, each with properties such as text, position, event handlers, and styling.
 */
function setAddOnButtons(addOnButtons) {
}

/**
 * Removes all addOnButtons from this input group
 */
function clearAddOnButtons(addOnButtons) {
} 


/**
 * Request the focus to this text field.
 * @example %%prefix%%%%elementName%%.requestFocus();
 */
function requestFocus() {
}

/**
 * Type definitions for bootstrapextracomponents-inputgroup types.
 */
var svy_types = {

    /**
     * Represents an add-on element attached to the input group.
     */
    AddOn: {

        /**
         * Additional attributes for the add-on element.
         */
        attributes: null,

        /**
         * The text displayed on the add-on.
         */
        text: null,

        /**
         * The position of the add-on relative to the input field (e.g. LEFT or RIGHT).
         */
        position: null
    },

    /**
     * Represents an add-on button element attached to the input group.
     */
    AddOnButton: {

        /**
         * Additional attributes for the add-on button element.
         */
        attributes: null,

        /**
         * The text displayed on the add-on button.
         */
        text: null,

        /**
         * The unique name identifier for the add-on button.
         */
        name: null,

        /**
         * The position of the add-on button relative to the input field (e.g. LEFT or RIGHT).
         */
        position: null,

        /**
         * The function to be executed when the add-on button is clicked.
         */
        onAction: null,

        /**
         * The function to be executed when the add-on button is double-clicked.
         */
        onDoubleClick: null,

        /**
         * The function to be executed when the add-on button is right-clicked.
         */
        onRightClick: null,

        /**
         * CSS style classes applied to the add-on button.
         */
        styleClass: null,

        /**
         * CSS style classes applied to the add-on button's image or icon.
         */
        imageStyleClass: null
    }
}