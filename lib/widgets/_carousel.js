/**
 * The Carousel widget.
 *
 * @class Carousel
 * @extends Widget
 */
var Carousel = Widget.extend({
  init: function() {
    var initBase = this._super.apply(this, arguments);
    var self = this;

    initBase.then(this._init.bind(this));

    return initBase;
  },

  _init: function() {
    // Core properties
    this.index = 0;
    this._$items = this.$.find('[data-ss-component="item"]');
    this.itemWidth = this.$.outerWidth() / this._$items.length;
    this.translateX = 0;

    // Create Carousel structure
    this.$.wrapInner('<div data-ss-component="container"></div>');
    this.$.wrapInner('<div data-ss-component="container_wrapper"></div>');

    this._$container = this.$.find('[data-ss-component="container"]');
    this._$wrapper = this.$.find('[data-ss-component="container_wrapper"]');

    this._setupOptions();
  },

  _setupOptions: function() {
    var self = this;

    if (!this.hasOption('finite')) {
      // infinite logic
    }

    if (this.hasOption('dots')) {
      var i, l;
      var dotContainer = this.$.append('<div data-ss-component="dots"></div>');

      for (i = 0, l = this._$items.length; i < l; i++) {
        dotContainer.append('<button data-ss-component="dot"></button>');
      }
    }

    if (this.hasOption('buttons')) {
      this.$.append('<div data-ss-component="button" data-ss-button-type="next"></div>');
      this.$.append('<div data-ss-component="button" data-ss-button-type="prev"></div>');
    }

    if (!this.hasOption('noswipe')) {
      // swipe logic
    }

    if (this.hasOption('autoscroll')) {
      this.options.autoscroll = this.options.autoscroll || {
        active: false,
        timer: null,
        delay: 3500
      };

      this.play = function() {
        window.clearInterval(this.options.autoscroll.timer);
        self.options.autoscroll.active = true;
        self.options.autoscroll.timer = window.setInterval(function() {
          self.index++;
          console.log('forward', self.index, self.translateX);
        }, self.options.autoscroll.delay);
      };

      this.pause = function() {
        window.clearInterval(self.options.autoscroll.timer);
        self.options.autoscroll.active = false;
      };
    }

    if (this.hasOption('peek')) {
      // peek logic
    }

    if (this.hasOption('multi')) {
      // multi logic
    }

    if (this.hasOption('zoom')) {
      // zoom logic
    }

    if (this.hasOption('lazyload')) {
      // lazyload logic
    }
  },

  /**
   * Removes handlers for its options. This is an optional method which is
   * called during `destroy()`.
   *
   * @method teardown
   * @optional
   */
  teardown: function() {
    if (this.hasOption('autoscroll')) {
      this.pause();
    }
  },

  validate: function() {
    var hasItems = this.$.find('[data-ss-component="item"]').length > 0;

    if (!hasItems) {
      throw new ValidationError('Missing items');
    }

    return true;
  }
});

Object.defineProperty(Carousel.prototype, 'index', {
  set: function(index) {
    this._index = index;
    this.translateX = index * this.itemWidth;
  },
  get: function() {
    return this._index;
  }
});

Object.defineProperty(Carousel.prototype, 'containerWidth', {
  set: function(width) {
    this._containerWidth = width;
    // change itemWidth
    // change translateX
  },
  get: function() {
    return this._containerWidth;
  }
});
