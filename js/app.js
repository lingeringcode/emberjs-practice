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
App.IndexController = Ember.ArrayController.extend({
  //this keeps tabs on the length
  unicornCount: Ember.computed.alias('length'),
  /*============================
    This is the same as above:

    unicornCount: function () {
    return this.get('length');
    }.property('length') 
  ==============================*/
  logo: 'assets/img/unicorn-herd.jpeg',
  time: function() {
    return(new Date()).toDateString()
  }.property()
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('unicorn');
  }
});

//feeds properties to specified expression in index
App.UnicornsArrayController = Ember.ArrayController.extend({
  unicornCount: 999,
  logo: 'images/logo.png',
  time: function() {
    return(new Date()).toDateString()
  }.property()
});

//using to decorate the object on client-side
App.UnicornsController = Ember.ArrayController.extend({
  sortProperties: ['name']
  //if Z-A desired, then "sortAscending: false"
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
  img: DS.attr('string'),
  comments: DS.hasMany('comment', {async: true})
});

App.Comment = DS.Model.extend({
  text: DS.attr('string'),
  commentAt: DS.attr('date'),
  unicorn: DS.belongsTo('unicorn')
});

App.Unicorn.FIXTURES = [
  {
    id: 1,
    name: 'Pilgrim',
    age: 854,
    bio: 'Pilgrim is a young unicorn, but the most bold.',
    img: 'assets/img/pilgrim.jpg',
    comments: []
  },
  {
    id: 2,
    name: 'Shimmer',
    age: 5000,
    bio: 'Shimmer shines, and she is the unicorn leader.',
    img: 'assets/img/shimmer.jpg',
    comments: []
  },
  {
    id: 3,
    name: 'Fauxnie',
    age: 2345,
    bio: 'Fauxnie lurks in the shadow arts of hipster.',
    img: 'assets/img/fauxnie.jpg',
    comments: [100,101]
  }
];

App.Comment.FIXTURES = [
  {
    id: 100,
    unicorn: 3,
    text: "Umm, you're so last month."
  },
  {
    id: 101,
    name: 3,
    text: "That's so fetch!"
  }
];