var Plugin = function Plugin() {
  this.name = "plugin";
  this.help = {
    "default": "At the moment it only supports reload of plugins, it'll soon support load and unload as well",
    "reload": {
      "default": "!reload <plugin>"
    }
  };

  this.listeners = {'trigger:reload': this.reload, 'trigger:unload': this.unload, 'trigger:load': this.load};
};

Plugin.prototype.reload = function reload(message) {
  this.igelkott.plugin.unload(message.parameters[1].split(' ')[1]);
  this.igelkott.load(message.parameters[1].split(' ')[1]);
};

Plugin.prototype.unload = function unload(message) {
  this.igelkott.plugin.unload(message.parameters[1].split(' ')[1]);
};

Plugin.prototype.load = function load(message) {
  this.igelkott.load(message.parameters[1].split(' ')[1]);
};

exports.Plugin = Plugin;
