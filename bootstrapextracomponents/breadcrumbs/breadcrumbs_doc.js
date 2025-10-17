/*
 * Breadcrumb is a navigation component that displays a series of links representing the current navigation path.
 * It is typically used to help users navigate hierarchical structures within an application.
 */

/**
 * An array of breadcrumb items representing the entire breadcrumb trail.
 */
var breadcrumbs;

/**
 * When true, a breadcrumb item is automatically removed from the trail after it is clicked.
 */
var autoRemoveWhenClicked;

/**
 * CSS style classes applied to individual breadcrumb items.
 */
var crumbStyleClass;

/**
 * CSS style classes applied to the last breadcrumb item in the trail.
 */
var lastCrumbStyleClass;

/**
 * The position of the breadcrumb component on the form.
 */
var location;

/**
 * Flag indicating whether the breadcrumb component is enabled for user interaction.
 */
var enabled;

/**
 * An array of breadcrumb items representing the navigation path.
 * Each item is typically an object containing properties such as text and an optional link.
 */
var items;

/**
 * The divider string displayed between breadcrumb items.
 * Common dividers include characters like "/" or ">".
 */
var divider;

/**
 * Additional CSS style classes to be applied to the breadcrumb container.
 */
var styleClass;

/**
 * Flag indicating whether the breadcrumb component is visible.
 */
var visible;

/**
 * Tooltip text displayed when hovering over the breadcrumb component.
 */
var toolTipText;


var handlers = {
    /**
     * Called whenever a breadcrumb item is clicked with the JSEvent and the item clicked on.
     *
     * @param {JSEvent} event the event object containing details about the click event e.g. target element, mouse coordinates
     * @param {CustomType<bootstrapextracomponents-breadcrumbs.crumb>} crumb The breadcrumb item that was clicked
     * @param {Number} index the index of the clicked breadcrumb item in the items array
     */
    onCrumbClicked: function() {}
};

/**
 * Sets all crumbs
 *
 * @param {Array<CustomType<bootstrapextracomponents-breadcrumbs.crumb>>} crumbs An array of breadcrumb objects to set as the entire breadcrumb trail.
 */
function setCrumbs(crumbs) {
}

/**
 * Adds a crumb at the end
 *
 * @param {CustomType<bootstrapextracomponents-breadcrumbs.crumb>} crumb A breadcrumb object to be added at the end of the breadcrumb trail.
 */
function addCrumb(crumb) {
}

/**
 * Removes all crumbs after the given index
 *
 * @param {Number} index The 0-based index after which all breadcrumbs will be removed.
 */
function removeCrumbsAfter(index) {
}

/**
 * Removes the last crumb
 */
function removeLastCrumb() {
}

/**
 * Type definitions for bootstrapextracomponents-breadcrumbs types.
 */
var svy_types = {

    /**
     * Represents an individual breadcrumb item.
     */
    crumb: {

        /**
         * Unique identifier for the breadcrumb item.
         */
        crumbId: null,

        /**
         * The display name or label of the breadcrumb item.
         */
        displayName: null,  
    }
}
