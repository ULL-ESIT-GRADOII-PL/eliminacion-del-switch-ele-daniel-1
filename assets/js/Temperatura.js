
(function(exports) {
    "use strict";

    // Para evitar definir un metodo nuevo por cada unidad añadida,
    // ya que llevaria a reescribir un codigo, convierto los convierto
    // en dos metodos toStd y fromStd
    // toStd . fromStd == fromStd . toStd
    // y donde para el caso de las temperaturas
    // toCelsius = toStd
    // fromCelsius = fromStd
    function Temperatura(unit, matcher) {
        Medida.call(this);
        Medida.prototype.addToConverters.call(this, "Temperatura", unit, matcher);
    }


    // Las clases hijas de los tipos medidas deben implementar, una funcion de
    // matcheado `matcher`, y la transformación de la medida estandar a la
    // a la implemetada y al revés `to` y `from`
    // el nombre del constructor debe ser descriptivo
    // PS to :: Std -> Imple
    //    from :: Imple -> Std
    function Kelvin() {
        Temperatura.call(this, 'k', function(value) {
            if (value.match(/^(k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)$/)) {
                return new Kelvin();
            }
            else {
                throw "No se pudo convetir";
            }
        });
    }

    Kelvin.prototype = {
        to: function(value) {
            return value;
        },

        from: function(value) {
            return value;
        }
    };
    new Kelvin(); // creamos un singleton privado

    function Celsius() {
        Temperatura.call(this, 'c', function(value) {
            if (value.match(/(c(?:e(?:l(?:s(?:i(?:u(?:s)?)?)?)?)?)?)/)) {
                return new Celsius();
            }
            else {
                throw "No se pudo convetir";
            }
        });
    }

    Celsius.prototype = {
        to: function(value) {
            return value - 273.15;
        },

        from: function(value) {
            return value + 273.15;
        }
    };
    new Celsius(); // Otro mas privado

    function Fahrenheit() {
        Temperatura.call(this, 'f', function(value) {
            if (value.match(/^(f(?:a(?:h(?:r(?:e(?:n(?:h(?:e(?:i(?:t)?)?)?)?)?)?)?)?)?)$/)) {
                return new Fahrenheit();
            }
            else {
                throw "No se pudo convetir";
            }
        });
    }

    Fahrenheit.prototype = {
        to: function(value) {
            return value * 9/5 - 459.67;
        },

        from: function(value) {
            return (value + 459.67) * 5/9;
        }
    };
    new Fahrenheit(); // Otro mas privado

})(this);
