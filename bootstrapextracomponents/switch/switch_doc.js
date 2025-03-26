/**
 * A component that represents a switch toggle.
 */

/**
 * Bound data provider identifier for the switch value.
 */
var dataProviderID;

/**
 * Flag indicating whether the switch is enabled for user interaction.
 */
var enabled;

/**
 * CSS style classes applied to the switch component.
 */
var styleClass;

/**
 * Flag indicating whether animation is enabled for the switch transitions.
 */
var animate;

/**
 * Text displayed when the switch is in the "on" state.
 */
var onText;

/**
 * Text displayed when the switch is in the "off" state.
 */
var offText;

/**
 * Color used for the switch when in the "on" state.
 */
var onColor;

/**
 * Color used for the switch when in the "off" state.
 */
var offColor;

/**
 * The label text displayed adjacent to the switch.
 */
var label;

/**
 * Width of the label in pixels.
 */
var labelWidth;

/**
 * Width of the switch handle in pixels.
 */
var handleWidth;

/**
 * The overall size configuration of the switch component.
 */
var componentSize;

/**
 * Tab sequence order for keyboard navigation.
 */
var tabSeq;

/**
 * Dimensions (width and height) of the switch component.
 */
var size;

/**
 * Flag indicating whether the switch is visible.
 */
var visible;

var handlers = {
    /**
     * Fired when the switch is toggled.
     *
     * @param {JSEvent} event The event object containing details about the toggle action.
     */
    onActionMethodID: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
     *
     * @param {dataproviderType} oldValue The previous switch value.
     * @param {dataproviderType} newValue The new switch value to be set.
     * @param {JSEvent} event The event object associated with the data change.
     * 
     * @return {Boolean} True if the new switch value is accepted, false otherwise.
     */
    onDataChangeMethodID: function() {}
};

/**
 * Request the focus to this switch.
 *
 * @example %%prefix%%%%elementName%%.requestFocus();
 */
function requestFocus() {
}