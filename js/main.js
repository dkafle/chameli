'use strict';

require.config({
    
    shim: {
        easel: {
            exports: 'cc'  
        },
        tween: {
            deps: ['easel'],
            exports: 'Tween'
        },
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'backbone'
        }
    },
    
    paths: {
        'jquery'    : '../bower_components/jquery/dist/jquery',
        'underscore': '../bower_components/underscore/underscore',
        'backbone'  : '../bower_components/backbone/backbone',
        'text'      : '../bower_components/requirejs-text/text',
        //'createjs'  : 'createjs',
        'easel'     : 'easeljs',
        'tween'     : 'tweenjs',
        'templates' : '../templates',
        'data'      : '../data'
    }
    
});

require([
    'backbone',
    'views/home',
    'views/letterCard'
], function(Backbone, HomeView, CardView) {
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        routes: {
            'letter': 'letterCardRoute',
            'abc'   : 'testRoute',
            'home'  : 'homeRoute',
            ''      : 'homeRoute'
        }
    });
    
    var app_router = new AppRouter();
    
    app_router.on('route:homeRoute', function(action){
        return new HomeView();    
    });
    
    app_router.on('route:testRoute', function(){
        //return new CanvasView();
        console.log('Nothing here!');
    });
    
    app_router.on('route:letterCardRoute', function(letter){
        return new CardView(letter);
    });
    
    Backbone.history.start();

});