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
	captionLink : null,
	container : null,
	designTemplate : null,
	imageLink : null,
	imageContainer : null,
	image : null,
	settings : {},
	thumbnailHtmlTemplate : '' + 
		'  <a href="${href}" class="juxtapo-thumb-lnk">' +
		'    <span class="juxtapo-thumb-img">' +
		'      <img height="220" alt="design image" src="${imageSrc}">' +
		'    </span>' +
		'  </a>' +
		'  <span class="juxtapo-thumb-caption">' +
		'    <a href="${href}" tabindex="-1">' +
		'      ${caption}' +
		'    </a>' +
		'  </span>',
	
	// methods
	_init : function(designTemplate, options) {
		var self = this;

		self.settings = $.extend( {}, this.settings, options);
		self.designTemplate = designTemplate;
		
		self.container = $('<div class="juxtapo-thumb" />')
			.append(
				juxtapo.utils.htmlFromTemplate(
					this.getThumbnailHtmlTemplate(),
					this.getThumbnailData()
				)
			)
			.get(0);		

		/*
		self.image = $(self.container).find().get(0);
		self.imageContainer = $(self.container).find('.juxtapo-thumb-img').get(0);
		self.caption = $(self.container).find('.juxtapo-thumb-caption').get(0);
		self.captionLink = $(self.container).find('.juxtapo-thumb-captionLink').get(0);
		self.imageLink = $(self.container).find('.juxtapo-thumb-imageLink').get(0);
		*/
		/*
		self.container = $('<li class="juxtapo-thumb" />').append(self.link)
				.get(0);
		*/
		
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
				$(self.container).hide();
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
	},
	getThumbnailData : function(){
		return { 
				caption: this.designTemplate.paths[0], 
				href: this.getLinkHref(this.designTemplate.paths[0]), 
				imageSrc: this.getImageSrc() 
			   };
	},
	getThumbnailHtmlTemplate : function(){
		return this.thumbnailHtmlTemplate;
	}
};
})(jQuery);
