soysauce.widgets = [];

soysauce.fetch = function(selector) {
  var $this = $(selector);
  var id = parseInt($this.attr('data-ss-id'), 10);
  var index, length;
  var widgets = soysauce.widgets;

  for (index = 0, length = widgets.length; index < length; index++) {
    var widget = widgets[index];

    if (widget.id === id) {
      return widget;
    }
  }

  return null;
};
