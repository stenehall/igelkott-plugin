var assert = require('chai').assert,
Stream = require('stream'),

Igelkott = require('igelkott'),
Plugin = require('../igelkott-plugin.js').Plugin;


describe('Plugin', function() {

  var igelkott,
  config,
  s,
  server;

  beforeEach(function () {
    s = new Stream.PassThrough({objectMode: true});

    config = {
      "server": {
        "nick": "igelkott",
      },
      core: ['privmsg'],
      'adapter': s, 'connect': function() { this.server.emit('connect'); }
    };

    igelkott = new Igelkott(config);
    igelkott.plugin.load('plugin', {}, Plugin);
  });



  it('Should be able to reaload a plugin', function(done) {
   var TestPlugin = function TestPlugin() {
      this.name = 'testplugin';
      this.listeners = {'PING': function PING() {
        done();
      }};
    };

    igelkott.plugin.load('testplugin', {}, TestPlugin);

    igelkott.connect();
    igelkott.emit('PING');

    s.write(':eighty4!~eighty4@unaffiliated/eighty4 PRIVMSG ##botbotbot :!reload testplugin\r\n');
  });


});
