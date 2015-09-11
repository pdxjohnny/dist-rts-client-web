"use strict";

class structure_base extends structure {
  constructor(options) {
    super(options);
    this.send_update();
  }
  on_select() {
    this.display_options();
  }
  display_options() {
    var options = this.create_options();
    this.game.set_options(options);
  }
  create_options() {
    var options = [];
    var can_create = creation.can_create(this);
    for (var i = 0; i < can_create.length; i++) {
      console.log(can_create[i].name);
    }
    return options;
  }
}
window.unit_types.structure_base = structure_base;
unit_loaded();
