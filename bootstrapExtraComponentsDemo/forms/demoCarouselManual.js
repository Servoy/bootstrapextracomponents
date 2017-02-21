/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"442F8E9D-27E9-4D78-9189-3F6315F73E93",variableType:4}
 */
var noPause = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C1908503-62AF-44B1-A37F-A6831A27AE4A"}
 */
var noTransition = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"2D048DB6-24A0-499A-B929-E3BC89E48E1A",variableType:4}
 */
var cycleInterval = 3000;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"556B5006-6D57-481E-969F-7A0A2461A51F",variableType:4}
 */
var imageCounter = 1;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"056341AA-EC1C-4086-AC32-4B7CB91338D6"}
 * @AllowToRunInFind
 */
function onAction_btnAddImage(event) {
	/** @type {bootstrapextracomponents-carousel.slide} */
	var slideToAdd = {
		imageUrl: "http://lorempixel.com/800/600/city/" + imageCounter,
		caption: 'Random slide from ' + utils.dateFormat(new Date(), 'HH:mm:ss')
	}
	imageCounter ++;
	if (imageCounter == 10) {
		imageCounter = 1;
	}
	elements.carousel.addSlide(slideToAdd);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A26B080A-13F4-4165-9BE3-D6DD351030B7"}
 * @AllowToRunInFind
 */
function onAction_btnSetSlides(event) {
	/** @type {Array<bootstrapextracomponents-carousel.slide>} */
	var slides = [];
	imageCounter = 1;
	for (var i = 0; i < 5; i++) {
		/** @type {bootstrapextracomponents-carousel.slide} */
		var slideToAdd = {
			imageUrl: "http://lorempixel.com/800/600/city/" + imageCounter,
			caption: 'Random slide from ' + utils.dateFormat(new Date(), 'HH:mm:ss')
		}
		slides.push(slideToAdd);
		imageCounter ++;
	}
	elements.carousel.setSlides(slides);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8F43E7A4-5790-45E0-8919-0BD291B7892E"}
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
 * @properties={typeid:24,uuid:"6D533262-506B-424B-839F-AFA909B3FDCD"}
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
 * @properties={typeid:24,uuid:"3B1D0FE5-4504-41E1-A411-E5F7301BC4BE"}
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
 * @properties={typeid:24,uuid:"0C629F1F-B62A-451C-86E3-CA9C9CF580CF"}
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
 * @properties={typeid:24,uuid:"8359B8F1-57DF-41F8-9051-40EA2EC13C61"}
 */
function onAction_btnRemoveSlide(event) {
	elements.carousel.removeSlide(0);
}
