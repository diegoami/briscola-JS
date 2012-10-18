/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 14.10.12
 * Time: 18:29
 * To change this template use File | Settings | File Templates.
 */




var deckConstructor = function() {
    var that, cards = [] ;
    that = new Object();
    for (var semIndex = 0; semIndex < semi.length; semIndex++) {
        for (var numIndex = 1; numIndex <= 10; numIndex ++ ) {
            var card = cardConstructor(semi[semIndex], numIndex);
            cards.push(card )
        }
    }
    that.cards = cards;


    that.shuffle = function () {
        cl = that.cards.length-1;
        for( i = cl; cl  >= 1 ; cl-- ) {
            j = Math.floor((Math.random()*(i+1)));

            var tmp = that.cards[j];
            that.cards[j] = that.cards[i];
            that.cards[i] = tmp;

        }
        that.briscola = that.cards[0];
    }

    that.showCards = function() {
        return that.cards.toString();
    }


    that.popCard = function() {
        return that.cards.pop();
    }

    that.popHand = function() {
        var hand  = handConstructor(that.popCard(), that.popCard(), that.popCard());
        hand.deck = that;
        return hand  ;
    }

    that.hasCards = function() {
        return that.cards.length > 0;
    }

    that.getBriscola = function() {
        return that.briscola;
    }

    return that;

}







