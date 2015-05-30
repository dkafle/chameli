define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/ka_kha_ga.html',
    'text!data/letters.json'
], function($, _, Backbone, tmpl, data) {
    'use strict';
    
    var HomeView = Backbone.View.extend({
        
        el: $('#juneli'),
        
        data: {},
        
        initialize: function(){
            this.data = JSON.parse(data);
            $(this.el).empty();
            this.render();
        },
        
        render: function(){
            var t = _.template(tmpl);
            $(this.el).append( t(this.data) );
        }
    });
    
    return HomeView;
    
});