/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"445533A8-8DDA-4D44-BC8B-35D5F267AA75"}
 */
function getName() {
	return 'Breadcrumbs';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"3D8F6E3E-ACD6-4DD7-AC79-603A94E1F815"}
*/
function getDescription() {
	return 'Bootstrap Extra Breadcrumbs Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"6C1FD175-F443-44B7-9997-809A0C0A8DCE"}
*/
function getParent() {
	return forms.commonComponentSamples;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"0EFBB733-5473-44B1-9CD6-808953FC3EB7"}
*/
function getIconStyleClass() {
	return 'fa fa-road';
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"BBFBEBBC-2B8D-4E1F-AEE3-12CA679A937F"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"80936190-7979-4A68-BCE4-BFF757247218"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"B957615B-337B-4C51-893A-7901FEC58716"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"2BE97CA3-114D-4296-9FDF-EEEB59D3648B"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
