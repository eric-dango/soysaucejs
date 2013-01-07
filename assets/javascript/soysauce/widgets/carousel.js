soysauce.carousels = (function() {
	var carousels = new Array();
	
	function Carousel(obj) {
		this.id = $(obj).attr("data-ss-id");
		this.container;
		this.items;
		this.dots;
		this.infinite = true;
		this.autoscroll = false;
		this.autoscrollID;
		this.autoscrollInterval = 5000;
		this.autoscrollRestartID;
		this.fullscreen = false;
		this.peek = false;
		this.peekWidth = 0;
		this.swipe = true;
		this.numChildren = 0;
		this.index = 0;
		this.supports3d = (navigator.userAgent.match(/android/i) !== null) ? false : true;
		this.itemWidth = 0;
		this.offset = 0;
		this.ready = false;
		this.interrupted = false;
		this.coords1x = 0;
		this.links = false;
		
		this.zoom = false;
		this.zoomMultiplier = 2;
		this.isZoomed = false;
	}
	
	Carousel.prototype.gotoPos = function(x, forward, fast) {
		var self = this;
		this.offset = x;
		this.setStyle(x);
		
		if (this.ready)
			this.container.attr("data-ss-state", "ready");
		else
			this.container.attr("data-ss-state", (fast) ? "intransit-fast" : "intransit");
	
		if (this.infinite) {
			if (this.index === this.numChildren - 2 && !forward)  {
				var xcoord = parseInt(soysauce.getArrayFromMatrix(this.container.css("webkitTransform"))[4]);
				var newOffset = -self.index*self.itemWidth;
				self.container.attr("data-ss-state", "notransition");
				self.offset = newOffset + xcoord;
				self.setStyle(self.offset);
				window.setTimeout(function() {
					self.container.attr("data-ss-state", "intransit");
					self.offset = newOffset + self.peekWidth/2;
					self.setStyle(self.offset);
				}, 0);
			}
			else if (this.index == 1 && forward)  {
				var xcoord = parseInt(soysauce.getArrayFromMatrix(this.container.css("webkitTransform"))[4]);
				var newOffset = self.offset + self.itemWidth - xcoord;
				self.container.attr("data-ss-state", "notransition");
				self.offset = -newOffset + xcoord;
				self.setStyle(-newOffset);
				window.setTimeout(function() {
					self.container.attr("data-ss-state", "intransit");
					self.offset = -self.itemWidth + self.peekWidth/2;
					self.setStyle(self.offset);
				}, 0);
			}	
		}
		
		if (self.interrupted)
			this.container.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
				self.interrupted = false;
			});
		
		if (self.autoscroll && self.autoscrollRestartID === undefined)
			this.container.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
					self.autoscrollRestartID = window.setTimeout(function() {
						self.autoscrollOn();
					}, 1000);
			});
			
	};
	
	Carousel.prototype.slideForward = function(fast) {
		if (!this.ready || (!this.infinite && this.index === this.numChildren - 1)) return false;
		
		$(this.dots[this.index - 1]).attr("data-ss-state", "inactive");
		$(this.items[this.index++]).attr("data-ss-state", "inactive");
		
		if (this.infinite && this.index === this.numChildren - 1) {
			$(this.items[1]).attr("data-ss-state", "active");
			this.index = 1;
		}
		else
			$(this.items[this.index]).attr("data-ss-state", "active");
		
		$(this.dots[this.index - 1]).attr("data-ss-state", "active");
		this.ready = false;
		this.gotoPos(this.offset - this.itemWidth, true, fast);
		
		return true;
	};
	
	Carousel.prototype.slideBackward = function(fast) {
		if (!this.ready || (!this.infinite && this.index === 0)) return false;
		
		$(this.dots[this.index - 1]).attr("data-ss-state", "inactive");
		$(this.items[this.index--]).attr("data-ss-state", "inactive");
		
		if (this.infinite && this.index === 0) {
			$(this.items[this.numChildren - 2]).attr("data-ss-state", "active");
			this.index = this.numChildren - 2;
		}
		else
			$(this.items[this.index]).attr("data-ss-state", "active");
		
		$(this.dots[this.index - 1]).attr("data-ss-state", "active");
		this.ready = false;
		this.gotoPos(this.offset + this.itemWidth, false, fast);
		
		return true;
	};
	
	Carousel.prototype.adjustSize = function() {
		if (this.fullscreen) {
			var diff = $(window).width() - this.itemWidth;
			var prevState = this.container.attr("data-ss-state");
			var self = this;
			this.itemWidth -= this.peekWidth;
			this.itemWidth += diff;
			this.offset = -this.index * this.itemWidth + this.peekWidth/2;
			this.container.attr("data-ss-state", "notransition");
			this.setStyle(this.offset);			
			this.container.find("[data-ss-component='item']").width(this.itemWidth);
		}

		if (this.infinite)
			this.container.width(this.itemWidth * (this.numChildren + 2));
		else
			this.container.width(this.itemWidth * this.numChildren);
	};
	
	Carousel.prototype.setStyle = function(x) {
		this.container[0].style.webkitTransform = this.container[0].style.msTransform = this.container[0].style.OTransform = this.container[0].style.MozTransform = this.container[0].style.transform = "translate" + ((this.supports3d) ? "3d(" : "(") + x + "px,0,0)";
	};
	
	Carousel.prototype.handleInterrupt = function(e) {
		var self = this;
		var coords1, coords2, ret;
		var xcoord = parseInt(soysauce.getArrayFromMatrix(this.container.css("webkitTransform"))[4]);
		
		this.interrupted = true;
		
		if (this.autoscroll) {
			this.autoscrollOff();
			if (this.autoscrollRestartID !== undefined) {
				window.clearInterval(self.autoscrollRestartID);
				self.autoscrollRestartID = undefined;
			}
		}
		
		this.container.attr("data-ss-state", "notransition");
		this.setStyle(xcoord);
		
		coords1 = soysauce.getCoords(e);
		
		this.container.on("touchmove mousemove", function(e2) {
			var dragOffset;

			ret = coords2 = soysauce.getCoords(e2.originalEvent);
			
			if (Math.abs((coords1.y - coords2.y)/(coords1.x - coords2.x)))
				soysauce.stifle(e);
			else
				soysauce.stifle(e2);
			
			dragOffset = coords1.x - coords2.x;
			self.container.attr("data-ss-state", "notransition");
			self.setStyle(xcoord - dragOffset);
		});
		
		return ret;
	};
	
	Carousel.prototype.handleSwipe = function(e1) {
		var self = this;
		var coords1, coords2, lastX;
		
		var coords1x;
		
		coords1 = soysauce.getCoords(e1);
		
		this.coords1x = coords1.x;
		
		if (e1.type.match(/mousedown/) !== null) soysauce.stifle(e1); // for desktop debugging

		if (!this.ready) 
			lastX = this.handleInterrupt(e1);
		else {
			this.container.on("touchmove mousemove", function(e2) {
				var dragOffset;

				coords2 = soysauce.getCoords(e2.originalEvent);
				
				if (Math.abs((coords1.y - coords2.y)/(coords1.x - coords2.x)))
					soysauce.stifle(e1);
				else
					soysauce.stifle(e2);
				
				lastX = coords2.x;
				dragOffset = coords1.x - coords2.x;
				self.container.attr("data-ss-state", "notransition");
				self.setStyle(self.offset - dragOffset);
			});
		}

		this.container.one("touchend mouseup", function(e2) {
			soysauce.stifle(e2);
			coords2 = soysauce.getCoords(e2.originalEvent);
			if (lastX === undefined && coords2 !== null) lastX = coords2.x;

			var dist = self.coords1x - lastX;
			var velocity = dist / (e2.timeStamp - e1.timeStamp);
			var fast = (velocity > 0.35) ? true : false;
			
			self.container.off("touchmove mousemove");
			self.ready = true;
			self.container.attr("data-ss-state", "ready");
			
			
			if (!self.interrupted && self.links && Math.abs(dist) === 0) {
				if (e2.target.tagName.match(/^a$/i) !== null)
					window.location.href = $(e2).attr("href");
				else
					window.location.href = $(e2.target).closest("a").attr("href");
			}
			else if (!self.interrupted && self.zoom && Math.abs(dist) === 0) {
				soysauce.stifle(e1);
				self.handleZoom(e1);
			}
			else if (Math.abs(dist) < 15 || (self.interrupted && Math.abs(dist) < 25)) {
				soysauce.stifle(e1);
				self.gotoPos(self.offset, true);
			}
			else if (dist > 0)
				self.slideForward(fast);
			else
				self.slideBackward(fast);
			
		});
	};
	
	Carousel.prototype.handleZoom = function(e) {
		var zoomImg = e.target;
		
		
		console.log(soysauce.getCoords(e));
			
		if (!this.isZoomed) {
			console.log("zoom in");
			this.isZoomed = true;
			zoomImg.style.webkitTransform = zoomImg.style.msTransform = zoomImg.style.OTransform = zoomImg.style.MozTransform = zoomImg.style.transform = "scale" + ((this.supports3d) ? "3d(" : "(") + this.zoomMultiplier + "," + this.zoomMultiplier + ",1)";
		}
		else {
			console.log("zoom out");
			this.isZoomed = false;
			zoomImg.style.webkitTransform = zoomImg.style.msTransform = zoomImg.style.OTransform = zoomImg.style.MozTransform = zoomImg.style.transform = "scale" + ((this.supports3d) ? "3d(" : "(") + "1,1,1)";
		}
			
	};
	
	Carousel.prototype.autoscrollOn = function() {
		var self = this;
		if (this.autoscrollID === undefined) {
			this.autoscrollID = window.setInterval(function() {
				self.slideForward();
			}, self.autoscrollInterval);
			return true;
		}
		return false;
	};
	
	Carousel.prototype.autoscrollOff = function() {
		var self = this;
		if (this.autoscrollID !== undefined) {
			window.clearInterval(self.autoscrollID);
			this.autoscrollID = undefined;
			return true;
		}
		return false;
	};
	
	// Init
	(function() {
		$("[data-ss-widget='carousel']").each(function() {
			var carousel = new Carousel(this);
			var self = this;
			var options = soysauce.getOptions(this);
			var loadCounter = 1;
			var items = $(this).find("[data-ss-component='item']");
			var first_item, last_item;
			var wrapper;
			var i = 0;
			
			if(options) options.forEach(function(option) {
				switch(option) {
					case "peek":
						carousel.peek = true;
						break;
					case "finite":
						carousel.infinite = false;
						break;
					case "autoscroll":
						carousel.autoscroll = true;
						break;
					case "fullscreen":
						carousel.fullscreen = true;
						break;
					case "noswipe":
						carousel.swipe = false;
						break;
					case "zoom":
						carousel.zoom = true;
						break;
					case "3d":
						carousel.supports3d = true;
						break;
				}
			});
			
			if (carousel.swipe)$(this).find("a").click(function(e) {
				soysauce.stifle(e);
			});
			$(this).wrapInner("<div data-ss-component='container' />");
			$(this).wrapInner("<div data-ss-component='container_wrapper' />");
			carousel.container = $(this).find("[data-ss-component='container']");
			wrapper = $(this).find("[data-ss-component='container_wrapper']");
			wrapper.after("<div data-ss-component='button' data-ss-button-type='prev'></div><div data-ss-component='button' data-ss-button-type='next'></div>");
			wrapper.after("<div data-ss-component='dots'></div>")
			carousel.dots = $(this).find("[data-ss-component='dots']");
			
			wrapper.find("~ [data-ss-button-type='prev']").click(function() {
				carousel.slideBackward();
			});
			wrapper.find("~ [data-ss-button-type='next']").click(function() {
				carousel.slideForward();
			});
			
			if (carousel.infinite) {
				first_item = carousel.container.find("[data-ss-component='item']").first().clone();
				last_item = carousel.container.find("[data-ss-component='item']").last().clone();
				first_item.appendTo(carousel.container);
				last_item.prependTo(carousel.container);
				items = $(this).find("[data-ss-component='item']");
			}
			
			carousel.items = items;
			carousel.numChildren = items.length;
			
			carousel.links = (items[0].tagName.match(/^a$/i) !== null) ? true : false;
			
			var dotsHtml = "";
			var numDots = (carousel.infinite) ? carousel.numChildren - 2 : carousel.numChildren;
			for (i = 0; i < numDots; i++) {
				dotsHtml += "<div data-ss-component='dot'></div>";
			}
			carousel.dots.html(dotsHtml);
			carousel.dots = carousel.dots.find("div");
			carousel.dots.attr("data-ss-state", "inactive")
			carousel.dots.first().attr("data-ss-state", "active");
			
			if (carousel.peek) {
				carousel.peekWidth = ($(this).attr("data-ss-peek-width") !== undefined) ? parseInt($(this).attr("data-ss-peek-width")) : 0;
				if (carousel.peekWidth % 2) $(this).attr("data-ss-peek-width", ++carousel.peekWidth);
			}
			
			items.attr("data-ss-state", "inactive");
			if (carousel.infinite) {
				$(items[1]).attr("data-ss-state", "active");
				carousel.index++;
			}
			
			items.each(function(i, e) {
				function handleChildren() {
					var loadCount = 0;
					var numImgs = $(e).find("img").length;
					$(e).find("img").ready(function() {
						loadCount++;
						if (++loadCount == numImgs || numImgs == 1); 
							handleItem();
					});
				}
				function handleItem() {	
					if (carousel.fullscreen)
						carousel.itemWidth = $(window).width();
					else
						carousel.itemWidth = (carousel.itemWidth != 0 && carousel.itemWidth < $(this).width()) ? carousel.itemWidth : $(this).width();
					
					if (loadCounter++ === carousel.numChildren) {
						$(self).find("[data-ss-component='item']").width(carousel.itemWidth - carousel.peekWidth);
						carousel.container.width(carousel.itemWidth * (carousel.numChildren));
						if (carousel.peek) {
							carousel.itemWidth -= carousel.peekWidth;
							carousel.offset += carousel.peekWidth/2;
						}
						if (carousel.infinite) 
							carousel.gotoPos(-carousel.itemWidth + carousel.offset);							
						else
							carousel.gotoPos(carousel.offset);
						
						window.setTimeout(function() {
							$(self).trigger("SSWidgetReady").attr("data-ss-state", "ready");
						}, 1);
					}
				}
				if (e.tagName.match(/img/i) !== null)
					$(e).ready(handleItem());
				else if ($(e).find("img").length > 0)
					handleChildren();
				else
					handleItem();
					
				if (i === 0 && !carousel.infinite) $(this).attr("data-ss-state", "active");
			});
			
			if (carousel.fullscreen) $(window).on("resize orientationchange", function() {
				carousel.adjustSize();
			});
			
			if (carousel.swipe || carousel.zoom) carousel.container.on("touchstart mousedown", function(e) {
				carousel.handleSwipe(e.originalEvent);
			});
			
			carousel.ready = true;
			carousel.container.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function() {
				carousel.ready = true;
				carousel.container.attr("data-ss-state", "ready");
			});
			
			if (carousel.autoscroll) {
				var interval = $(this).attr("data-ss-autoscroll-interval");
				if (interval !== undefined)
					carousel.autoscrollInterval = parseInt(interval);
				carousel.autoscrollOn();
			}
			
			if (carousel.zoom) {
				var zoomMultiplier = $(this).attr("data-ss-zoom-multiplier");
				if (zoomMultiplier !== undefined)
					carousel.zoomMultiplier = parseInt(zoomMultiplier);
			}
			
			carousels.push(carousel);
		});
	})(); // end init
	
	return carousels;
})();
