"use strict";

class structure extends unit {
  constructor(options) {
    super(options);
    this.stats.max_speed = 0;
    this.stats.image = "assets/basestructure.png";
    this.update_stats();
  }
  on_select() {
    this.display_options();
  }
  display_options() {
    var options = this.create_options();
    this.game.set_options(options);
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
      current_option.image = current_class.stats.image
      // Add the option to the list of options
      options.push(current_option);
    }
    return options;
  }
}
