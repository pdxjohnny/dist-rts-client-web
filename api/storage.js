"use strict";

class ApiStorage {
  constructor(options) {
    this.DumpKey = false;
    this.DumpChosen = false;
    for (var prop in options) {
      this[prop] = options[prop];
    }
    this.apply();
    return this;
  }
  apply() {
    this.api.ChooseDump = this.ChooseDump.bind(this);
    this.api.DumpRecv = this.DumpRecv.bind(this);
    window.on_units_loaded.push(this.Dump.bind(this));
  }
  Dump() {
    this.DumpKey = String(Math.random());
    // Send the request to dump
    api.send({
      Method: "Dump",
      DumpKey: this.DumpKey,
    });
  }
  ChooseDump(data) {
    // Make sure we are waiting for a dump
    if (this.DumpKey == false ||
      this.DumpChosen == true ||
      this.DumpKey != data.DumpKey) {
      return;
    }
    // We have chosen a client to dump to us
    this.DumpChosen = true;
    // Send the confermation
    api.send({
      Method: "DumpChosen",
      DumpKey: this.DumpKey,
      ClientId: data["ClientId"],
    });
  }
  DumpRecv(data) {
    // Make sure we are waiting for a dump
    if (this.DumpKey != data.DumpKey &&
      this.DumpChosen != true) {
      return;
    }
    // Add the received object to the game as if it was updated
    this.game.Update(data);
  }
}
