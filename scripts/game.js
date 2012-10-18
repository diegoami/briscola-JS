/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 14.10.12
 * Time: 20:05
 * To change this template use File | Settings | File Templates.
 */

var gameConstructor = function() {
    var that = new Object();
    that.firstScore = 0;
    that.secondScore = 0;

    that.status = 1;
    that.start = function() {
        that.deck = deckConstructor();
        that.table = tableConstructor();
        for (var i =0; i < 10; i++) {
            that.deck .shuffle();
        }

    }

    that.dealHand = function() {
        that.firstHand = that.deck.popHand();
        that.secondHand = that.deck.popHand();
    }


    that.playCard = function(id) {
        cardRegExp = /((?:first|second|third)Hand)((?:first|second|third)Card)/i;
        matches = cardRegExp.exec(id);
        if (matches) {
            handId = matches[1];
            matchedCardId = matches[2];
            cardId =  matchedCardId.charAt(0).toLowerCase() + matchedCardId.slice(1);
            hand = that[handId];
            card = hand.popCard(cardId);
            that.table[handId] = card;
            return card;
        } else {
            return undefined;
        }

    }

    that.updateUI = function(UI) {
        UI.showFirstHand(that.firstHand);
        UI.showSecondHand(that.secondHand);
        UI.showTable(that.table);
        UI.showDorso( ! that.deck.hasCards());
        UI.showBriscola(that.deck.getBriscola(), ! that.deck.hasCards());
        UI.showScore(that.firstScore, that.secondScore);

    }

    that.tick = function() {
        if (that.status === 2 || that.status === 4) {
            playedCard = that.secondHand.playCard(that.table.firstHand) ;
            that.table.secondHand = playedCard;
            if (that.status === 2)
                that.status = 5;
            if (that.status === 4)
                that.status = 3;

        } else if (that.status === 5 || that.status === 6 ) {
            playerWinner = that.table.firstWinner(that.deck.getBriscola(), that.status);
            console && console.log("playerWinner = "+playerWinner);
            that.status = playerWinner ? 1 : 4;
            if (playerWinner) {
                that.firstScore += that.table.getValue();
                that.firstHand.fishCard();
                that.secondHand.fishCard();

            } else {
                that.secondScore += that.table.getValue();
                that.secondHand.fishCard();
                that.firstHand.fishCard();

            }
            that.table.clear();
        }

    }


    that.tryAndPlay = function(id) {
        if (that.status === 1 || that.status === 3) {
            that.playCard(id);
            if (that.status === 1)
                that.status = 2;
            if (that.status === 3)
                that.status = 6;
        }
    }

    return that;

}

var GAME;

function restart() {
    GAME = gameConstructor();
    GAME.start();
    GAME.dealHand();
    GAME.updateUI(UI);
    UI.clearLog();

}

function main() {
    restart();
    $("[id^=first]").click( function(eventObject) {
        var targetId = UI.getTargetId(eventObject);
        playedCard = GAME.tryAndPlay(targetId);
        //playedCard  && UI.showCardInLog(playedCard);
        GAME.updateUI(UI);
    });

    setInterval(function() {
        GAME.tick();
        GAME.updateUI(UI);
    }, 2000);

}

