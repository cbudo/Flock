//var Strap = require('strap-metrics');
var UI = require('ui');
var Settings = require('settings');
var ajax = require('ajax');
//Strap.Init('zDzhTn5pQK9soonfi');

var lat;
var lon;
var menu;

var options = [{
    title: "Restaurant Info"
}, {
    title: "Invite A Friend"
}, {
    title: "Recommend"
}];

Settings.config({
    url: 'http://pebblewebultranuvo.azurewebsites.net/APIs/loginfo'
},

function (e) {
    console.log('opening configurable');
    Settings.option('color', 'red');
},

function (e) {
    console.log('closed configurable');
});

navigator.geolocation.getCurrentPosition(

function (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
    //Strap.log("Used from: "+lat+","+lon);
    myFunc();
},

function (err) {
    console.log("Error: " + err);
},

function (err) {
    console.log("Gps error: " + JSON.stringify(err));
}, {
    timeout: 10000
});

var count;
var bdata;
var business;

function myFunc() {
    var URL = 'http://pebblewebultranuvo.azurewebsites.net/apis/nearbyrestaurants?latitude=' + lat + '&longitude=' + lon;
    console.log(URL);
    //Strap.log("Got list of businesses");

    ajax({
        url: URL,
        type: 'json'
    },

    function (data) {
        bdata = data;
        count = bdata.businesses.length;
        business = bdata.businesses;
        setData();
    },

    function (error) {
        console.log('Failed' + error);
    });
}

var menutitles = [];
var i = 0;

function setData() {
    while (i < count) {
        if (!business[i].name) {
            i++;
            continue;
        }
        menutitles[i] = {
            title: business[i].name,
          subtitle: 'rating: ' + business[i].rating + ' stars'
        };
        //Strap.log("Business loaded: "+business[i].name);
        i++;
    }
}

var names = [{
    name: 'Brooke',
    number: 8122437113,
    email: 'brownba1@rose-hulman.edu',
}, {
    name: 'Chris',
    number: 5135442427,
    email: 'budocf@rose-hulman.edu',
}, {
    name: 'Jeremiah',
    number: 2539730487,
    email: 'goistjt@rose-hulman.edu',
}, {
    name: 'Melissa',
    number: 7038811188,
    email: 'thaimp@rose-hulman.edu',
}];


var main = new UI.Card({
    title: '\n Flock',
    icon: 'images/feather.png',
    body: '\n Press select to see list of businesses.'
});
main.show();

