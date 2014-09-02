var Test = function(){};
var expect;

Test.prototype.reset = function() {
  return $('#testing').html('');
};

Test.prototype.injectCarousel = function() {
  this.reset();
  return $('#testing').html('<div data-ss-widget="carousel"><div data-ss-component="item">Slide 1</div></div>')
};

window.SoysauceTest = new Test();

$(function() {
  soysauce.setupForTesting();
  mocha.setup('bdd');
  chai.should();
  expect = chai.expect;
});

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

$(function() {
  var selector;
  var carouselInitHtml = '<div class="carousel" data-ss-widget="carousel"><div data-ss-component="item"></div></div>';

  describe('Carousel - Unit Tests', function() {
    describe('destroy()', function() {
      beforeEach(function(done) {
        $('#testing').html(carouselInitHtml);
        soysauce.init('.carousel').then(done());
      });

      it('should properly destroy', function(done) {
        var carousel = soysauce.fetch('.carousel');

        carousel.destroy().then(function() {
          try {
            expect(soysauce.fetch('.carousel')).to.be.null;
          }
          catch(e) {
            return e;
          }
        }).then(done);
      });
    });
  });
});

$(function() {
  describe('Inheritance - Unit Tests', function() {
    describe('extend()', function() {
      var subject, Widget, ExtendedClass;

      before(function() {
        var widget;

        Widget = soysauce.testing.classes['Widget'];

        ExtendedClass = Widget.extend({
          init: function() {
            return this;
          }
        });

        widget = new ExtendedClass();
        subject = widget.init();
      });

      it('new widget should be an instance of the base', function() {
        expect(subject instanceof Widget).to.be.true;
      });

      it('new widget should be an instance of itself', function() {
        expect(subject instanceof ExtendedClass).to.be.true;
      });

      it('new widget should expose _super in an inherited method', function() {
        var widget;

        ExtendedClass = Widget.extend({
          init: function() {
            return this;
          },
          validate: function() {
            return this._super;
          },
          nonInheritedMethod: function() {
            return this._super;
          }
        });

        widget = new ExtendedClass();

        expect(widget.validate()).to.not.be.undefined;
      });

      it('new widget should not expose _super in an non-inherited method', function() {
        var widget;

        ExtendedClass = Widget.extend({
          init: function() {
            return this;
          },
          validate: function() {
            return this._super;
          },
          nonInheritedMethod: function() {
            return this._super;
          }
        });

        widget = new ExtendedClass();

        expect(widget.nonInheritedMethod()).to.be.undefined;
      });
    });
  });
});

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

$(function() {
  mocha.checkLeaks();
  mocha.globals(['jQuery']);
  mocha.run();
});
