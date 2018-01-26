/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C27233F4-291E-45E6-A276-BB84E65A59A3",variableType:4}
 */
var sliderValueHigh = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1CA331C9-82BE-4118-A78E-309AD0374B03",variableType:4}
 */
var sliderValue = 0;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6BE70E94-336D-4F6E-BB5A-19721364E2CD"}
 */
var lastActionMsg;

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0B848961-7FCD-4329-9214-B47C209C6671"}
 */
function onDataChangeMethodID(oldValue, newValue, event) {
	application.output(newValue);
	return false;
}

/**
 * @param value
 * @param type
 *
 * @properties={typeid:24,uuid:"078E3FB9-40EA-4347-8C97-12F686CE0CF2"}
 */
function formatValue(value, type) {
	return value * 1000 + 'k';
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"40C20564-40D9-40A8-9AF6-F9B35D863DB5"}
 */
function onDataChange_value(oldValue, newValue, event) {
	application.output('Value changed to ' + newValue);
	return false;
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F1D744E8-0201-4F30-B0FD-062D13A92165"}
 */
function onDataChangeHigh(oldValue, newValue, event) {
	application.output('High value changed to ' + newValue);
	return false;
}

/**
 * @param {JSEvent} event
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"959D34F9-379B-40BC-9AD5-4BC29557A323"}
 */
function onSlideEnd(event) {
	lastActionMsg = 'onSlideEnd called from slider "' + event.getElementName() + "'";
	application.output(lastActionMsg);
}

/**
 * @param {JSEvent} event
 *
 * @private
 *
 * @properties={typeid:24,uuid:"60772E9A-A896-4E15-9344-4CF362605D90"}
 */
function onSlideStart(event) {
	lastActionMsg = 'onSlideStart called from slider "' + event.getElementName() + "'";
	application.output(lastActionMsg);
}
