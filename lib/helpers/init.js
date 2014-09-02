soysauce.init = function(element) {
  var type = $(element).attr('data-ss-widget') || null;
  var supportedWidgets = ['carousel', 'toggler'];

  if (!type) {
    throw new SyntaxError('soysauce.init(): Please specify a valid widget type');
    return;
  }

  if (supportedWidgets.indexOf(type) === -1) {
    throw new TypeError('soysauce.init(): Invalid widget type \'' + type + '\'');
    return;
  }

  return new Promise(function(resolve, reject) {
    var widget = soysauce.fetch(element);

    if (widget) {
      return resolve(widget.init(element, { reinit: true }));
    }

    if (type === 'carousel') {
      return resolve(new Carousel(element));
    }
    else {
      return reject();
    }
  });
};
