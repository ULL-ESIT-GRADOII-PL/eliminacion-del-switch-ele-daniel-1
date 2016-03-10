# Eliminando los code smell del conversor

## LEE con atención
Este conversor permite que se añadan nuevas unidades definiendo las clases(funciones) y heredando de un
tipo de unidades.

Con el tipo de unidades me refiero con unidades de distancia, unidades de medida.

La aparente complejida es debida a que se tiene que asegurar que no se produsca una conversion
entre unidades de diferente tipo.

Por otro lado, se ha simplificado el código ha escrbir si se añaden nuevos clases de unidades o
unidades, esto se debe a que se definen medidas estándar entre cada tipo de unidad y todas
las demas solo deben implementar dos métodos; de la medida a implementar a la estandar y al revés.

~~~~~javascript
    function Kelvin() { // mi unidad base se especifica en cada clase de unidad

        // llamamos al padre, el tipo de unidad, se le debe pasar el identificador
        // 1 char, y una funcion que comprueba si no se ha producido un error en el tipeo
        // debido a que el conversor soporta la siguiente sintaxis
        // 45 kelvin to fah
        Temperatura.call(this, 'k', function(value) {  // llamamos al padre con el 
            if (value.match(/^(k(?:e(?:l(?:v(?:i(?:n)?)?)?)?)?)$/)) {
                return new Kelvin();
            }
            else {
                throw "No se pudo convetir";
            }
        });
    }

    // En este caso la unidad kelvin es la estandar con lo que `to` y `from` son equivalentes
    // a la funcion identidad
    // Propiedad a tener en cuenta sobre `to` y `from`
    // - to(from(value)) == from(to(value))
    Kelvin.prototype = {
        to: function(value) {
            return value;
        },

        from: function(value) {
            return value;
        }
    };
    new Kelvin(); // creamos un singleton privado,
    // esto sirve para que automaticamente se administre las conversiones posibles desde
    // la clase `Medida` y no tener que tocar código ya escrito posible
~~~~~

**Repositorio GitHuB**

* [Repositorio](https://github.com/ULL-ESIT-GRADOII-PL/eliminacion-del-switch-ele-daniel-1)

**Página de la práctica**

* [Web](http://ull-esit-gradoii-pl.github.io/eliminacion-del-switch-ele-daniel-1/)

**Páginas de los autores**

* [Web Daniel](http://alu0100783230.github.io/)
* [Web Eleazar](http://elediaz.github.io/public/portafolio.html)


**Página de la práctica**

* [Página de la asignatura](https://campusvirtual.ull.es/1516/mod/page/view.php?id=177984)
