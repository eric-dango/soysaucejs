/**
 * The base widget.
 *
 * @class Widget
 */
var Widget = function(){};
var widgetCount = 0;

/**
 * Initializes the widget.
 *
 * @method init
 * @param {DOM element | String} element The DOM element or string to initialize.
 * @param {JSON} options A hash of options.
 * @return {Promise} Resolves with itself as the instance.
 */
Widget.prototype.init = function(element, options) {
  var self = this;

  options = options || {};

  if (options.reinit) {
    this.reset();
  }

  this.options = {};
  this.frozen = false;

  if (element) {
    this.$ = $(element);
    this.element = self.$[0];
    this.html = self.element.outerHTML;
  }

  try {
    this.validate();
  }
  catch(e) {
    return soysauce.handleError(e);
  }

  return new Promise(function(resolve) {
    self.id = ++widgetCount;
    self.$.attr('data-ss-id', self.id);

    if (self.$.attr('data-ss-options')) {
      var options = self.$.attr('data-ss-options').split(' ');
      var i, l, option;

      for (i = 0, l = options.length; i < l; i++) {
        option = options[i];
        self[option] = true;
      }
    }

    soysauce.widgets.push(self);

    self.initialized = true;
    self.$.attr('data-ss-init', 'true');
    resolve(self);
  });
};

/**
 * Adds the ability to extend the widget. Integrates the `super()` method.
 *
 * @method extend
 * @param {JSON Object} properties A hash of properties to override.
 */
Widget.extend = function(properties) {
  var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  var _super = this.prototype;
  var prototype = Object.create(this.prototype); // standard inheritance
  var name;

  prop = properties || {};

  // Set `_super` to call the parent's method.
  for (name in prop) {
    prototype[name] = typeof prop[name] == "function" &&
    typeof _super[name] == "function" && fnTest.test(prop[name]) ?
    (function(name, fn) {
      return function() {
        var tmp = this._super;

        this._super = _super[name];

        var ret = fn.apply(this, arguments);
        this._super = tmp;

        return ret;
      };
    })(name, prop[name]) : prop[name];
  }

  function Widget() {
    return this.init.apply(this, arguments);
  }

  Widget.prototype = prototype; // Set subclass to extend super class
  Widget.prototype.constructor = Widget; // Set subclass constructor to itself instead of parent

  Widget.extend = arguments.callee;

  return Widget;
};

/**
 * Determines whether or not the widget supports the given option.
 *
 * @method hasOption
 * @param {String} option
 * @return {Boolean}
 */
Widget.prototype.hasOption = function(option) {
  return this[option] || false;
};

/**
 * Resets the widget to it's original state before it was initialized. This
 * will teardown any registered events and be removed from the Soysauce collection
 * of widgets.
 *
 * @method reset
 * @return {Promise}
 */
Widget.prototype.reset = function() {
  var self = this;
  var index = soysauce.widgets.map(function(widget) { return widget.id; }).indexOf(this.id);

  return new Promise(function(resolve, reject) {
    soysauce.widgets.splice(index, 1);
    self.element.outerHTML = self.html;
    resolve();
  });
};

/**
 * Removes itself from the DOM. This also will teardown any registered events
 * and be removed from the Soysauce collection of widgets.
 *
 * @method destroy
 * @return {Promise}
 */
Widget.prototype.destroy = function() {
  var self = this;
  var index = soysauce.widgets.map(function(widget) { return widget.id; }).indexOf(this.id);

  if (this.teardown) {
    this.teardown.call(this);
  }

  return new Promise(function(resolve, reject) {
    soysauce.widgets.splice(index, 1);
    self.$.remove();
    resolve();
  });
};

/**
 * Freezes the widget, stifling any interactions and timers.
 *
 * @method freeze
 * @return {Boolean} New value.
 */
Widget.prototype.freeze = function() {
  this.frozen = true;
  return this.frozen;
};

/**
 * Unfreezes the widget, allowing interactions and reactivating timers.
 *
 * @method unfreeze
 * @return {Boolean} New value.
 */
Widget.prototype.unfreeze = function() {
  this.frozen = false;
  return this.frozen;
};

/**
 * Validates the widget, ensuring syntax and usage of the widget is correct.
 *
 * @method validate
 * @return {ValidationError} Throws error containing debug messages.
 */
Widget.prototype.validate = function() {
  throw new Error('Must implement Widget.validate()');
};

/**
 * Resizes the widget; called after browser's orientation change.
 *
 * @method resize
 */
Widget.prototype.resize = function() {
  // Stub
};
