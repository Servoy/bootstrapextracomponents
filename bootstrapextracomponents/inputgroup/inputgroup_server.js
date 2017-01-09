/**
 * Adds an addOn to this input group
 *
 * AddOn has the following properties:
 *
 * text - the text of the item
 * position - LEFT or RIGHT (defaults to LEFT)
 *
 * @param {bootstrapextracomponents-input-group.AddOn} addOnToAdd - object with text, position (LEFT, RIGHT)
 */
$scope.api.addAddOn = function(addOnToAdd) {
	setAddOnDefaults(addOnToAdd);
	if (!$scope.model.addOns) {
		$scope.model.addOns = [addOnToAdd];
	} else {
		$scope.model.addOns.push(addOnToAdd);
	}
}

/**
 * Sets all addOns of this input group
 *
 * AddOn has the following properties:
 *
 * text - the text of the item
 * position - LEFT or RIGHT (defaults to LEFT)
 *
 * @param {Array<bootstrapextracomponents-input-group.AddOn>} addOns - Array of objects with text, position (LEFT, RIGHT)
 */
$scope.api.setAddOns = function(addOns) {
	for (var i = 0; i < addOns.length; i++) {
		setAddOnDefaults(addOns[i]);
	}
	$scope.model.addOns = addOns;
}

/**
 * Removes all addOns from this input group
 */
$scope.api.clearAddOns = function() {
	$scope.model.addOns = null;
}

/**
 * Adds an addOnButton to this input group
 *
 * AddOnButton has the following properties:
 *
 * text - the button text
 * position - LEFT or RIGHT (defaults to RIGHT)
 * onAction - function to be called on button click
 * onDoubleClick - function to be called on button double click
 * onRightClick - function to be called on button right click
 * styleClass - the style class of the button (e.g. btn-danger)
 * imageStyleClass - image style class of the button
 *
 * @param {bootstrapextracomponents-input-group.AddOnButton} addButtonOnToAdd
 */
$scope.api.addAddOnButton = function(addButtonOnToAdd) {
	if (!$scope.model.addOnButtons) {
		$scope.model.addOnButtons = [addButtonOnToAdd];
	} else {
		$scope.model.addOnButtons.push(addButtonOnToAdd);
	}
}

/**
 * Sets all addOnButtons of this input group
 *
 * AddOnButton has the following properties:
 *
 * text - the button text
 * position - LEFT or RIGHT (defaults to RIGHT)
 * onAction - function to be called on button click
 * onDoubleClick - function to be called on button double click
 * onRightClick - function to be called on button right click
 * styleClass - the style class of the button (e.g. btn-danger)
 * imageStyleClass - image style class of the button
 *
 * @param {Array<bootstrapextracomponents-input-group.AddOnButton>} addOnButtons
 */
$scope.api.setAddOnButtons = function(addOnButtons) {
	$scope.model.addOnButtons = addOnButtons;
}

/**
 * Removes all addOnButtons from this input group
 */
$scope.api.clearAddOnButtons = function(addOnButtons) {
	$scope.model.addOnButtons = null;
} 

function setAddOnDefaults(addOn) {
	addOn.position = addOn.position || 'LEFT';
}