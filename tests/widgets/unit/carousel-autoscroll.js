$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-options="autoscroll" data-ss-widget="carousel"><div data-ss-component="item"><img src="https://www.google.com/images/srpr/logo11w.png"/></div></div>';

  describe('Carousel - Unit Tests', function() {
    describe('autoscroll option', function() {
      var carousel;

      before(function(done) {
        $('#testing').html(carouselInitHtml);
        soysauce.init('.carousel').then(function(widget) {
          carousel = widget;
          done();
        });
      });

      after(function(done) {
        carousel.destroy().then(done);
      });

      it('should have autoscroll option', function() {
        carousel.hasOption('autoscroll').should.equal(true);
      });

      it('should have play() method', function() {
        expect(carousel.play).to.not.be.undefined;
      });

      it('should have pause() method', function() {
        expect(carousel.pause).to.not.be.undefined;
      });

      it('should have default properties', function() {
        carousel.options.autoscroll.delay.should.equal(3500);
        expect(carousel.options.autoscroll.active).to.be.false;
        expect(carousel.options.autoscroll.timer).to.be.null;
      });

      it('play() should autoplay the carousel', function(done) {
        this.timeout(10000);

        carousel.play();

        carousel.index.should.equal(0);
        expect(carousel.options.autoscroll.active).to.be.true;
        expect(carousel.options.autoscroll.timer).to.not.be.null;

        window.setTimeout(function() {
          try {
            expect(carousel.index).to.be.at.least(1);
            done();
          }
          catch(err) {
            return done(err);
          }
        }, carousel.options.autoscroll.delay + 200);
      });
    });
  });
});
