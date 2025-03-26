/**
 * The Badge component displays a small tag-like element that can function as either an interactive button or a static label.
 * It shows dynamic text along with an optional secondary badge value (often used to indicate counts or status) and supports
 * customizable styles and event handling.
 */

/**
 * Indicates whether the badge is enabled for user interaction.
 */
var enabled;

/**
 * Specifies the display type of the badge.
 * Possible values are "BUTTON" (for interactive badges) and "LABEL" (for static display).
 */
var displayType;

/**
 * The main text displayed on the badge.
 * This text is dynamic and supports internationalization.
 */
var text;

/**
 * The secondary badge text, often used to display a count or additional information.
 */
var badgeText;

/**
 * Dimensions of the badge component (width and height).
 */
var size;

/**
 * The location of the badge component within its parent container.
 */
var location;

/**
 * CSS style classes for an image that may be displayed with the badge.
 */
var imageStyleClass;

/**
 * Additional CSS style classes for customizing the badge appearance.
 */
var styleClass;

/**
 * Determines whether the badge is visible.
 */
var visible;

/**
 * Tooltip text displayed when hovering over the badge (supports internationalization).
 */
var toolTipText;


var handlers = {
    /**
     * Fired when the badge is clicked.
     *
     * @param {JSEvent} event The event object containing details about the click event e.g. target element, mouse coordinates
     */
    onAction: function() {},

    /**
     * Fired when the badge is double-clicked.
     *
     * @param {JSEvent} event The event object containing details about the double-click event e.g. target element, click timing
     */
    onDoubleClick: function() {},

    /**
     * Fired when the badge is right-clicked.
     *
     * @param {JSEvent} event The event object containing details about the right-click event e.g. target element, context menu trigger
     */
    onRightClick: function() {}
};
