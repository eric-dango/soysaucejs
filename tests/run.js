$(function() {
  mocha.checkLeaks();
  mocha.globals(['jQuery']);
  mocha.run();
});
