/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"D1BAB121-D422-4468-8079-E8BBC7075EF7"}
 */
function getName() {
	return 'Buttons Group';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"544245A8-CE1A-4B9D-BAFB-4127DABEB770"}
*/
function getDescription() {
	return 'Bootstrap Extra Buttons Group Component';
}

/**
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"93D24987-F804-4884-B063-59B71A6DE365"}
*/
function getParent() {
	return forms.commonComponentChoiceGroupSamples;
}

/**
 *
 * @return {String} Download URL
 *
 * @properties={typeid:24,uuid:"743546EF-8ECD-47AA-A3D5-D310CB160AEB"}
 */
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"CA03FE29-7762-41DA-B82B-522D197752F7"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"6CE57DD6-1A8D-4164-A538-24E34B0D7829"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoDropDown.onAction_createDropDown);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"4417EA80-98A9-4322-BF32-E5AB03333E11"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki';
}
