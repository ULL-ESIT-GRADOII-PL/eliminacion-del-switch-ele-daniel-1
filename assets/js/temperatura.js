(function(exports) {
    "use strict";

    function Temperatura(valor, tipo) {
        Medida.call(this, valor, tipo);
    }

    function Celsius(valor) {
        Temperatura.call(this, valor, "c");



    }

    Celsius.prototype = {
        name: "Celsius",

        toFahrenheit: function(value) {
            return ((this.valor * 9/5)+32);
        },

        toCelsius: function(value) {
            return this.valor;
        }


    };

    function Fahrenheit(valor) {
        Temperatura.call(this, valor, "f");


    }

    Fahrenheit.prototype = {
        name: "Fahrenheit",

        toCelsius: function(value) {
            return ((this.valor - 32)*5/9);
        },

        toFahrenheit: function(value) {
            return this.valor;
        }
    };

    //Temperatura.prototype.medidas.c = this;
    //Temperatura.prototype.medidas.f = this;
    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Fahrenheit = Fahrenheit;

})(this);
