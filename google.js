var links = [];

var query = 'RiojaDotNet';
var casper = require('casper').create();

function getLinks() {
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.text;
        //return e.getAttribute('href');
    });
}

casper.start('http://www.google.es/', function() {
   // Esperar a que se cargue el cuadro de búsqueda
   this.waitForSelector('form[action="/search"]');
});

casper.then(function() {
   // Buscamos la query
   this.fill('form[action="/search"]', { q: query }, true);
});

casper.then(function() {
    // Obtenemos los links del listado
    links = this.evaluate(getLinks);
});

casper.run(function() {
    this.echo(links.length + ' enlaces encontrados:');
    this.echo(' - ' + links.join('\n - ')).exit();
});