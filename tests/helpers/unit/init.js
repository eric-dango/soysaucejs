$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-widget="carousel"><div data-ss-component="item">Empty Item</div></div>';

  describe('soysauce.init() - Unit Tests', function() {
    beforeEach(function() {
      $('#testing').html(carouselInitHtml);
    });

    it('should initialize a carousel', function(done) {
      soysauce.init('.carousel').then(function(widget) {
        try {
          widget.initialized.should.equal(true);
          widget.$.attr('data-ss-init').should.equal('true');
        }
        catch(e) {
          return e;
        }
      }).then(done);
    });

    it('should initialize a carousel with a single option', function(done) {
      $('.carousel').attr('data-ss-options', 'autoscroll');
      soysauce.init('.carousel').then(function(widget) {
        try {
          widget.initialized.should.equal(true);
          widget.$.attr('data-ss-init').should.equal('true');
          widget.hasOption('autoscroll').should.equal(true);
          widget.destroy();
        }
        catch(e) {
          return e;
        }
      }).then(done);
    });

    it('should initialize a carousel with multiple options', function(done) {
      $('.carousel').attr('data-ss-options', 'autoscroll zoom');
      soysauce.init('.carousel').then(function(widget) {
        try {
          widget.initialized.should.equal(true);
          widget.$.attr('data-ss-init').should.equal('true');
          widget.hasOption('autoscroll').should.equal(true);
          widget.hasOption('zoom').should.equal(true);
          widget.destroy();
        }
        catch(e) {
          return e;
        }
      }).then(done);
    });

    it('should have a container and a container wrapper', function(done) {
      soysauce.init('.carousel').then(function(widget) {
        widget.initialized.should.equal(true);
        widget.destroy();
      }).then(done);
    });
  });
});
