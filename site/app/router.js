import Ember from 'ember';

var Router = Ember.Router.extend({
  location: SiteENV.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('api');
  this.resource('history');
  this.resource('download');
  this.route('contribute');
  this.route('catch-all', { path: '*:' });
});

export default Router;
