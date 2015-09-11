"use strict";

class Creation {
  constructor() {
    // Creators are classes which units have said can create them
    // For example fighter_basic says that structure_base can create it
    // therefor structure_base is now a creator
    // structure_base can also go create other types because all units should
    // be registered in window.unit_types but Creation allows structure_base
    // to create units that the programer of structure_base has no idea exist
    // This happens by calling can_create which gives an array of constructors
    // for units that have said the creator can create them.
    // For example when fighter_basic said structure_base could create it
    // structure_base will now have fighter_basic in the array returned to it
    // by can_create
    this.creators = {};
  }
  can_create(object) {
    // Get the name of the constructor
    var constructor_name = object.constructor.name;
    // If the constructors is a creator then return its
    // array of createable classes
    if (this.creators.hasOwnProperty(constructor_name)) {
      return this.creators[constructor_name];
    }
    // Otherwise it is as if there were none in its array
    return [];
  }
  creator(constructor, creator_name) {
    // If there is no array for the creator_name in creators make one
    if (!this.creators.hasOwnProperty(creator_name)) {
      this.creators[creator_name] = [];
    }
    // Push the constructor of the array of classes the creator can create
    this.creators[creator_name].push(constructor);
  }
}
window.creation = new Creation();
