/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EAF9FE05-FDD6-4331-8204-E32E8655B112",variableType:4}
 */
var noPause = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6BBFF2DA-9F00-4AA3-B2E1-F3D16BF58B95"}
 */
var noTransition = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E2D2898B-E571-4E66-9992-B84139E531D5",variableType:4}
 */
var cycleInterval = 3000;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1E6AA9A8-A463-4B63-B825-DBFA944179B1",variableType:4}
 */
var imageCounter = 1;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D02A91E6-0DC5-4121-B17D-6F234E69B3A4"}
 * @AllowToRunInFind
 */
function onAction_btnAddImage(event) {
	var record = foundset.getRecord(foundset.newRecord());
	record.image = plugins.http.getMediaData('http://lorempixel.com/800/600/');
	record.caption = 'Image added on ' + utils.dateFormat(new Date(), 'HH:mm:ss');
	databaseManager.saveData(record);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8EA6154A-342B-4095-9412-53802EDD4108"}
 */
function onAction_btnToggleAutoShow(event) {
	elements.carousel.cycleInterval = elements.carousel.cycleInterval > 0 ? 0 : cycleInterval;
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
 * @properties={typeid:24,uuid:"BE973CC4-646B-4293-B808-76A6C96B3FEB"}
 */
function onDataChange_cycleInterval(oldValue, newValue, event) {
	elements.carousel.cycleInterval = newValue;
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"76CFB4A6-61B2-407B-9D0C-9F945F3A6485"}
 */
function onDataChange_noTransition(oldValue, newValue, event) {
	elements.carousel.noTransition = newValue == 1;
	return true
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
 * @properties={typeid:24,uuid:"4C82F098-9616-4655-A691-006C2181EF20"}
 */
function onDataChange_noPause(oldValue, newValue, event) {
	elements.carousel.noPause = newValue == 1;
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A88BF858-3884-4E91-8B24-2B26DBD5B843"}
 */
function onAction_btnRemoveSlide(event) {
	foundset.deleteRecord();
}

/**
 * @param {JSEvent} event
 * @param {bootstrapextracomponents-carousel.slide} slide
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D4D0A7C9-7A3C-4A5F-B538-C04E10C9260C"}
 */
function onSlideClicked(event, slide) {
	application.output('Click on slide ' + slide.imageUrl);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E27FF9E1-7EBE-49D6-9800-363F57E1223C"}
 */
function onAction_btnNext(event) {
	foundset.setSelectedIndex(foundset.getSelectedIndex() + 1);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A71BEC96-FB70-43F5-B7A4-575A63752FFE"}
 */
function onAction_btnPrev(event) {
	foundset.setSelectedIndex(foundset.getSelectedIndex() - 1);
}
