function ValidationError(message) {
  this.name = 'ValidationError';
  this.message = message || '';
}

soysauce.handleError = function(e) {
  if (soysauce.DEBUG) {
    console.error(e);
  }
  return e;
};
