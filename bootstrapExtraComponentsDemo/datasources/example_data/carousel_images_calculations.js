/**
 * @properties={type:12,typeid:36,uuid:"72393274-7F51-4C2F-8D28-6CDC4079A17F"}
 */
function caption_calc()
{
	var result = '';
	if (caption_header) {
		result += '<span class="carousel-caption-header">' + caption_header + '</span></br>'
	}
	if (caption_text) {
		result += '<span class="carousel-caption-text">' + utils.stringReplace(caption_text, '\n', '<br>') + '</span>'
	}
	return result;
}
