var ApplicationRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.ajax('http://soysauce-site.herokuapp.com/');
  }
});

export default ApplicationRoute;
