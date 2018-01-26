/**
 * Creates a new collapsible that can be added to the Collapse component using addCollapsible
 * 
 * @param {String} [textOrHtml]
 * @param {String} [collapsableId]
 * 
 * @return {bootstrapextracomponents-collapse.collapsible}
 */
$scope.api.createCollapsible = function(textOrHtml, collapsableId) {
	return {
		headerHtml: textOrHtml || null,
		collapsableId: collapsableId || Math.ceil(Math.random() * 10000000) + '',
		headerStyleClass: null,
		collapsibleHtml: null,
		form: null,
		isCollapsed: true,
		cards: [],
		styleClass: null,
		collapsedIconName: 'fa fa-2x fa-angle-down',
		expandedIconName: 'fa fa-2x fa-angle-up'
	}
}

/**
 * Creates a new card that can be added to any collapsible's cards array
 * 
 * @param {String} textOrHtml
 * @param {String} cardId
 * @param {String} styleClass
 * @return {bootstrapextracomponents-collapse.card}
 */
$scope.api.createCard = function(textOrHtml, cardId, styleClass) {
	return {
		contentHtml: textOrHtml || null,
		cardId: cardId || Math.ceil(Math.random() * 10000000) + '',
		styleClass: styleClass || null
	}
}

/**
 * Adds a new collapsible to the list of collapsibles of this Collapse component
 * 
 * @param {bootstrapextracomponents-collapse.collapsible} collapsible
 * @param {Number} [index] the index to insert the new collapsible at
 */
$scope.api.addCollapsible = function(collapsible, index) {
	if (!$scope.model.collapsibles || $scope.model.collapsibles.length == 0) {
		$scope.model.collapsibles = [];
	}
	if (index >= 0) {
		$scope.model.collapsibles.splice(index, 0, collapsible);
	} else {
		$scope.model.collapsibles.push(collapsible);
	}
}

/**
 * Sets all collapsibles of this Collapse component
 * 
 * @param {Array<bootstrapextracomponents-collapse.collapsible>} collapsibles
 */
$scope.api.setCollapsibles = function(collapsibles) {
	$scope.model.collapsibles = collapsibles;
}

/**
 * Returns the card with the given ID
 * @param {String} cardId
 * @return {bootstrapextracomponents-collapse.card} the card or null when not found
 */
$scope.api.getCardById = function(cardId) {
	if (!$scope.model.collapsibles || $scope.model.collapsibles.length === 0) {
		return null;
	}
	
	for (var i = 0; i < $scope.model.collapsibles.length; i++) {
		var collapsible = $scope.model.collapsibles[i];
		if (collapsible.cards && collapsible.cards.length > 0) {
			for (var c = 0; c < collapsible.cards.length; c++) {
				if (collapsible.cards[c].cardId == cardId) {
					return collapsible.cards[c];
				}
			}
		}
	}
	
	return null;
}