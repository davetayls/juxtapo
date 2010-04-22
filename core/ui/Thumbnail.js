(function($) {
/**
 * Creates a new thumbnail control which contains a link to the page
 * a small image and the page name
 * @class Represents a thumbnail control
 * @constructor
 * @property {HtmlElement} caption The Html element containing the thumbnail caption
 * @property {HtmlElement} container The main thumbnail container li
 * @property {juxtapo.templates.TemplateItem} designTemplate The designTemplate this thumbnail is associated with
 * @property {HtmlElement} link The Html anchor element for the thumbnail 
 * @property {HtmlSpanElement} imageContainer The Html span element containing the thumbnail image 
 * @property {HtmlImage} image The thumbnail image
 * @property {Object} settings
 */
juxtapo.ui.Thumbnail = function(designTemplate, options) {
	this._init(designTemplate, options);
};
juxtapo.ui.Thumbnail.prototype = {
	caption : null,
	container : null,
	designTemplate : null,
	link : null,
	imageContainer : null,
	image : null,
	settings : {},

	// methods
	_init : function(designTemplate, options) {
		var self = this;

		self.settings = $.extend( {}, this.settings, options);
		self.designTemplate = designTemplate;

		self.image = $(
				'<img height="220" src="' + this.getImageSrc() + '" alt="design image" />')
				.get(0);
		self.imageContainer = $('<span class="juxtapo-thumb-img" />').append(
				self.image).get(0);

		self.caption = $('<span class="juxtapo-thumb-caption" />').html(
				self.designTemplate.paths[0]).get(0);
		self.link = $(
				'<a class="juxtapo-thumb-lnk" style="display:block;" href="' + this.getLinkHref(self.designTemplate.paths[0]) + '" />')
				.append(self.imageContainer).append(self.caption).get(0);
		self.container = $('<li class="juxtapo-thumb" />').append(self.link)
				.get(0);

		designTemplate.setUiThumbnail(self);

		/**
		 * Shows or hides the thumbnail
		 * @function
		 * @name juxtapo.ui.Thumbnail.show
		 * @param {bool} [b=true] A boolean value to determine whether to show the thumbnail 
		 */
		self.show = function(b) {
			if (typeof (b) == 'undefined')
				b = true;
			if (b) {
				$(self.container).show();
			} else {
				$(self.container).show();
			}
		};

	},
	getImageSrc: function(){
		if (juxtapo.utils.isRelativeUrl(this.designTemplate.imageUrl)) {
			return juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(), this.designTemplate.imageUrl);
		}
		else {
			return this.designTemplate.imageUrl;
		}
	},
	getLinkHref : function(url){
		if (juxtapo.utils.isRelativeUrl(url)) {
			return juxtapo.utils.resolveAbsoluteUrl(juxtapo.coreJsUrl(), url);
		}
		else {
			return url;
		}		
	}
};
})(jQuery);
