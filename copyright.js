var slugify = require('slugify')

var casper = require('casper').create({
    clientScripts: [
        'includes/jquery.min.js',
    ],
    viewportSize: {
        width: 1920,
        height: 1080
    }
});

var urls = [
    /* INSTITUCIONES */
    'http://www.unirioja.es',
    'http://www.larioja.org',
    'http://www.riojasalud.es',
    'http://www.ader.es',
    'http://www.fundacioninnovacionrioja.com/',
    'http://www.larioja.com/',
    'http://www.unir.net/',
    'http://www.logroño.es/',
    'http://www.agendadigitalriojana.es/',
    // /* DESARROLLO */
    // 'http://www.siam-it.com',
    // 'http://www.gnoss.com',
    // 'http://www.irsoluciones.com/',
    // 'https://www.knet.es/',
    // 'http://www.sdi.es/',
    // 'http://www.jig.es/',
    // 'http://www.arsys.es/',
    // 'http://www.sumainfo.es/',
    // 'https://www.terabyte2003.com/',
    // 'http://www.netbrain.es/',
    /* DISEÑO WEB */
    // 'http://www.sidecaronline.com/',
    // 'http://www.leadmarketingdigital.com/',
    // 'http://www.estudiocreativoro.com/',
    // 'https://www.modulo.es/',
    // 'https://mastres.com/',
    // 'https://procesyva.com/',
    // 'http://www.phicsandgraphics.com/es/',
    //
];

function checkCopyright() {
    var copyright = $(document).find("*:contains('©')");
    if (copyright.length > 0) {
        var year = copyright[copyright.length - 1].innerHTML.match(/\d{4}/);
        return year || 'No se especifica el año';
    }
    return 'No se ha encontrado el símbolo ©';
}

casper.start().each(urls, function (self, link) {
    self.thenOpen(link, function () {
        year = this.evaluate(checkCopyright);
        this.echo(link + ' - ' + year);
        dominio = slugify(link, { replacement: '_', remove: /[$*_+~()'"!\-:@/]/g, lower: true });
        this.capture('capturas/'+dominio + '.png');
    });
});

casper.run(function () {
    this.echo('Done.');
    this.exit();
});