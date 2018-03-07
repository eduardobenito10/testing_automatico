var url = 'http://localhost:8080/portal_alumno/public';
var user = '16611334K';
var password = 'profesor1';

casper.test.begin('Formulario de login', 8, function suite(test) {
    casper.start(url, function () {
        test.assertExists('#form_usr_pass', 'Formulario de login presente');
    });

    /* Envio vacio */
    casper.then(function () {
        this.click('button');
        casper.wait(1000, function () {
            test.assertExists('.alert.alert-danger');
            test.assertSelectorHasText('.alert.alert-danger', 'El usuario no existe.')
            //test.assertTextExists("El usuario no existe.");
        });
    });

    /* Usuario incorrecto */
    casper.then(function () {
        this.fill('#form_usr_pass', {
            user: 'usuario_no_registrado',
            password: '',
        }, true);
        casper.wait(1000, function () {
            test.assertExists('.alert.alert-danger');
            test.assertSelectorHasText('.alert.alert-danger', 'El usuario no existe.')
            //test.assertTextExists("El usuario no existe.");
        });
    });

    /* Password incorrecta */
    casper.then(function () {
        this.fill('#form_usr_pass', {
            user: user,
            password: 'password_incorrecta',
        }, true);
        casper.wait(1000, function () {
            test.assertExists('.alert.alert-danger');
            test.assertSelectorHasText('.alert.alert-danger', 'La contraseña no es correcta.')
            //test.assertTextExists("El usuario no existe.");
        });
    });

    casper.then(function () {
        this.fill('#form_usr_pass', {
            user: user,
            password: password
        }, true);
        casper.wait(1000, function () {
            test.assertUrlMatch(url + '/alumno', 'Login correcto');
        });
    });

    casper.run(function () {
        this.test.done();
    });
});