define([
    'jquery', 
    'underscore', 
    'backbone',
    'text!templates/letter_card.html',
    'text!data/letterWords.json'
], function($, _, Backbone, tmpl, data){
    'use strict';
    
    var CardView = Backbone.View.extend({
        
        el: $('#juneli'),
        
        dataStructure: JSON.parse(data),
        
        wordStructure: '',
        
        wordPosition: -1,
        
        nextLetter: '',
        
        previousLetter: '',
        
        initialize: function(selectedLetter){
            this.wordStructure = null;
            this.setWordStructure(selectedLetter);
            this.setPreviousLetter();
            this.setNextLetter();
            this.updateWordStructure();
            $(this.el).empty();
            this.render();
        },
        
        render: function(){
            var t = _.template(tmpl);
            $(this.el).append( t(this.wordStructure) );
        },
        
        setWordStructure: function(letter) {
            var self = this;
            self.wordStructure = _.find(self.dataStructure.letterWords, function(item, index) {
                if(item.letterId == letter) {
                    self.wordPosition = index;
                    return item;
                }
            });
        },
        
        setNextLetter: function() {
            if((this.wordPosition + 1) < this.dataStructure.letterWords.length) {
                this.nextLetter = this.dataStructure.letterWords[this.wordPosition +1].letterId;
            } else {
                this.nextLetter = '';
            }
        },
        
        setPreviousLetter: function() {
            if(this.wordPosition > 0) {
                this.previousLetter = this.dataStructure.letterWords[this.wordPosition -1].letterId;    
            } else {
                this.previousLetter = '';
            }
        },
        
        updateWordStructure: function(){
            _.extend(this.wordStructure, {
                previousLetter: this.previousLetter,
                nextLetter: this.nextLetter
            });
        },
        
        events: {
            'click button.nextCard': 'showNextCard',
            'click button.previousCard': 'showPreviousCard',
            'click h2 a.letter': 'playLetterSound'
        },
        
        showPreviousCard: function(evt) {
            if(this.previousLetter != '') {
                Backbone.history.navigate('/letter?' + this.previousLetter);
                this.initialize(this.previousLetter);    
            } else {
                Backbone.history.navigate('/home', true);
            }
        },
        
        showNextCard: function(evt) {
            if(this.nextLetter != '') {
                Backbone.history.navigate('/letter?' + this.nextLetter);
                this.initialize(this.nextLetter);    
            } else {
                Backbone.history.navigate('/home', true);
            }
        },
        
        playLetterSound: function(evt) {
            document.getElementsByClassName('letterSound')[0].play();
        }
    });
    
    return CardView;
    
});