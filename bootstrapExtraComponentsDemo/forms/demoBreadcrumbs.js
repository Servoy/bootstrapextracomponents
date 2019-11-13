/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"63508D4E-0E95-47EC-9078-1D819C2A27AD",variableType:4}
 */
var autoRemove = 0;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"57AAF4B7-4F01-44C4-8B96-3E81F284B737"}
 */
function onAction_createBreadcrumbs(event) {
	/** @type {Array<CustomType<bootstrapextracomponents-breadcrumbs.crumb>>} */
	var crumbs = [
		{displayName: 'First'}, 
		{displayName: 'Second'}, 
		{displayName: 'Third'}, 
		{displayName: 'Fourth'}, 
		{displayName: 'Fifth'}
	];
	elements.breadcrumbs.setCrumbs(crumbs);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BF3ED412-4C88-4D02-8297-3A7B1C2847E5"}
 */
function onAction_addBreadcrumbs(event) {
	/** @type {CustomType<bootstrapextracomponents-breadcrumbs.crumb>} */
	var crumb = {displayName: 'Sixth'};
	elements.breadcrumbs.addCrumb(crumb);
	crumb = {displayName: 'Seventh'}
	elements.breadcrumbs.addCrumb(crumb);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"4E833762-E188-4F89-ABED-861E922E39BC"}
 */
function onAction_removeLastBreadcrumb(event) {
	elements.breadcrumbs.removeLastCrumb();
}

/**
 * Called whenever a breadcrumb item is clicked with the JSEvent and the item clicked on.
 *
 * @param {JSEvent} event
 * @param {CustomType<bootstrapextracomponents-breadcrumbs.crumb>} crumb
 * @param {Number} index
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DA5198D2-EA63-4970-8703-9966844DA056"}
 */
function onCrumbClicked(event, crumb, index) {
	elements.lblLastClick.text = 'Crumb "' + crumb.displayName + '" on index ' + index;
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"35AB0AE6-7373-4A81-97F3-F89ED7CC94B7"}
 */
function onDataChange_autoRemove(oldValue, newValue, event) {
	elements.breadcrumbs.autoRemoveWhenClicked = newValue ? true : false;
	return true
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"60CF4AC0-5951-4CC3-9FF0-0F83B078834C"}
 */
function onShow(firstShow, event) {
	elements.breadcrumbs.autoRemoveWhenClicked = autoRemove ? true : false;
}
