var map;
var quakes = [];

require(["esri/map", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol","esri/graphic", "esri/geometry/Point", "esri/Color", "dojo/domReady!"
], function (Map, Circle, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, Graphic, Point, Color) {

    // parse keys
    Parse.initialize("ahKpQvGXaUQHQ1iCyNGyccBU1hz6UsYIWu1HQcwg", "g15tPzTig1ocoqTPFAiuZvTtYb5iq8QlgOURaZkl");

    // add basemap
    map = new Map("map", {
        basemap: "dark-gray",
        center: [-77.036744, 38.897731],
        zoom: 4
    });

    // on map load
    map.on("load", function () {
        var Quakes = Parse.Object.extend("quakes");
        var query = new Parse.Query(Quakes);
        query.descending("createdAt");
        query.greaterThan("mag", 6.0);
        query.limit(100);
        query.find({
          success: function(objects) {
           $.each(objects, function(index, quake) {
                var symbolPoint = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, Math.pow(quake.get('mag'), 10) / 10000000,
                                  new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1),
                                  new Color([255, 0, 0, 0.25]) );
                var point = new Point([quake.get('longitude'), quake.get('latitude')]);
                var pointGraphic = new Graphic(point, symbolPoint);
                map.graphics.add(pointGraphic);
           });

          },
          error: function(error) {
            console.log("Error: " + error.code + " " + error.message);
          }
        });
    });
});