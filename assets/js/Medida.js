
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
    // en cada clase de medida
    function Medida(claseMedida, possibleConvertions) {
        // Vector de tipos de medida y sus conversiones
        // Se considera que no se puede pasar de m a temperatura
        if (!this.converters) {
            this.converters = { claseMedida : possibleConvertions };  // quiero guardar nombreMedida, function para comprobar tipo que debe ser una clausura
        }
        else {
            this.converters[claseMedida] = possibleConvertions;
        }

        // Las funciones son un monoide con:
        // identity como valor unitario
        // y la composición de funciones como append

        // if (!tipo) {
        //     var param = XRegExp(""
        //                         + "(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s* ) # Get number \n"
        //                         + "((e(?<exponent> [-+]?\\d+)\\s*)?)               # Get Exponent \n"
        //                         + "(?<measure>     [a-zA-Z]+)                      # Get kind");
        //     var m = XRegexExp.exec(valor, param);
        //     this.valor = parseFloat(m.value) * Math.pow(10, parseInt(m.exponent));
        //     this.tipo  = m.measure;
        // }
        // else {
        //     this.valor = valor;
        //     this.tipo  = tipo;
        // }
    }

    Medida.prototype = {
        convertir: function (input) {
            var measures = '[a-zA-Z]+';

            var inputRegex = XRegExp(
                      '^(\\s*)                                            # whitespaces \n'
                    + '(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s*)     # captures the number   \n'
                    + '((e(?<exponent> [-+]?\\d+)\\s*)?)                  # captures the exponent \n'
                    + '(?<kind>       ' + measures + ')                   # Capture kind of value \n'
                    + '((?:\\s+to)?\\s+ (?<toKind>' + measures + '))?     # Get "to" syntax \n'
                    + '(\\s*)$                                            # whitespaces \n'
                    , 'xi');

            var m = XRegexExp.exec(valor, param);

            var medidas = Object.keys(this.converters); // [ 'Temperatura', 'Distancia' ... ]
            var i = 0;
            var found = false;
            var from; // no se puede hacer var from = x && var to = y && false :(
            var to;
            while (!found && medidas[i]) { // i < medidas.length
                // So funny
                // Miro por categorias, si en esa consigo el to y el from para convertir, salgo
                (from = this.converters[medidas[i]](m.kind[0])) && (to = this.converters[medidas[i]](m.toKind[0])) && (found = true);
                i++;
            }

            if (found) {
                //averiguar si la palabra está bien escrita
                if(!from.check(m.kind) || !to.check(m.kind)){
                  Console.log("asdasdasda");
                  return "Problemo";
                }else{
                  var result = to(from(value)); // esta compuesto >>> queda mejor
                  return result;
                }
            }
            else if (from !== null) { // esta mal pensado repensar o añadir propiedades al from TODO:
                return "No se encontro un valor para convertir de " + "joder" + "se tienen las siguientes opciones" + "joder" + " el tipo de medida es " + "joder";
            }
            else {
                return "No se sabe en que medidas se trabaja";
            }
        }
    };

    exports.Medida = Medida;
})(this);
