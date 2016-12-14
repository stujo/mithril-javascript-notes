/*global m*/


var planets = [
    { name: "Mercury", mass_10_24kg: 0.330, diameter_km: 4879 },
    { name: "Venus", mass_10_24kg: 4.87, diameter_km: 12104 },
    { name: "Earth", mass_10_24kg: 5.97, diameter_km: 12756 },
    { name: "Mars", mass_10_24kg: 0.642, diameter_km: 6792 },
    { name: "Jupiter", mass_10_24kg: 1898, diameter_km: 142984 },
    { name: "Saturn", mass_10_24kg: 568, diameter_km: 120536 },
    { name: "Uranus", mass_10_24kg: 86.8, diameter_km: 51118 },
    { name: "Neptune", mass_10_24kg: 102, diameter_km: 49528 }
];

var homeModule = {
    controller: function() {
        console.log("LIFECYCLE: homeModule controller");
        return { planets: planets };
    },
    view: function(controller) {
        console.log("LIFECYCLE: homeModule view");
        return m("div", [
            m("h1", "Planets"),
            m("ul", controller.planets.map(function(planet) {
                return m("li", m("a[href='/planets/" + planet.name + "']", { config: m.route }, planet.name));
            }))
        ]);
    }
};

var planetsModule = {

    controller: function() {
        console.log("LIFECYCLE: planetsModule controller");

        var planetName = m.route.param("planetName");
        var planet = planetLookup(planetName);

        return {
            planets: planets,
            planetName: planetName,
            planet: planet
        };

        function planetLookup(name) {
            return planets.find(function(planet) {
                return planet.name == name;
            });
        }
    },
    view: function(controller) {
        console.log("LIFECYCLE: planetsModule view");
        return m("div", [
            m("h1", controller.planet.name),
            m("div", "Mass : " + controller.planet.mass_10_24kg + " 10^24kg"),
            m("div", "Diameter : " + controller.planet.diameter_km + " km"),
            m("div", m("a[href='/']", { config: m.route }, "back"))
        ]);
    }
};


m.route(document.body, "/", {
    "/": homeModule,
    "/planets/:planetName": planetsModule
});
