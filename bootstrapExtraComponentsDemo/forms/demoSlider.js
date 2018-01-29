/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C27233F4-291E-45E6-A276-BB84E65A59A3",variableType:4}
 */
var sliderValueHigh = 2;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1CA331C9-82BE-4118-A78E-309AD0374B03",variableType:4}
 */
var sliderValue = 1;

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
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"28992AF6-082F-4F22-BAC7-97A5FD8ECCAD",variableType:4}
 */
var optValue = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"431CBFD7-4B22-4B10-B25E-0AAB8BCE000E",variableType:4}
 */
var optValueHigh = 5;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0C9A3491-C0BA-49F1-88B2-B2564319530A",variableType:4}
 */
var optFloor = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0C0309EA-B409-4DB1-BBAB-AFA5D863D61F",variableType:4}
 */
var optCeil = 10;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B10686D7-7A2B-4240-8676-D774AF63CB81",variableType:8}
 */
var optStep = 1.0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"7190A405-6D9F-444C-A150-49AFB41E4019",variableType:4}
 */
var optPrecision = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F81BD7E9-644C-4AD9-92D9-276B1329A2BA",variableType:4}
 */
var optHideLimits = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"379FDB00-5576-4B0C-B80F-6F4DD8BC98C8",variableType:4}
 */
var optDraggableRange = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C6D9E152-D026-4519-ABBA-0665FAA56B9C",variableType:4}
 */
var optShowTicks = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"B80DC2A6-0F51-469B-B808-8515193B2573",variableType:4}
 */
var optShowTickValues = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"01C4EA70-579A-4398-869D-F3C9776868AC",variableType:4}
 */
var optDisabled = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"E53AD21F-D350-4DAD-B013-71B752A07B13",variableType:4}
 */
var optDataChangeOnSlideEnd = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1FC8D5DB-4A0F-43DF-A734-24FA8BF8BB10",variableType:4}
 */
var optTicksInterval = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"D76E6FBF-4F11-406E-B6FD-F34C0C7ADD6F",variableType:4}
 */
var optTicksValueInterval = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A40E0E91-249C-4608-97CF-A121719692D2",variableType:4}
 */
var optRightToLeft = 0;

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
 * @properties={typeid:24,uuid:"765B97DA-ECCD-4E61-9485-DD06C9307B7C"}
 */
function onDataChange_options(oldValue, newValue, event) {
	apllyAllOptions()
	return true
}


/**
 * @properties={typeid:24,uuid:"8F483694-B112-4596-BC9E-F40662AB2930"}
 */
function apllyAllOptions() {
	elements.slider_all_options.floor = optFloor;
	elements.slider_all_options.ceil = optCeil;
	elements.slider_all_options.step = optStep;
	elements.slider_all_options.precision = optPrecision;
	elements.slider_all_options.ticksValuesInterval = optTicksValueInterval;
	elements.slider_all_options.ticksInterval = optTicksInterval;
	elements.slider_all_options.hideLimitLabels = optHideLimits ? true : false;
	elements.slider_all_options.draggableRange = optDraggableRange ? true : false;
	elements.slider_all_options.showTicks = optShowTicks ? true : false;
	elements.slider_all_options.showTicksValues = optShowTickValues ? true : false;
	elements.slider_all_options.enabled = optDisabled ? false : true;
	elements.slider_all_options.rightToLeft = optRightToLeft ? true : false;
	elements.slider_all_options.dataChangeOnSlideEnd = optDataChangeOnSlideEnd ? true : false;
}
/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9F921979-7ACE-49C1-8194-39B5E10DC884"}
 */
function onShow(firstShow, event) {
	apllyAllOptions()
}
