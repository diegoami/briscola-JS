/**
 * Created with JetBrains WebStorm.
 * User: diego
 * Date: 14.10.12
 * Time: 20:17
 * To change this template use File | Settings | File Templates.
 */




var semi = ['b', 's', 'o', 'c'];

var cardConstructor = function(seme, numero) {
    var nomeNumeri = ["Asso", "Due", "Tre", "Quattro", "Cinque", "Sei", "Sette", "Fante", "Cavallo", "Re"];

    var values = [11, 0, 10, 0, 0, 0, 0, 2, 3, 4];
    var order =  [11, 1, 10, 2, 3, 4, 5, 6, 7, 8];
    var nomeSemi = {
        'b' : "Bastoni",
        's' : "Spade",
        'o' : "Denari",
        'c' : "Coppe"

    };


    var that, seme, numero;
    that = new Object();
    that.seme = seme;
    that.numero = numero;

    that.toString = function() {
        return numero+seme;
    }

    that.longForm = function() {
        return nomeNumeri[that.numero-1]+ " di "+nomeSemi[that.seme];

    }

    that.getValue = function() {
        return values[that.numero-1];
    }

    that.getOrder = function() {
        return order[that.numero-1];
    }

    that.beats = function(otherCard, briscolaCard) {
        console && console.log("beats("+that+","+otherCard+","+briscolaCard+")");

        var semeBriscola = briscolaCard.seme;
        if (that.seme === briscolaCard.seme && otherCard.seme !== briscolaCard.seme) {
            return true;
        }
        if (that.seme !== briscolaCard.seme && otherCard.seme === briscolaCard.seme) {
            return false;
        }
        if (otherCard.getValue() > that.getValue() && that.seme === otherCard.seme) {
            return false;
        }

        if (otherCard.getOrder() > that.getOrder() && that.seme === otherCard.seme) {
            return false;
        }

        return true;
    }


    return that;
}