/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"21136730-F3B9-4965-BC2C-35B3E405D7BA"}
 */
var styleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"CEBA4C9C-BC59-4B4B-BEC1-560D2B379D09"}
 */
var lastCrumbStyleClassDP = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"4DC20F18-130F-4A06-9C1E-4BFAF8188B26"}
 */
var breadcrumbStyleClassDP = null;

/**
 * @properties={typeid:35,uuid:"15660436-57E6-462D-8A84-D75B7195EF8A",variableType:-4}
 */
var visibleDP = true;

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
	var crumbs = [{ displayName: 'First' }, { displayName: 'Second' }, { displayName: 'Third' }, { displayName: 'Fourth' }, { displayName: 'Fifth' }];
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
	var crumb = { displayName: 'Sixth' };
	elements.breadcrumbs.addCrumb(crumb);
	crumb = { displayName: 'Seventh' }
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

/**
 * @properties={typeid:24,uuid:"F979D410-FA98-40A6-856A-406EEC0F8495"}
 */
function onAction_removeCrumbsAfter() {
	elements.breadcrumbs.removeCrumbsAfter(2);
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"487D26BA-BC78-4EC0-9957-29C78F581DC3"}
 */
function onDataChange_visible(oldValue, newValue, event) {
	elements.breadcrumbs.visible = !elements.breadcrumbs.visible;
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"EB044FB2-8E2A-4C96-B42B-75DBA3AF3DD6"}
 */
function onDataChange_breadcrumbStyleClass(oldValue, newValue, event) {
	elements.breadcrumbs.crumbStyleClass = breadcrumbStyleClassDP;
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"AA4A2976-14B4-49F0-B84D-EFC8D494CE4F"}
 */
function onDataChange_lastCrumbStyleClass(oldValue, newValue, event) {
	elements.breadcrumbs.lastCrumbStyleClass = lastCrumbStyleClassDP;
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted.
 * JSEvent.data will contain extra information about dataproviderid, its scope and the scope id (record datasource or form/global variable scope)
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"1905D736-BAB8-4F62-89A2-9456B318C564"}
 */
function onDataChange_styleClass(oldValue, newValue, event) {
	elements.breadcrumbs.styleClass = styleClassDP;
	return true
}
