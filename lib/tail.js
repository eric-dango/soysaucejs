soysauce.setupForTesting = function() {
  soysauce.env = 'testing';
  soysauce.DEBUG = true;
  soysauce.testing = {
    classes: {}
  };
  soysauce.testing.classes['Widget'] = Widget;
};

if (typeof(define) === 'function' && define.amd) {
  define(function() {
    return soysauce;
  });
}
else if (typeof(module) !== 'undefined' && module.exports) {
  module.exports = soysauce;
}
else {
  window[exportName] = soysauce;
}

})(window, document, jQuery, 'soysauce');
