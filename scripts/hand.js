/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 14.10.12
 * Time: 19:57
 * To change this template use File | Settings | File Templates.
 */

var handConstructor = function(firstCard, secondCard, thirdCard) {
    var that = new Object();
    that.firstCard = firstCard;
    that.secondCard = secondCard ;
    that.thirdCard= thirdCard;
    that.deck = undefined;

    that.toString = function() {
        return firstCard+","+secondCard+","+thirdCard;

    }

    that.popCard = function (id) {
        var poppingCard = that[id];
        that[id]  = undefined;
        return poppingCard;
    }

    that.getEmptySlot = function() {
        for (card in that) {
            if (that[card] === undefined) {
                return card;
            }
        }
    }

    that.cardsHaving = function(func, otherCard) {
        var arrayReturn = [];
        that["firstCard"] && func(that["firstCard"],otherCard) && arrayReturn.push("firstCard");
        that["secondCard"] && func(that["secondCard"],otherCard) && arrayReturn.push("secondCard");
        that["thirdCard"] && func(that["thirdCard"],otherCard) && arrayReturn.push("thirdCard");
        return arrayReturn;


    }

    that.availCards = function() {
        var arrayReturn = [];
        that["firstCard"] && arrayReturn.push("firstCard");
        that["secondCard"] && arrayReturn.push("secondCard");
        that["thirdCard"] && arrayReturn.push("thirdCard");
        return arrayReturn;

    }

    that.fishCard = function() {
        var id = that.getEmptySlot();
        if (that.deck.hasCards()) {
            that[id]  = that.deck.popCard();
        } else {
            that[id] = undefined;
        }
    }

    that.playCard = function(playedCard) {
        if (playedCard && playedCard.numero) {
            return that.getBestSecondCard(playedCard);
        } else {
            return that.getBestFirstCard();
        }
    }

    that.checkRule = function(ruleName, selectCardsFunc, playCardFunc, cardPlayed) {
        console && console.log("Check Rule : "+ruleName + " against card "+ cardPlayed);
        var selectedCards =  that.cardsHaving(selectCardsFunc, cardPlayed);
        for (var i = 0 ; i < selectedCards.length; i++) {
            console & console.log("Found Card "+that[selectedCards[i]]);
        }
        if (selectedCards.length > 0) {
            return playCardFunc.call(that, selectedCards);
        }
        return 0;
    }

    that.getBestSecondCard = function(cardPlayed) {

        var toPlayCard = that.checkRule("STROZZA", function(card, otherCard) {
            return card.getValue() > otherCard.getValue() && card.seme !== that.deck.getBriscola().seme && card.seme === otherCard.seme;
        },that.playHighestCardFromArray, cardPlayed);

        if (!toPlayCard) toPlayCard = that.checkRule("NO BRISCOLA", function(card, otherCard) {
            return card.seme === that.deck.getBriscola().seme && otherCard.seme !== otherCard.seme && otherCard.getValue() > 0;
        },that.playLowestCardFromArray, cardPlayed);

        if (!toPlayCard) toPlayCard = that.checkRule("OTHER CARD BRISCOLA", function(card, otherCard) {
            return otherCard.seme === that.deck.getBriscola().seme && otherCard.seme !== card.seme && card.getValue() < 10;
        },that.playLowestCardFromArray, cardPlayed);

        if (!toPlayCard) toPlayCard = that.checkRule("OTHER CARD SCARTINA", function(card, otherCard) {
            otherCard.seme !== that.deck.getBriscola().seme && otherCard.seme !== card.seme && otherCard.getValue() < 10 && card.getValue() < 10;
        },that.playLowestCardFromArray, cardPlayed);

        if (!toPlayCard) toPlayCard = that.playLowestCardFromArray(this.availCards());
        return toPlayCard;

    }

    that.getBestFirstCard = function() {

        var toPlayCard = that.checkRule("SCARTINA", function(card, otherCard) {
            return card.getValue() === 0 && card.seme !== that.deck.getBriscola().seme;
        },that.playLowestCardFromArray, undefined);

        if (!toPlayCard) toPlayCard = that.checkRule("SMALLCARD", function(card, otherCard) {
            return card.getValue() < 10 && card.seme !== that.deck.getBriscola().seme;
        },that.playLowestCardFromArray, undefined);


        if (!toPlayCard) toPlayCard = that.checkRule("SMALLBRISCOLA", function(card, otherCard) {
            return card.getValue() < 10 ;
        },that.playLowestCardFromArray, undefined);

        if (!toPlayCard) toPlayCard = that.playLowestCardFromArray(that.availCards() );

        return toPlayCard;

    }



    that.playRandomCardFromArray = function(cardArr) {
        var selectedIndex = Math.floor(Math.random()*cardArr.length)
        return that.popCard(cardArr[selectedIndex]);
    }


    that.playHighestCardFromArray = function(cardArr) {
        var result = cardArr[0];
        console & console.log("playHighestCardFromArray : "+that[result]);
        for (var i = 0 ; i < cardArr.length; i++) {
            if (that[cardArr[i]].getValue() > that[result].getValue()) {
                result = cardArr[i];
                console & console.log("playHighestCardFromArray : PICKING "+that[result]);
            } else {
                console & console.log("playHighestCardFromArray : REFUSING "+that[result]);
            }

        }
        return that.popCard(result);
    }

    that.playLowestCardFromArray = function(cardArr) {
        var result = cardArr[0];
        console & console.log("playLowestCardFromArray : "+that[result]);
        for (var i = 0 ; i < cardArr.length; i++) {
            if (that[cardArr[i]].getValue() < that[result].getValue()) {
                result = cardArr[i];
                console & console.log("playLowestCardFromArray : "+that[result]);
            } else {
                console & console.log("playLowestCardFromArray : "+that[result]);
            }
        }
        return that.popCard(result);
    }


    that.playRandomCard = function(playedCard) {
        //return that.popCard("firstCard") || that.popCard("secondCard") || that.popCard("thirdCard");
        var avail = that.availCards();
        var selectedIndex = Math.floor(Math.random()*avail.length)
        return that.popCard(avail[selectedIndex]);
    }



    that.getCardArray = {

    }

    return that;
}

var tableConstructor = function() {
    var that = new Object();

    that.firstHand = undefined;
    that.secondHand= undefined;

    that.firstWinner = function(briscolaCard, status) {
        console && console.log("firstWinner("+briscolaCard+","+status+")");
        if (status === 5) {
            return that.firstHand.beats(that.secondHand, briscolaCard);
        } else {
            return  ! that.secondHand.beats(that.firstHand, briscolaCard);
        }
    }

    that.getValue = function() {
        return that.firstHand.getValue() + that.secondHand.getValue();
    }

    that.clear = function() {
        that.firstHand = undefined;
        that.secondHand= undefined;

    }
    return that;
}







