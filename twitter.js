var casper = require('casper').create({    
});

//var user = casper.cli.args[0];
//var password = casper.cli.args[1];

var credentials = require("./credentials.json");
var fs = require("fs");

var url = "https://twitter.com";

casper.start(url, function () {
    this.echo("I'm loaded.");
});

casper.then(function () {
    this.echo("getCurrentUrl " + this.getCurrentUrl());
    this.echo("title " + this.getTitle());
});

/* LOGIN */
casper.then(function () {
    this.click('.StaticLoggedOutHomePage-signupBlock .StaticLoggedOutHomePage-signupHeader a[href="/login"]');
});

casper.then(function () {
    this.echo("getCurrentUrl " + this.getCurrentUrl());
});

casper.then(function () {
    this.fillSelectors('form.js-signin', {
        'input[name="session[username_or_email]"]': credentials.username,
        'input[name="session[password]"]': credentials.password
    }, true);
});

casper.waitForSelector('.ProfileCardStats-statValue', function () {
    this.echo("El elemento está disponible.");
});

casper.then(function () {
    this.echo("Logueado");
    this.echo(this.getTitle());
    this.echo(this.getCurrentUrl());

    //this.bypass(1);
});

var getTweetCount = function () {
    return document.querySelector('.ProfileCardStats-stat a[data-element-term="tweet_stats"] .ProfileCardStats-statValue').innerHTML;
};

var getFollowingStats = function () {
    return document.querySelector('.ProfileCardStats-stat a[data-element-term="following_stats"] .ProfileCardStats-statValue').innerHTML;
};
var getFollowerStats = function () {
    return document.querySelector('.ProfileCardStats-stat a[data-element-term="follower_stats"] .ProfileCardStats-statValue').innerHTML;
};

casper.then(function () {
    var tweet_stats = this.evaluate(getTweetCount);
    var following_stats = this.evaluate(getFollowingStats);
    var follower_stats = this.evaluate(getFollowerStats);

    this.echo("tweet_stats: " + tweet_stats);
    this.echo("following_stats: " + following_stats);
    this.echo("follower_stats: " + follower_stats);

    var myjson = { "tweet_stats": tweet_stats, "following_stats": following_stats, "follower_stats": follower_stats };
    fs.write("data.json", JSON.stringify(myjson), "w");
});

casper.then(function () {
    this.captureSelector('twitterstat.png', '.ProfileCardStats-stat');
    this.captureSelector('twitterprofile.png', '.DashboardProfileCard');
    //this.capture('twitterall.png');
});

casper.run(function () {
    this.echo('Done.');
    this.exit();
});