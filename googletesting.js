// googletesting.js
var query = "RiojaDotNet";

casper.test.begin('La búsqueda devuelve 10 o más resultados', 5, function suite(test) {
    casper.start("http://www.google.es/", function () {
        test.assertTitle("Google", "el título de la página es el esperado");
        test.assertExists('form[action="/search"]', "existe el cuadro de búsqueda");
        this.fill('form[action="/search"]', {
            q: query
        }, true);
    });

    casper.then(function () {
        test.assertTitle(query + " - Buscar con Google", "el título es correcto");
        test.assertUrlMatch(new RegExp('q=' + query), "el termino se ha enviado y aparece en la URL");
        test.assertEval(function () {
            return __utils__.findAll("h3.r").length >= 10;
        }, "la búsqueda de " + query + " devuelve 10 o más resultados");
    });

    casper.run(function () {
        test.done();
    });
});