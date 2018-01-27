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
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8801ED33-123D-4B3B-8083-2CC390014734",variableType:4}
 */
var dataChangeOnSlideEnd = 1;

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
 * @param {object} value
 * @param {object} highValue
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"959D34F9-379B-40BC-9AD5-4BC29557A323"}
 */
function onSlideEnd(event, value, highValue) {
	lastActionMsg = 'onSlideEnd called from slider "' + event.getElementName() + "' with value '" + value + "'";
	application.output(lastActionMsg);
}

/**
 * @param {JSEvent} event
 * @param {object} value
 * @param {object} highValue
 *
 * @private
 *
 * @properties={typeid:24,uuid:"60772E9A-A896-4E15-9344-4CF362605D90"}
 */
function onSlideStart(event, value, highValue) {
	lastActionMsg = 'onSlideStart called from slider "' + event.getElementName() + "' with value '" + value + "'";
	application.output(lastActionMsg);
}

/**
 * Called whene.
 *
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @return {boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2E8B7C6C-E26B-46FD-985D-233B94D9E789"}
 */
function onDataChange(oldValue, newValue, event) {
	lastActionMsg = 'onDataChange called from slider "' + event.getElementName() + "' with oldValue " + oldValue + '" , newValue "' + newValue + '"';
	return false;
}
