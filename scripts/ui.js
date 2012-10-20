/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 14.10.12
 * Time: 19:58
 * To change this template use File | Settings | File Templates.
 */


var uiConstructor = function() {

    var that = new Object();

    that.getTargetId = function(uiImg) {

        var targetId = uiImg.currentTarget.id;
        return targetId;
    }


    that.getCardType = function() {
        return $("#deckTypeComboBox").val();
    }

    that.getImageLoc = function(card) {
        if (card && card.seme && card.numero) {
            imageLoc = that.getCardType()+"/"+card.numero+card.seme+".bmp";
            return imageLoc;
        } else {
            return "";
        }

    }


    that.setSrcForImage = function(id,card) {
        var image = that.getImageLoc(card)
        $(id).attr('src',that.getImageLoc(card));
        this.hideIf(id,!image);

    }

    that.showFirstHand = function(hand) {
        that.setSrcForImage("#firstHandFirstCard",hand.firstCard);
        that.setSrcForImage("#firstHandSecondCard",hand.secondCard);
        that.setSrcForImage("#firstHandThirdCard",hand.thirdCard);
    }


    that.showSecondHand = function(hand) {
        if (GAME.cheat) {
            that.setSrcForImage("#secondHandFirstCard",hand.firstCard);
            that.setSrcForImage("#secondHandSecondCard",hand.secondCard);
            that.setSrcForImage("#secondHandThirdCard",hand.thirdCard);
        } else {
            that.setImageForDorso("#secondHandFirstCard", !hand.firstCard);
            that.setImageForDorso("#secondHandSecondCard", !hand.secondCard);
            that.setImageForDorso("#secondHandThirdCard", !hand.thirdCard);
        }

    }

    that.showTable = function(table) {
        that.setSrcForImage("#tableFirstHand",table.firstHand);
        that.setSrcForImage("#tableSecondHand",table.secondHand);
    }

    that.hideIf = function(id,hide) {
        if (hide) {
            $(id).css('display','none');
        } else {
            $(id).css('display','block');
        }

    }

    that.setImageForDorso = function(id, hide) {
        $(id).attr('src',that.getCardType()+'/dorso.bmp');
        that.hideIf($(id), hide);

    }

    that.showDorso = function(hide) {
        that.setImageForDorso("#deck", hide);
    }

    that.showBriscola = function(briscola, hide) {
        that.setSrcForImage("#briscola",briscola);
        that.hideIf("#briscola", hide);

    }

    that.showScore = function(firstScore, secondScore) {
        $("#firstScore").html(firstScore);
        $("#secondScore").html(secondScore);

    }

    that.showCardsLeft = function(cardsLeft) {
        $("#cardsAbove").html(cardsLeft);
    }

    that.showCardInLog = function(card) {
        var toAddRow = playedCard.longForm() +  " ("+playedCard.toString()+")"
        $("#logArea").val($("#logArea").val() + toAddRow+"\n");
        $("#logArea").scrollTop(
            $("#logArea")[0].scrollHeight - $("#logArea").height()
        );

    }

    that.clearLog = function() {
        $("#logArea").val("");
    }

    return that;

}

var UI = uiConstructor();
