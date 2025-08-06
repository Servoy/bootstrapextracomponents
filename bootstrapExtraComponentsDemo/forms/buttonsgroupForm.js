/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"78B26687-5DB4-4443-A98F-8A3F32D326CE"}
 */
var checkboxValue = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F73EF606-442A-4658-994A-4E2977E43276"}
 */
var radioValue = null;

/**
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"1B61AED6-4D63-44F9-9B3D-AEABDD501612"}
 */
function onDataChange(oldValue, newValue, event) {
	application.output('onDataChange called from buttonsgroup ' + event.getElementName());
	elements.label_6.text = 'onDataChange called from buttonsgroup ' + event.getElementName();
}

/**
 * @param oldValue
 * @param newValue
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"B10C888C-CC0F-4243-B7DF-6263990F255E"}
 */
function onElementDataChange(oldValue, newValue, event) {
	application.output('onElementDataChange called from buttonsgroup ' + event.getElementName());
	elements.label_6.text = 'onElementDataChange called from buttonsgroup ' + event.getElementName();
}
