var breadcrumbs;

var autoRemoveWhenClicked;

var styleClass;

var crumbStyleClass;

var lastCrumbStyleClass;

var size;

var location;

var visible;


var handlers = {
    /**
     * Called whenever a breadcrumb item is clicked with the JSEvent and the item clicked on
     *
     * @param {JSEvent} event
     * @param {CustomType<bootstrapextracomponents-breadcrumbs.crumb>} crumb
     * @param {Number} index
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