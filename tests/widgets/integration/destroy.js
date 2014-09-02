$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-widget="carousel"><div data-ss-component="item"></div></div>';

  describe('Carousel - Integration Tests', function() {
    describe('destroy()', function() {
      beforeEach(function(done) {
        $('#testing').html(carouselInitHtml);
        soysauce.init('.carousel').then(done());
      });

      it('should properly destroy', function(done) {
        var carousel = soysauce.fetch('.carousel');

        carousel.destroy().then(function() {
          try {
            soysauce.widgets.indexOf(carousel).should.equal(-1);
          }
          catch(e) {
            return e;
          }
        }).then(done);
      });
    });
  });
});
