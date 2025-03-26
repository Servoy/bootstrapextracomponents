/**
 * A component that provides a rating interface for displaying and collecting a numerical score.
 */

/**
 * Bound data provider identifier for the rating value.
 */
var dataProviderID;

/**
 * Flag indicating whether the rating component is enabled for user interaction.
 */
var enabled;

/**
 * The maximum rating value allowed.
 */
var max;

/**
 * The representation (for example, an icon or symbol) for an active (selected) rating state.
 */
var stateOn;

/**
 * The representation (for example, an icon or symbol) for an inactive (unselected) rating state.
 */
var stateOff;

/**
 * Flag indicating whether the rating component is visible.
 */
var visible;

/**
 * The position of the rating component on the form.
 */
var location;

/**
 * When true, displays the rating value as a percentage on hover.
 */
var showPercentageOnHover;

/**
 * Dimensions (width and height) of the rating component.
 */
var size;



var handlers = {
    /**
     * Fired when the mouse leaves the rating component.
     *
     * @param {JSEvent} event The event object containing details about the leave event.
     * @param {Number} value The current rating value at the time of the leave event.
     */
    onLeave: function() {},

    /**
     * Fired when the rating component is hovered.
     *
     * @param {JSEvent} event The event object containing details about the hover event.
     * @param {Number} value The rating value corresponding to the hovered element.
     */
    onHover: function() {},

    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
     *
     * @param {dataproviderType} oldValue The previous rating value.
     * @param {dataproviderType} newValue The new rating value to be set.
     * @param {JSEvent} event The event object associated with the data change.
     * 
     * @return {Boolean} True if the new rating value is accepted, false otherwise.
     */
    onDataChangeMethodID: function() {}
};
