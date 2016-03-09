
(function(exports) {
    "use strict";

    // Para evitar definir un metodo nuevo por cada unidad añadida,
    // ya que llevaria a reescribir un codigo, convierto los convierto
    // en dos metodos toStd y fromStd
    // toStd . fromStd == fromStd . toStd
    // y donde para el caso de las temperaturas
    // toCelsius = toStd
    // fromCelsius = fromStd

    function Temperatura(identificador, obj) {
        Medida.call(this, "Temperatura",
                    function(value) { return this.convertions; });


        console.log(Medida.prototype.converters);
        if (this.convertions) {

            this.convertions = {}
        }
        //this.posibleConvertions
    }



    // Debido a esto las 
    function Celsius() {
    }

    Celsius.prototype = {
        toStd: function(value) {
            return value;
        },
        fromStd: function(value) {
            return value;
        }
    };
})(this);
