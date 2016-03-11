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

        check: function(tipo) {
          return tipo.match(/(^c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?$)/i);
        },

        toFahrenheit: function(value) {
            return ((this.valor * 9/5)+32);
        },

        toCelsius: function(value) {
            return this.valor;
        },

        toKelvin: function(value) {
          return this.valor - 273;
        }
    };

    function Fahrenheit(valor) {
        Temperatura.call(this, valor, "f");
    }

    Fahrenheit.prototype = {
        name: "Fahrenheit",

        check: function(tipo) {
          return tipo.match(/(^f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?$)/i);
        },

        toCelsius: function(value) {
            return ((this.valor - 32)*5/9);
        },

        toFahrenheit: function(value) {
            return this.valor;
        },

        toKelvin: function(value) {
          return this.toCelsius(this.valor) - 273;
        }
    };

    function Kelvin(valor) {
        Temperatura.call(this, valor, "k");
    }

    Kelvin.prototype = {
        name: "Kelvin",

        check: function(tipo) {
          return tipo.match(/(k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)/i);
        },

        toCelsius: function(value) {    //javascript no sabe sumar ._.
            return ((this.valor) - -273);
        },

        toFahrenheit: function(value) {
            return ((this.toCelsius(this.valor) * 9/5)+32);
        }
    };

    //Temperatura.prototype.medidas.c = this;
    //Temperatura.prototype.medidas.f = this;
    exports.Temperatura = Temperatura;
    exports.Celsius = Celsius;
    exports.Fahrenheit = Fahrenheit;
    exports.Kelvin = Kelvin;

})(this);
