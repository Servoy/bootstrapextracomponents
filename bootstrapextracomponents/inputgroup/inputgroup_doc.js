var dataProvider;

var enabled;

var editable;

var format;

var inputType;

var readOnly;

var placeholderText;

var styleClass;

var tabSeq;

var visible;

var addOns;

var addOnButtons;

var size;

var toolTipText;


var handlers = {
    /**
     * @param {JSEvent} event
     */
    onAction: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
     *
     * @param {${dataproviderType}} oldValue
     * @param {${dataproviderType}} newValue
     * @param {JSEvent} event
     *
     * @returns {Boolean}
     */
    onDataChangeMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onFocusGainedMethodID: function() {},

    /**
     * @param {JSEvent} event
     */
    onFocusLostMethodID: function() {},

    /**
     * @param {JSEvent} event
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