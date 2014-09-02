var IndexRoute = Ember.Route.extend({
  redirect: function() {
    return this.transitionTo('about');
  }
});

export default IndexRoute;
