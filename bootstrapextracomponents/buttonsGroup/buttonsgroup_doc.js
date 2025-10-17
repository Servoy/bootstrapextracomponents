/*
 * A group of toggle buttons for single or multiple selection.
 */

/**
 * Bound data provider identifier for the button group component.
 */
var dataProviderID;

/**
 * CSS style classes applied to the button group container.
 */
var styleClass;

/**
 * Identifier for the value list that provides the available options for the button group.
 */
var valuelistID;

/**
 * The input type for the button group, determining whether the buttons function as checkboxes or radio buttons.
 */
var inputType;

/**
 * Flag indicating whether the button group is enabled for user interaction.
 */
var enabled;

/**
 * Tooltip text displayed when hovering over the button group.
 */
var toolTipText;

/**
 * Flag indicating whether the button group is visible.
 */
var visible;

/**
 * The position of the button group within its parent container, specified as a point.
 */
var location;

/**
 * Dimensions (width and height) of the button group component.
 */
var size;

/**
 * Tab sequence order for keyboard navigation within the button group.
 */
var tabSeq;

/**
 * Determines how the button group is rendered.
 * Possible values include "text", "html", or "trusted_html".
 */
var showAs;

/**
 * Format string used to display and parse the button group value.
 */
var format;

/**
 * Tooltip text displayed when hovering over the button group.
 */
var toolTipText;

/**
 * Flag indicating whether the button group is visible.
 */
var visible;

/**
 * The position of the button group within its parent container, specified as a point.
 */
var location;

/**
 * Dimensions (width and height) of the button group component.
 */
var size;

/**
 * Tab sequence order for keyboard navigation within the button group.
 */
var tabSeq;

/**
 * Determines how the button group is rendered.
 * Possible values include "text", "html", or "trusted_html".
 */
var showAs;


var handlers = {
    /**
     * Handle changed data, return false if the value should not be accepted.
     * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope) - present since 2021.06 release
     *
     * @param {dataproviderType} oldValue the previous value from the data provider
     * @param {dataproviderType} newValue the new value to be set in the data provider
     * @param {JSEvent} event the event object associated with the data change
     *
     * @return {Boolean} true if the new value is accepted, false otherwise
     */
    onDataChangeMethodID: function() {}
};
