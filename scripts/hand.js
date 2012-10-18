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

    that.getBestSecondCard = function(cardPlayed) {

        console && console.log("getBestSecondCard ("+cardPlayed+")");

        var cardStrozza  = that.cardsHaving(
            function(card, otherCard) {

                return card.getValue() > otherCard.getValue() && card.seme !== that.deck.getBriscola().seme && card.seme === otherCard.seme;
            }, cardPlayed
        );
        console && console.log(cardStrozza.toString());

        if (cardStrozza.length > 0) {
            console && console.log("STROZZA");
            return that.playHighestCardFromArray(cardStrozza);
        }
        var otherCardNoBriscola  = that.cardsHaving(
            function(card, otherCard) {
                return card.seme === that.deck.getBriscola().seme && otherCard.seme !== otherCard.seme && otherCard.getValue() > 0;
            }, cardPlayed
        );
        console && console.log(otherCardNoBriscola.toString());

        if (otherCardNoBriscola.length > 0) {
            console && console.log("NO BRISCOLA");

            return that.playLowestCardFromArray(otherCardNoBriscola );
        }

        var otherCardBriscola  = that.cardsHaving(
            function(card, otherCard) {
                return otherCard.seme === that.deck.getBriscola().seme && otherCard.seme !== card.seme && card.getValue() < 10;
            }, cardPlayed
        );
        console && console.log(otherCardBriscola.toString());
        if (otherCardBriscola.length > 0) {
            console && console.log("BRISCOLA");

            return that.playLowestCardFromArray(otherCardBriscola  );
        }


        var otherCardScartina  = that.cardsHaving(
            function(card, otherCard) {
                otherCard.seme !== that.deck.getBriscola().seme && otherCard.seme !== card.seme && otherCard.getValue() < 10 && card.getValue() < 10;
            }, cardPlayed
        );
        console && console.log(otherCardScartina .toString() );

        if (otherCardScartina .length > 0) {
            console && console.log("SCARTINA");
            return that.playLowestCardFromArray(otherCardScartina );
        }
        return that.playRandomCard();


    }

    that.getBestFirstCard = function() {
        var cardNoValues = that.cardsHaving(
            function(card) {
                return card.getValue() === 0 && card.seme !== that.deck.getBriscola().seme;
            }
        );
        if (cardNoValues.length > 0) {
            console && console.log("SCARTINA");

            return that.playRandomCardFromArray(cardNoValues);
        }
        var cardSmallValues = that.cardsHaving(
            function(card) {
                return card.getValue() < 10 && card.seme !== that.deck.getBriscola().seme;
            }
        );
        if (cardSmallValues.length > 0) {
            console && console.log("SMALL");

            return that.playRandomCardFromArray(cardSmallValues);
        }

        var cardSmallBriscola = that.cardsHaving(
            function(card) {
                return card.getValue() < 10 ;
            }
        );
        if (cardSmallBriscola .length > 0) {
            console && console.log("BRISCOLA");

            return that.playLowestCardFromArray(cardSmallBriscola );
        }
        return that.playLowestCardFromArray(that.availCards() );

    }



    that.playRandomCardFromArray = function(cardArr) {
        var selectedIndex = Math.floor(Math.random()*cardArr.length)
        return that.popCard(cardArr[selectedIndex]);
    }


    that.playHighestCardFromArray = function(cardArr) {
        var result = cardArr[0];
        for (var i = 0 ; i < cardArr.length; i++) {
            if (that[cardArr[i]].getValue() > that[result].getValue()) {
                result = cardArr[i];
            }
        }
        return that.popCard(result);
    }

    that.playLowestCardFromArray = function(cardArr) {
        var result = cardArr[0];
        for (var i = 0 ; i < cardArr.length; i++) {
            if (that[cardArr[i]].getValue() < that[result].getValue()) {
                result = cardArr[i];
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







