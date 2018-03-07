var url = 'http://localhost:8080/portal_alumno/public';
var user = '16611334K';
var password = 'profesor1';

var faker = require('faker');
faker.locale = 'es';

var nif = faker.helpers.replaceSymbolWithNumber("########");
var nombre = faker.name.firstName();
var apellidos = faker.name.lastName() + ' ' + faker.name.lastName();
var email = faker.internet.email();

casper.test.begin('Listado de alumnos', 7, function suite(test) {
    casper.start(url, function () {
        this.fill('#form_usr_pass', {
            user: user,
            password: password
        }, true);
    });

    /* NUEVO */
    casper.waitForUrl(url + '/alumno', function () {
        casper.click('.btn-success');
        casper.wait(1000, function () {
            test.assertUrlMatch(url + '/alumno/nuevo', 'URL de nuevo alumno correcta');
        });
    });

    casper.then(function () {
        casper.click('#btn-guardar');
        test.assertTextExists('Este campo es obligatorio.', 'Nos aseguramos que no se puede enviar vacío');
    });

    casper.then(function () {
        this.fill('#form-alumno', {
            nif: nif,
            nombre: nombre,
            apellidos: apellidos,
            mail: 'email_incorrecto',
        }, true);
        test.assertTextExists('Por favor, escribe una dirección de correo válida', 'Comprobamos que el mail tiene que ser correcto');
    });

    casper.then(function () {
        this.fill('#form-alumno', {
            nif: nif,
            nombre: nombre,
            apellidos: apellidos,
            mail: email
        }, true);
        casper.waitForUrl(url + '/alumno/index', function () {
            test.assertTextExists('Alumno guardado correctamente.', 'Alumno creado');
        });
    });

    /* EDITAR */
    casper.thenOpen(url + '/alumno/editar/?id=' + nif, function () {
        var calificacion = faker.random.number(10);
        this.fill('#form-alumno', {
            nombre: nombre + '_',
            calificacion: calificacion
        }, true);
        casper.waitForUrl(url + '/alumno/index', function () {
            test.assertTextExists(nombre + '_', "Alumno cambiado");
        });
    });

    casper.thenOpen('http://localhost:1080/messages', function () {    
        //var json = '[{"id":1,"sender":"<eduardo.benito@portaldelalumno.com>","recipients":["<Adn.Mercado@gmail.com> "],"subject":"Calificaciones","size":"440","created_at":"2018 - 02 -22T11: 13: 46 + 00: 00"}]';
        //var json_messages = JSON.parse(json);
        var json_messages = JSON.parse(this.getPageContent());
        test.assert(json_messages.length > 0, "Mail enviado");
    });

    /* ELIMINAR */
    casper.thenOpen(url + '/alumno/', function () {
        casper.setFilter('page.confirm', function (message) {
            return true;
        });
        var nif_eliminado = casper.evaluate(function () {
            return $('#dataTableAlumnos tr:last-child td:first-child')[0].innerHTML;
        });

        casper.thenClick('#dataTableAlumnos tr:last-child .delete');
        casper.wait(1000, function () {
            test.assertTextDoesntExist(nif_eliminado, "Alumno eliminado");            
        });
    });

    
    casper.run(function () {
        this.test.done();
    });

});