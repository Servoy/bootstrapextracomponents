/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"BCAF48ED-4F07-49B9-91ED-035FEEBA8518"}
 */
function getName() {
	return 'Badges';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"014BC699-0804-42B7-BF42-0BE0ADC9C375"}
*/
function getDescription() {
	return 'Bootstrap Extra Badges Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"8493C9E8-EE70-40F8-9A71-84CC0A05FC85"}
*/
function getParent() {
	return forms.commonComponentButtonSamples;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"DFB63380-FB33-4DAD-8C5C-93615AC66CC3"}
*/
function getIconStyleClass() {
	return 'fa-plus-square-o';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"35DD69F6-521A-42C5-BD49-86B5DBCEC721"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"8626B092-CE3E-46FE-BAA7-2ACDFA5E5A70"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"384C8353-F72D-495A-A1ED-DC529AEADF12"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"545A52DE-4D61-4D4F-87E4-7927150CA778"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
