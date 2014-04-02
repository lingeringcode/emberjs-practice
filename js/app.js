App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

//need to tell our templates where to render on the page
App.Router.map(function() {
  /*================================================
    URL   == http://example.com#/about
    Path  == /about
    Route == about
    Finds {{outlet}} expression, then inserts route
    ==============================================*/
  this.route('about');
  this.resource('unicorns', function() {
    /*==============================================
      -nested resource route w/ dynamic segment path
      -Ember path: unicorns/:name
      -Route: unicorn
      -URL: http://example.com#/unicorns/Shimmer
      ============================================*/
    this.resource('unicorn', { path: '/:unicorn_id' })
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

/*=============================================
  Unicorn route with a basic model property
  model can be obj or array of objs
  Finds/fetches all data from fixture adapter 
  to set onto the model to set on the controller
  =============================================*/
App.UnicornsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('unicorn');
  }
});

/*=============================================
  NOTE: This is actually Ember's default behavior,
  so I could delete this code, if all I want this
  Route to perform is find the unique_id
  =============================================*/
App.UnicornRoute = Ember.Route.extend({
  model: function(path) {
    return this.store.find('unicorn', path.unicorn_id);
  }
});

/*good practice == defining data types,
    otherwise Ember will make assumptions.*/
App.Unicorn = DS.Model.extend({
  name: DS.attr('string'),
  age: DS.attr('number'),
  bio: DS.attr('string'),
  img: DS.attr('string')
});

App.Unicorn.FIXTURES = [
  {
    id: 1,
    name: 'Pilgrim',
    age: 854,
    bio: 'Pilgrim is a young unicorn, but the most bold.',
    img: 'assets/img/pilgrim.jpg'
  },
  {
    id: 2,
    name: 'Shimmer',
    age: 5000,
    bio: 'Shimmer shines, and she is the unicorn leader.',
    img: 'assets/img/shimmer.jpg'
  },
  {
    id: 3,
    name: 'Fauxnie',
    age: 2345,
    bio: 'Fauxnie lurks in the shadow arts of hipster.',
    img: 'assets/img/fauxnie.jpg'
  }
];