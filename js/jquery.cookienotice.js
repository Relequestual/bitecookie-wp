// jQuery Cookie Notice plugin
// © Bite CP 2012

(function($){

	var methods = {
		
		init: function(options){
		
			return this.each(function() {
			
				var $this = $(this);					
				var defaults = {
					cookieName: "cookie-notice",
					content: $("<p>We use cookies to give you the best possible online experience. If you continue browsing, we'll assume you are happy for your web browser to receive all cookies from our website.</p>"),
					position: "bottom",
					transition: 1000,
					delay: 500,
					overlay: true
				}
				var opts = $.extend(defaults, options);
				
				if(!$this.data('cookieNotice')){
					// Assign to data
					$this.data('cookieNotice', {
						notice: undefined,
						opts: opts
					});
				}
				var data  = $this.data('cookieNotice');
				
				var showNotice = methods.getCookie(data.opts.cookieName);
				
				if(showNotice !== "false"){
					methods.showNotice.call($this);
				}		    
		   
	    });
		
		},
		
		showNotice: function(){
		
			var $this = this;	
			
			var data  = $this.data('cookieNotice');
			
			if(data.notice == undefined){
				// Generate notice
				data.notice = $("<div />", {
					class: "cookie-notice",
					html: $("<div />", {
						class: "cookie-notice-inner",
						html: data.opts.content
					})
				});
				
				var closeNotice = $("<a />", {
					class: "close-notice",
					href: "#",
					text: "Close notice"
				});
				
				closeNotice.bind("click.cookieNotice", function(event){ 
					event.preventDefault();
					methods.closeNotice.call($this); 
				});
				
				closeNotice.appendTo(data.notice.children(".cookie-notice-inner"));
				
				data.notice.hide().appendTo($this);
			}
			
			var noticeHeight = data.notice.outerHeight(true);
			
			data.notice.css(data.opts.position, -noticeHeight).show();
			
			setTimeout(function(){
				var animation = {};
				animation[data.opts.position] = 0;
				data.notice.animate(animation, data.opts.transition);
				
				// Animate body margin at same time if notice isn't an overlay
				if(!data.opts.overlay){
					var existing_margin = parseInt($this.css("margin-"+data.opts.position).replace('px', ''), 10);
					existing_margin == 'NaN' ? existing_margin = 0 : existing_margin = existing_margin;
					var animation = {};
					animation['margin-'+data.opts.position] = existing_margin + data.notice.outerHeight(true);
					$this.animate(animation, data.opts.transition);
				}
			},data.opts.delay);	
			
			$this.data('cookieNotice', data);
			
		},
		
		closeNotice: function(){
			
			var $this = this;	
			
			var data  = $this.data('cookieNotice');
			
			var animation = {};
			animation[data.opts.position] = -data.notice.outerHeight(true);
			data.notice.animate(animation, data.opts.transition);
			
			// Animate body margin at same time if notice isn't an overlay
			if(!data.opts.overlay){
				var existing_margin = parseInt($this.css("margin-"+data.opts.position).replace('px', ''), 10);
				existing_margin == 'NaN' ? existing_margin = 0 : existing_margin = existing_margin;
				var animation = {};
				animation['margin-'+data.opts.position] = existing_margin - data.notice.outerHeight(true);
				$this.animate(animation, data.opts.transition);
			}
			
			methods.setCookie(data.opts.cookieName, false, 365, "/");
			
		},
		
		getCookie: function(check_name ) {
			// first we'll split this cookie up into name/value pairs
			// note: document.cookie only returns name=value, not the other components
			var a_all_cookies = document.cookie.split( ';' );
			var a_temp_cookie = '';
			var cookie_name = '';
			var cookie_value = '';
			var b_cookie_found = false; // set boolean t/f default f
		
			for ( i = 0; i < a_all_cookies.length; i++ ){
				// now we'll split apart each name=value pair
				a_temp_cookie = a_all_cookies[i].split( '=' );		
		
				// and trim left/right whitespace while we're at it
				cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
		
				// if the extracted name matches passed check_name
				if ( cookie_name == check_name ){
					b_cookie_found = true;
					// we need to handle case where cookie has no value but exists (no = sign, that is):
					if ( a_temp_cookie.length > 1 ){
						cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
					}
					// note that in cases where cookie is initialized but no value, null is returned
					return cookie_value;
					break;
				}
				a_temp_cookie = null;
				cookie_name = '';
			}
			if ( !b_cookie_found ){
				return null;
			}
		},
		
		setCookie: function(name, value, expires, path, domain, secure){
			var today = new Date();
			today.setTime( today.getTime() );
			
			if (expires){
				// Expires is provided in days
				expires = expires * 1000 * 60 * 60 * 24; 
			}
			var expires_date = new Date( today.getTime() + (expires) );
			
			document.cookie = name + "=" +escape( value ) +
			( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
			( ( path ) ? ";path=" + path : "" ) +
			( ( domain ) ? ";domain=" + domain : "" ) +
			( ( secure ) ? ";secure" : "" );
		}
		
	};

  $.fn.cookieNotice = function(method) {
  
  	// Method calling logic
    if(methods[method]) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    }else if(typeof method === 'object' || ! method){
      return methods.init.apply(this, arguments);
    }else{
      $.error( 'Method ' +  method + ' does not exist on jQuery.cookieNotice' );
    }

  };
})(jQuery);