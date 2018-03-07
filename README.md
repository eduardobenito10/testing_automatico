# Testing automático de páginas web con CasperJS

Para ejecutar los scripts de ejemplo debemos tener instaladas las librerías PhantomJS y CasperJS
Lo manera más fácil para no tener que preocuparnos de incluirlas en el PATH es instalarlas mediante npm comom un módulo global:

```console
$ npm install -g phantomjs casperjs
```

Una vez instaladas las librerías podemos ejecutar los scripts de la siguiente manera:
```console
$ casperjs google.js
```
O si se trata de script que use el módulo tester:
```console
$ casperjs test googletesting.js
```
