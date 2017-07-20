
/**
 *
 * @return {String}
 *
 * @properties={typeid:24,uuid:"095CF20A-B202-42CC-99BD-4FA6D6B5D75B"}
 */
function getName() {
	return 'Progress Bar';
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"CB2CA1D1-EAEB-4E59-A6C0-525A0F5FBAB2"}
*/
function getDescription() {
	return 'Bootstrap Extra Progress Bar';
}

/** 
*
* @return {RuntimeForm<AbstractMicroSample>}
*
* @properties={typeid:24,uuid:"FCE9BF6E-B9C9-4F86-8A61-8B9B030DD1BE"}
*/
function getParent() {
	return forms.commonComponentSamples;
}

/**
*
* @return {String}
*
* @properties={typeid:24,uuid:"72EBF6D1-83F0-4FED-946A-EFB704F78534"}
*/
function getIconStyleClass() {
	return 'fa-tasks';
}

/**
*
* @return {String} Download URL
*
* @properties={typeid:24,uuid:"DD386998-52A5-477B-9038-6659D3826117"}
*/
function getDownloadURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/releases/download/v1.1.0/bootstrapExtraComponentsDemo.servoy';
}

/**
*
* @return {String} Additioanl info (wiki markdown supported)
*
* @properties={typeid:24,uuid:"092FDC75-D9D4-446A-AA63-D1D05AE9AB01"}
*/
function getMoreInfo() {
	return plugins.http.getPageData('https://raw.githubusercontent.com/Servoy/bootstrapextracomponents/master/README.md')
}

/**
*
* @return {Array<String>} code lines
*
* @properties={typeid:24,uuid:"43EEB7ED-DE3A-46E9-A837-194AF077E6F3"}
*/
function getSampleCode() {
	return printMethodCode(forms.demoProgressBar.onAction_btnPerformHeavyJob);
}

/**
*
* @return {String} Website URL
*
* @properties={typeid:24,uuid:"D202C1F3-F798-4F8E-9BAC-EDF597C86BD8"}
*/
function getWebSiteURL() {
	return 'https://github.com/Servoy/bootstrapextracomponents/wiki/Progress-Bar';
}