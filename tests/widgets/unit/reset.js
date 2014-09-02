$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-widget="carousel"><div data-ss-component="item"></div></div>';

  describe('soysauce.reset()', function() {
    var id;

    before(function() {
      $('#testing').html(carouselInitHtml)
      return soysauce.init('.carousel').then(function(widget) {
        id = widget.id;
        return widget.reset();
      });
    });

    it('should remove the id', function() {
      var id = $('.carousel').attr('data-ss-id') || '';
      id.should.equal('');
    });

    it('should re-init the html', function() {
      $('.carousel')[0].outerHTML.should.equal(carouselInitHtml);
    });

    it('should remove the widget from soysauce.widgets', function() {
      for (var i = 0, l = soysauce.widgets.length; i < l; i++) {
        soysauce.widgets[i].id.should.not.equal(id);
      }
    });
  });
});
