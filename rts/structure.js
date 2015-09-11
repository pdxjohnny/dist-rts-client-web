"use strict";

class structure extends unit {
  constructor(options) {
    super(options);
    this.options_displayed = [];
    this.stats.max_speed = 0;
    this.stats.image = "assets/basestructure.png";
    this.update_stats();
  }
  on_select() {
    this.display_options();
  }
  display_options() {
    this.options_displayed = this.create_options();
    this.game.set_options(this.options_displayed);
  }
  create_options() {
    var current_option;
    var current_class;
    var options = [];
    var can_create = creation.can_create(this);
    for (var i = 0; i < can_create.length; i++) {
      // Create a new class so we can see what the stats are
      // Make sure to set disable_first_update to true
      // So that the creation of the unit is not boradbast
      current_class = new can_create[i]({
        name: "tmp_name",
        disable_first_update: true,
      });
      // Set up the option
      current_option = new Option(can_create[i].name);
      current_option.image = current_class.stats.image;
      current_option.onclick = this.create_unit.bind(this);
      // Add the option to the list of options
      options.push(current_option);
    }
    return options;
  }
  create_unit(event) {
    var create_type = false;
    for (var i = 0; i < event.path.length; i++) {
      for (var j = 0; j < this.options_displayed.length; j++) {
        if (event.path[i].hasOwnProperty("title") &&
          event.path[i].title === this.options_displayed[j].title) {
          create_type = this.options_displayed[j].title;
        }
      }
    }
    // Make sure there is a unit
    if (!create_type) {
      return;
    }
    // Create the unit
    var name = create_type + "_" + Math.random();
    this.player.create_unit(name, create_type, {
      stats: {
        x: this.stats.x,
        y: this.stats.y,
        dest: {
          x: this.stats.x + this.image.width,
          y: this.stats.y + this.image.height
        }
      }
    });
  }
}
