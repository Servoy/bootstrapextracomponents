/**
 * If return true, the form will be included in the navigation.
 * This to easy hide items that are not finished.
 * @public 
 *
 * @properties={typeid:24,uuid:"1B5C0CDD-2570-4323-9F56-6B971F4995D6"}
 */
function allowFormIncludedInMenu() {
	return false;
}

/**
 * Show the display name of the sample for navigation 
 * @public 
 * @return {String}
 * @properties={typeid:24,uuid:"2A8A4E2C-9348-4268-BAF8-CA7AAE5A5EF5"}
 */
function getName(){
	throw 'Method must be implemented'
}

/**
 * Show the description, i.e. tooltip
 * 
 * @public 
 * @return {String}
 * @properties={typeid:24,uuid:"261888E4-C5C9-4372-8663-86727D5CE7AD"}
 */
function getDescription(){
	throw 'Method must be implemented'
}

/**
 * Gets the parent form for hierarchy
 * @public 
 * @return {RuntimeForm<AbstractMicroSample>}
 * @properties={typeid:24,uuid:"A1A12E55-CEFB-481D-A820-54B2470DB4B8"}
 */
function getParent(){
	return null;
}

/**
 * Gets an optional icon style class for menu navigation
 * @public 
 * @return {String}
 * @properties={typeid:24,uuid:"55912CD2-3962-4101-8C7A-06BF4662F84E"}
 */
function getIconStyleClass(){
	return null;
}

/**
 * @public 
 * @return {String} Additioanl info (wiki markdown supported)
 * @properties={typeid:24,uuid:"5FD867C6-AE91-40ED-8907-101CD15FB269"}
 */
function getMoreInfo(){
	return null;
}

/**
 * @public 
 * @return {Array<String>} code lines
 * @properties={typeid:24,uuid:"CBD09A0D-1935-4A79-9C7C-70EFB3EA78B4"}
 */
function getSampleCode(){
	return [];
}

/**
 * @public 
 * @return {String} Website URL
 * @properties={typeid:24,uuid:"AC86B2B5-07B8-4A00-A39F-D445B8E78BF5"}
 */
function getWebSiteURL(){
	return null;
}

/**
 * @public 
 * @return {String} Download URL
 * @properties={typeid:24,uuid:"EF6F1C33-9105-47AA-B408-0E4E67EB3DA4"}
 */
function getDownloadURL(){
	return null;
}

/**
 * @public 
 * @return {String} The sort order, i.e. 1, 1.1, 1.1.2
 * @properties={typeid:24,uuid:"D23A83C5-932C-4BFA-AE92-DBECF8965258"}
 */
function getSort(){
	return '0';
}

/**
 * TODO move to top level scope
 * 
 * @protected
 * @param functionToPrint
 * @return {Array<String>}
 * @properties={typeid:24,uuid:"DE7F8E17-18C8-41F6-814C-59F18CA21E91"}
 */
function printMethodCode(functionToPrint) {
	var fd = new Packages.com.servoy.j2db.scripting.FunctionDefinition(functionToPrint);
	if (fd.getFormName()) {
		var jsForm = solutionModel.getForm(fd.getFormName());
		var jsMethod = jsForm.getMethod(fd.getMethodName());
		
		var lines = jsMethod.code.split('\n');
		var relevantLines = [];
		var functionStartFound = false;
		for (var i = 0; i < lines.length; i++) {
			if (!functionStartFound && utils.stringTrim(lines[i]).indexOf('function ') == 0) {
				functionStartFound = true;
			}
			if (functionStartFound && lines[i].indexOf('printMethodCode') == -1) {
				relevantLines.push(lines[i]);
			}
		}
		
		relevantLines.pop();
		return relevantLines;
		
//		var relevantCode = relevantLines.join('\n');
//		application.output(relevantCode);
		
//		forms.method_code.setMethodCode(relevantLines);
		
//		return relevantCode;
	} else {
		return [];
	}
}
