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
