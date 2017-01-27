/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"618E4D8A-9951-4C5B-A7F3-857DFAED7FE0"}
 */
function onAction_btnAddImage(event) {
	var someImage = plugins.http.getMediaData("http://lorempixel.com/800/600/");
	var fsBilder = datasources.db.example_data.images.getFoundSet();
	fsBilder.newRecord();
	fsBilder.image = someImage;
	fsBilder.caption = 'Loaded from lorempixel';
	databaseManager.saveData()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"92A1012A-79F8-42E4-9421-0214FEE6E2C4"}
 */
function onAction_btnActiveImage(event) {
	function getRandomIndex() {
		var maxValue = elements.carousel_623c.slidesFoundset.foundset.getSize();
		return Math.floor(Math.random() * maxValue) + 1;
	}
	var index = getRandomIndex();
	application.output('setting index to '+ index);
	elements.carousel_623c.slidesFoundset.foundset.setSelectedIndex(index);
}
