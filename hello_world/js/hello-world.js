/*global m*/

var helloWorldApp = {};

//the Banner (model?) class has one property

helloWorldApp.Banner = function(message) {
  // m.prop is a factory for a setter/getter function
  this.message = m.prop(message);
};

// NOT SPECIFICALLY FOR Mithril!
// Funky helper function to give us a loop of messages
function arrayLoop(messages){
  var index = 0;

  return function messageHelper(){
    if(index >= messages.length){
      index = 0;
    }
    return messages[index++];
  };
}

//define the view-model
helloWorldApp.vm = {

  init: function() {
    helloWorldApp.vm.banner = new helloWorldApp.Banner(helloWorldApp.vm.messageGenerator());

    // Set the message
    helloWorldApp.vm.set = function() {
      helloWorldApp.vm.banner.message(helloWorldApp.vm.messageGenerator());
    };
  },
  messageGenerator : arrayLoop([
    'Hello World!',
    '42? Fourty-Two???',
    'Goodbye!',
    'Thanks for All the Fish'])
};

//define the controller
helloWorldApp.controller = function() {
  helloWorldApp.vm.init();
};

helloWorldApp.view = function() {
  return m('html', [
    m('body', [
      m('h1', helloWorldApp.vm.banner.message() || 'N/A'),
      m('button', {onclick: helloWorldApp.vm.set}, 'Go!!'),
    ])
  ]);
};


m.mount(document.body, {controller: helloWorldApp.controller, view: helloWorldApp.view});


