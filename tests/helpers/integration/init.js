$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-widget="carousel"><div data-ss-component="item">Empty Item</div></div>';

  before(function() {
    $('#testing').html(carouselInitHtml);
  });

  describe('soysauce.init() - Integration Tests', function() {
    it('should place widget in soysauce.widgets', function(done) {
      var compare = soysauce.widgets.length;
      var map, index;

      soysauce.widgets.length.should.equal(0);

      soysauce.init('.carousel').then(function(widget) {
        try {
          widget.initialized.should.equal(true);
          widget.$.attr('data-ss-init').should.equal('true');

          soysauce.widgets.indexOf(widget).should.not.equal(-1);
        }
        catch(e) {
          return e;
        }
      }).then(done);
    });

    it('should not increment soysauce.widgets.length after re-init', function(done) {
      soysauce.widgets.length.should.equal(1);
      soysauce.init('.carousel').then(function(widget) {
        try {
          soysauce.widgets.length.should.equal(1);
        }
        catch(e) {
          return e;
        }
        widget.destroy();
      }).then(done);
    });
  });
});
