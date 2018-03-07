var url = 'http://localhost:8080/portal_alumno/public';

casper.test.begin('Titulo es correcto', 2, function suite(test) {
    casper.start(url, function () {
        test.assertHttpStatus(200, "Se ha cargado correctamente.")
        test.assertTitleMatches(/Portal del alumno/i, "El titulo es el esperado");
    });

    casper.run(function () {
        this.test.done();
    });
});