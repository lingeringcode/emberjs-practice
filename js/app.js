App = Ember.Application.create();

//need to tell our templates where to render on the page
App.Router.map(function() {
  /*
    URL   == http://example.com#/about
    Path  == /about
    Route == about
    Finds {{outlet}} expression, then inserts route
  */
  this.route('about');

  /*
    Resource routes differ from plain routes
    1) 
    2)
  */
  this.resource('unicorns', function() {
    /*
      -nested resource route w/ dynamic segment path
      -Ember path: unicorns/:name
      -Route: unicorn
      -URL: http://example.com#/unicorns/Shimmer
    */
    this.resource('unicorn', { path: '/:name' })
  });
});

//feeds properties to specified expression in index
App.IndexController = Ember.Controller.extend({
  unicornCount: 999,
  logo: 'assets/img/unicorn-herd.jpeg',
  time: function() {
    return(new Date()).toDateString()
  }.property()
});

//feeds properties to specified expression in index
App.UnicornsArrayController = Ember.Controller.extend({
  unicornCount: 999,
  logo: 'images/logo.png',
  time: function() {
    return(new Date()).toDateString()
  }.property()
});

//Unicorn route with a basic model property
//model can be obj or array of objs
//Fetches the model to st on the controller
App.UnicornsRoute = Ember.Route.extend({
  model: function() {
    return App.UNICORNS;
  }
});

App.UnicornRoute = Ember.Route.extend({
  model: function(path) {
    return App.UNICORNS.findBy('name', path.name);
  }
});

App.UNICORNS = [
  {
    name: 'Pilgrim',
    age: 854,
    bio: 'Pilgrim is a young unicorn, but the most bold.',
    img: 'assets/img/pilgrim.jpg'
  },
  {
    name: 'Shimmer',
    age: 5000,
    bio: 'Shimmer shines, and she is the unicorn leader.',
    img: 'assets/img/shimmer.jpg'
  },
  {
    name: 'Fauxnie',
    age: 2345,
    bio: 'Fauxnie lurks in the shadow arts of hipster.',
    img: 'assets/img/fauxnie.jpg'
  }
];