main.on('click', 'select', function (e) {
    menu = new UI.Menu({
        sections: [{
            title: 'Restaurants Near You',
            items: menutitles
        }]
    });
    menu.show();

    menu.on('select', function (e) {
        i = e.itemIndex;
        var menu2 = new UI.Menu({
            sections: [{
                title: 'Choose an Option',
                items: options
            }]
        });
        menu2.show();

        menu2.on('select', function (e) {
            switch (e.itemIndex) {
                case 0:
                    var card = new UI.Card({
                        title: business[i].name
                    });
                card.body(business[i].location.display_address + '\n' + 'rating: ' + business[i].rating + ' stars');
                    card.show();
                    break;

                case 1:
                    var names2 = new UI.Menu({
                        sections: [{
                            title: 'Contacts',
                            items: [{
                                title: 'Brooke'
                            }, {
                                title: 'Chris'
                            }, {
                                title: 'Jeremiah'
                            }, {
                                title: 'Melissa'
                            }]
                        }]
                    });
                    names2.show();
                    names2.on('select', function (e) {
                        var n = e.itemIndex;
                        var msgvsemail = new UI.Menu({
                            sections: [{
                                title: 'Choose an Option',
                                items: [{
                                    title: 'Message'
                                }, {
                                    title: 'Email'
                                }]
                            }]
                        });
                        msgvsemail.show();
                        msgvsemail.on('select', function (e) {
                            var m = e.itemIndex;
                            switch (m) {
                                case 0:
                                    var URL = 'http://pebblewebultranuvo.azurewebsites.net/apis/twiljoin?fromNum=8126456872&toNum=' + names[n].number + '&business=' + business[i].id;
                                                                    
                                    //Strap.log("Sent business id: "+business[i].id);
                                    console.log(URL);
                                    ajax(
                                      {
                                        url: URL,
                                        type: 'boolean'
                                      },
                                      function(data) {
                                        console.log('sent');
                                        var msent = new UI.Card({
                                            title: 'Invite Sent!'
                                        });
                                        msent.body('Your invitation was sent to ' + names[n].name + '!');
                                        msent.show();
                                      },
                                      function(error) {
                                        console.log('failed: ' + error);
                                      }
                                    );
                                    break;
                                case 1:
                                    URL = 'http://pebblewebultranuvo.azurewebsites.net/apis/jetjoin?tomail=' + names[n].email + '&fromMail=budocf@rose-hulman.edu&business=' + business[i].id;
                                
                                    //Strap.log("Sent business id: "+business[i].id);
                                    ajax(
                                      {
                                        url: URL,
                                        type: 'boolean'
                                      },
                                      function(data) {
                                        console.log('sent');
                                        var esent = new UI.Card({
                                            title: 'Invite Sent!'
                                        });
                                        esent.body('Your invitation was sent to ' + names[n].name + '!');
                                        esent.show();
                                      },
                                      function(error) {
                                        console.log('failed: ' + error);
                                      }
                                    );
                                    break;
                            }
                        });
                    });
                    break;

                case 2:
                    var names3 = new UI.Menu({
                        sections: [{
                            title: 'Contacts',
                            items: [{
                                title: 'Brooke'
                            }, {
                                title: 'Chris'
                            }, {
                                title: 'Jeremiah'
                            }, {
                                title: 'Melissa'
                            }]
                        }]
                    });
                    names3.show();
                    names3.on('select', function (e) {
                        var m = e.itemIndex;
                        var msgvsemail2 = new UI.Menu({
                            sections: [{
                                title: 'Choose an Option',
                                items: [{
                                    title: 'Message'
                                }, {
                                    title: 'Email'
                                }]
                            }]
                        });
                        msgvsemail2.show();
                        msgvsemail2.on('select', function (e) {
                            var p = e.itemIndex;
                            switch (p) {
                              case 0:
                                    var URL = 'http://pebblewebultranuvo.azurewebsites.net/apis/twilSuggest?fromNum=8126456872&toNum=' + names[m].number + '&business=' + business[i].id;
                                    console.log(URL);
                                
                                    //Strap.log("Sent business id: "+business[i].id);
                                    ajax(
                                      {
                                        url: URL,
                                        type: 'boolean'
                                      },
                                      function(data) {
                                        console.log('sent');
                                        var mssent = new UI.Card({
                                            title: 'Suggestion Sent!'
                                        });
                                        mssent.body('Your suggestion was sent to ' + names[m].name + '!');
                                        mssent.show();
                                      },
                                      function(error) {
                                        console.log('failed: ' + error);
                                      }
                                    );
                                    break;
                                case 1:
                                    URL = 'http://pebblewebultranuvo.azurewebsites.net/apis/jetsuggest?tomail=' + names[m].email + '&fromMail=budocf@rose-hulman.edu&business=' + business[i].id;
                                    console.log(URL);
                                
                                    //Strap.log("Sent business id: "+business[i].id);
                                    ajax(
                                      {
                                        url: URL,
                                        type: 'boolean'
                                      },
                                      function(data) {
                                        console.log('sent');
                                        var essent = new UI.Card({
                                            title: 'Suggestion Sent!'
                                        });
                                        essent.body('Your suggestion was sent to ' + names[m].name + '!');
                                        essent.show();
                                      },
                                      function(error) {
                                        console.log('failed: ' + error);
                                      }
                                    );
                                    break;
                            }
                        });
                    });
                    break;
            }
        });
    });
});


// Strap.log("app/loaded");