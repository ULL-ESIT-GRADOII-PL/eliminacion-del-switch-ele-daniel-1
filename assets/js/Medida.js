/*
 Pinsamiento POO

 class Medida:
      static converters { UnitType : { Char : Unit -> Object:matcher } };

      addToConverter :: UnitType -> Unit -> func Matcher ()

 class Temperatura(Medida):
      call father
      Temperatura (Unit)
      addToConverter :: Unit -> func Matcher ()
      matcher() :: String -> Object<:Temperatura

 class Celsius(Temperatura(Unit)):
      matcher :: String -> Object<:Celsius
      to :: Int -> Int
      from :: Int -> Int

*/
/*
 Haskell pinsamiento

 converter :: String:unit -> (Int -> Int):Converter

 X:unit
 y:unit

 // NO teniendo en cuenta errores sino se añade el tipo Maybe, o Either
 XToY :: unit -> unit -> (Int -> Int)
 XToY u1 u2 = converter u1 >>> converter u2    // >>> es la composición invertido los parámetros
 */

(function(exports) {
    "use strict";

    // Esta es la clase base para la conversión de unidades otros tipos de unidades
    //
    // Para declarar un nuevo tipo de dato se debe heredar de la clase Medida e implementar
    // los métodos para convertirlos a la medida estandar de cada caso, la cual esta comentada
    // en cada clase hija de medida
    var converters = {};
    function Medida() {
    }

    Medida.prototype = {
        addToConverters: function (unit_type, unit, obj) {
            if (!converters[unit_type]) {
                converters[unit_type] = {};
                converters[unit_type][unit] = obj;
            }
            else {
                converters[unit_type][unit] = obj;
            }
        }
    };

    Medida.convertir = function (input) {
        var measures = '[a-zA-Z]+';

        var inputRegex = XRegExp(
            '^(\\s*)                                            # whitespaces \n'
                + '(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s*)     # captures the number   \n'
                + '((e(?<exponent> [-+]?\\d+)\\s*)?)                  # captures the exponent \n'
                + '(?<kind>       ' + measures + ')                   # Capture kind of value \n'
                + '((?:\\s+to)?\\s+ (?<toKind>' + measures + '))?     # Get "to" syntax \n'
                + '(\\s*)$                                            # whitespaces \n'
            , 'xi');

        var m = XRegExp.exec(input, inputRegex);

        var medidas = Object.keys(converters); // [ 'Temperatura', 'Distancia' ... ]
        var i = 0;
        var found = false;
        var from; // no se puede hacer var from = x && var to = y && false :(
        var to;
        while (!found && medidas[i]) { // i < medidas.length
            // So funny
            // Miro por categorias, si en esa consigo el to y el from para convertir, salgo
            // if ()
            (from = converters[medidas[i]][m.kind[0]](m.kind).from)
                && (to = converters[medidas[i]][m.toKind[0]](m.toKind).to)
                && (found = true);
            i++;
        }

        if (found) {
            // measure.constructor.name
            var result = to(from(parseInt(m.value))); // esta compuesto >>> queda mejor
            return result;
        }
        else if (from !== null) { // esta mal pensado repensar o añadir propiedades al from TODO:
            return "No se encontro un valor para convertir de " + "joder" + "se tienen las siguientes opciones" + "joder" + " el tipo de medida es " + "joder";
        }
        else {
            return "No se sabe en que medidas se trabaja";
        }
    };

    exports.Medida = Medida;
})(this);
