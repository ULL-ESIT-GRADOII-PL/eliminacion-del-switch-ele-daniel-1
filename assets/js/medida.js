(function(exports) {
    "use strict";

    function Medida(valor,tipo) {
        if (!tipo) {
            var param = XRegExp(""
                                + "(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s* ) # Get number \n"
                                + "((e(?<exponent> [-+]?\\d+)\\s*)?)               # Get Exponent \n"
                                + "(?<measure>     [a-zA-Z]+)                      # Get kind");
            var m = XRegexExp.exec(valor, param);
            this.valor = parseFloat(m.value) * Math.pow(10, parseInt(m.exponent));
            this.tipo  = m.measure;
        }
        else {
            this.valor = valor;
            this.tipo  = tipo;
        }

    }

    Medida.match = function (input) {
            var measures = '[a-z]+';

            var inputRegex = XRegExp(
                '^(\\s*)                                                  # whitespaces \n'
                    + '(?<value>       [-+]?\\d+ (?:[\\.,]\\d*)?\\s*)     # captures the number   \n'
                    + '((e(?<exponent> [-+]?\\d+)\\s*)?)                  # captures the exponent \n'
                    + '(?<tipo>       ' + measures + ')                   # Capture kind of value \n'
                    + '((?:\\s+to)?\\s+ (?<destino>' + measures + '))?    # Get "to" syntax \n'
                    + '(\\s*)$                                            # whitespaces \n'
                , 'xi');

            return XRegExp.exec(input, inputRegex);
    };

    Medida.medidas = {};

    Medida.convertir = function(valor) {
        var measures = Medida.medidas;

        measures.c = Celsius;
        measures.f = Fahrenheit;
        measures.k = Kelvin;

        var match = Medida.match(valor);

        if (match) {
            var numero = match.value,
                tipo   =  match.tipo,
                destino = match.destino;
            try {
                var source = new measures[tipo[0].toLowerCase()](numero);  // new Fahrenheit(32) //asumimos que la priemra letra es el tipo correcto
                var target = "to"+measures[destino[0].toLowerCase()].name; // "toCelsius"
                var checkTarget = new measures[destino[0].toLowerCase()](numero)
                if(!source.check(tipo) || !checkTarget.check(destino)) {
                  return "a";
                  throw "Error de tipos";
                }
                return source[target]().toFixed(2) + " "+target; // "0 Celsius"
            }
            catch(err) {
                return 'Desconozco como convertir desde "'+tipo+'" hasta "'+destino+'"';
            }
        }
        else
            return "Introduzca una temperatura valida: 330e-1 F to C";
    };

    exports.Medida = Medida;
})(this);
