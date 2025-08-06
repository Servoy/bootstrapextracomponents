
/**
 * Foundset load trigger, make sure a JSDataSet.createDataSource(inMemName) is called.
 *
 * @param {String} inMemName The in memory table name that is touched.
 *
 * @properties={typeid:24,uuid:"B5F8DEA8-4FB6-40B6-896A-C1FFF177B215"}
 */
function onFoundSetLoad(inMemName) {
	var ds = databaseManager.createEmptyDataSet(0, ['image_id', 'image', 'caption']);
	for (var i = 0; i < 10; i++) {
		ds.addRow([
			application.getUUID().toString(),
			plugins.http.getMediaData('https://picsum.photos/800/600'),
			'Random slide from ' + utils.dateFormat(new Date(), 'HH:mm:ss')
		]);
	}
	
	ds.createDataSource(inMemName);
}
