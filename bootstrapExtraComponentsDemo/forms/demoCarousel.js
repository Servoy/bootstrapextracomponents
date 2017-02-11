/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"37F69D3D-D970-488B-BFB5-FD647D6C8156",variableType:4}
 */
var noPause = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"EA599C47-2FA3-43DB-8C05-22AD6EBBBABC",variableType:4}
 */
var noWrap = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F64EC122-2253-41BB-9177-E308F110B1BC"}
 */
var noTransition = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"372E3DE3-756C-4865-A376-8D296C54528D",variableType:4}
 */
var cycleInterval = 3000;


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"338A5102-8905-48E9-92A4-91A967E814F4"}
 * @AllowToRunInFind
 */
function onAction_btnAddImage(event) {
//	controller.loadAllRecords();
	var someImage = plugins.http.getMediaData("http://lorempixel.com/800/600/");
//	var fsBilder = datasources.db.example_data.images.getFoundSet();
//	fsBilder.loadAllRecords();
//	fsBilder.deleteAllRecords();
	foundset.newRecord();
	foundset.image_media = someImage;
	foundset.caption_header = 'Image ' + foundset.carousel_image_id;
	databaseManager.saveData()
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C80967B3-3EBC-461B-B92B-6AA1F8162734"}
 */
function onAction_btnActiveImage(event) {
//	function getRandomIndex() {
//		var maxValue = elements.carousel_foundset.slidesFoundset.foundset.getSize();
//		return Math.floor(Math.random() * maxValue) + 1;
//	}
//	var index = getRandomIndex();
//	application.output('setting index to '+ index);
//	elements.carousel_foundset.slidesFoundset.foundset.setSelectedIndex(index);
	foundset.deleteRecord();
	databaseManager.saveData();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected
 *
 * @properties={typeid:24,uuid:"8D80AF0B-74BA-4E54-9589-DF9F3D7C2957"}
 */
function onAction(event) {
	foundset.setSelectedIndex(foundset.getSelectedIndex()+1)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3661FA51-FA93-4AB1-8482-542BF41657DA"}
 */
function onAction_btnToggleAutoShow(event) {
	elements.carousel_foundset.cycleInterval = elements.carousel_foundset.cycleInterval > 0 ? 0 : cycleInterval;
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
 * @properties={typeid:24,uuid:"DD97994F-7287-47DD-B797-BD2B359DE3E1"}
 */
function onDataChange_cycleInterval(oldValue, newValue, event) {
	elements.carousel_foundset.cycleInterval = newValue;
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
 * @properties={typeid:24,uuid:"1BCE7303-9EED-4578-99D5-AA0550491BD4"}
 */
function onDataChange_noWrap(oldValue, newValue, event) {
	elements.carousel_foundset.noWrap = newValue == 1;
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
 * @properties={typeid:24,uuid:"77481F6F-4DD9-4652-8ED1-D208129CE523"}
 */
function onDataChange_noTransition(oldValue, newValue, event) {
	elements.carousel_foundset.noTransition = newValue == 1;
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
 * @properties={typeid:24,uuid:"EE89ADCE-28F9-4663-8447-568F6B6DFF73"}
 */
function onDataChange_noPause(oldValue, newValue, event) {
	elements.carousel_foundset.noPause = newValue == 1;
	return true
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DDAED386-F728-4C62-B634-FB0EAC569530"}
 */
function onAction_btnPrev(event) {
	foundset.setSelectedIndex(foundset.getSelectedIndex() - 1);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4C173AF0-83E4-48BD-8166-9CAD5C38730C"}
 */
function onAction_btnNext(event) {
	foundset.setSelectedIndex(foundset.getSelectedIndex() + 1);
}

/**
 * @properties={typeid:24,uuid:"8B0C8EA4-AA52-4036-BC7E-C1E229A873DD"}
 */
function test() {
	for (var i = 1; i <= foundset.getSize(); i++) {
		var record = foundset.getRecord(i);
		record.caption = record.caption + ' TEST'
	}
	databaseManager.saveData();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"087EA3EB-719A-4D79-9B6F-D8685BF7B5E1"}
 */
function onShow(firstShow, event) {
	if (firstShow && !utils.hasRecords(foundset)) {
		for (var i = 0; i < 10; i++) {
			//load dummy images
			foundset.newRecord();
			foundset.image_media = plugins.http.getMediaData("http://lorempixel.com/800/600/");
			foundset.caption_header = 'Image ' + foundset.carousel_image_id;
			databaseManager.saveData();
		}
	}
}
