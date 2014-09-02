$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-widget="carousel"><div data-ss-component="item"></div></div>';

  describe('Carousel - Unit Tests', function() {
    describe('init()', function() {
      beforeEach(function() {
        $('#testing').html(carouselInitHtml);
      });

      afterEach(function(done) {
        soysauce.fetch('.carousel').destroy().then(done);
      });

      it('should properly initialize', function(done) {
        soysauce.init('.carousel').then(function(carousel) {
          try {
            carousel.initialized.should.equal(true);
            carousel.$.attr('data-ss-id').should.equal(carousel.id.toString());
          }
          catch(e) {
            return e;
          }
        }).then(done);
      });

      it('should properly initialize with buttons', function(done) {
        $('.carousel').attr('data-ss-options', 'buttons');
        soysauce.init('.carousel').then(function(carousel) {
          try {
            expect(carousel.$.find('[data-ss-component="button"]').length).to.be.at.least(1);
          }
          catch(e) {
            return e;
          }
        }).then(done);
      });

      it('should properly initialize with dots', function(done) {
        $('.carousel').attr('data-ss-options', 'dots');
        soysauce.init('.carousel').then(function(carousel) {
          try {
            expect(carousel.$.find('[data-ss-component="dot"]').length).to.be.at.least(1);
            carousel.$.find('[data-ss-component="dots"]').length.should.equal(1);
          }
          catch(e) {
            return e;
          }
        }).then(done);
      });
    });
  });
});
