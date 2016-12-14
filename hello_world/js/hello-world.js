var helloWorldApp = {};

//the Banner (model?) class has one property

helloWorldApp.Banner = function(message) {
  console.log("BANNER", message)
  // m.prop is a factory for a setter/getter function
  this.message = m.prop(message);
};

//define the view-model
helloWorldApp.vm = {
    init: function() {
        helloWorldApp.vm.banner = new helloWorldApp.Banner();

        // Set the message
        helloWorldApp.vm.set = function() {
            var message = 'Hello World!';
            helloWorldApp.vm.banner.message(message);
        };
    }
};

//define the controller
helloWorldApp.controller = function() {
    helloWorldApp.vm.init();
};

helloWorldApp.view = function() {
    return m("html", [
        m("body", [
           m("h1", helloWorldApp.vm.banner.message() || "N/A"),
           m("button", {onclick: helloWorldApp.vm.set}, "Go!!"),
        ])
    ]);
};


m.mount(document.body, {controller: helloWorldApp.controller, view: helloWorldApp.view});


