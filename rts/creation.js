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
  create_tree(object, tree) {
    // Go through an array creating the next level in an object each time
    if (tree.length < 1) {
      return;
    }
    // Make sure the object has a items array and next level
    if (!object.hasOwnProperty("next")) {
      object = {
        next: {},
        items: []
      };
    }
    // Create the next level of the tree
    if (!object.next.hasOwnProperty(tree[0])) {
      object.next[tree[0]] = {
        next: {},
        items: []
      };
    }
    // Go down a level
    this.create_tree(object.next[tree[0]], tree.slice(1));
    return object;
  }
  end_tree(object, tree) {
    // Go through an object going down by the first element of the array
    // each time
    if (tree.length < 1 ||
      !object.hasOwnProperty("next") ||
      !object.next.hasOwnProperty(tree[0])) {
      return object.items;
    }
    // Go to the next level
    return this.end_tree(object.next[tree[0]], tree.slice(1));
  }
  can_create(object) {
    var constructors = [];
    var uniqe_constructors = {};
    // Split on underscore and anything that matches any element
    // will be made a creator
    var creator_type = object.constructor.name.split("_");
    // Create the tree in case it doesnt exist
    this.creators = this.create_tree(this.creators, creator_type);
    // So loop doesnt exit early after pops
    var creator_type_length = creator_type.length;
    for (var i = 0; i < creator_type_length; i++) {
      // Get the most specific list for this creator type
      var constructor_list = this.end_tree(this.creators, creator_type);
      // Only add to constructors if not seen
      for (var i = 0; i < constructor_list.length; i++) {
        // Will be added if not already in uniqe_constructors
        if (!uniqe_constructors.hasOwnProperty(constructor_list[i].name)) {
          uniqe_constructors[constructor_list[i].name] = true;
          constructors.push(constructor_list[i]);
        }
      }
      // Pop off the furthest down type
      creator_type.pop();
    }
    return constructors;
  }
  creator(constructor, creator_type) {
    // Split on underscore and anything that matches any element
    // will be made a creator
    creator_type = creator_type.split("_");
    // Create the tree
    this.creators = this.create_tree(this.creators, creator_type);
    // So loop doesnt exit early after pops
    var creator_type_length = creator_type.length;
    for (var i = 0; i < creator_type_length; i++) {
      // Add the constructor
      this.add_constructor(creator_type, constructor);
      // Pop off the furthest down type
      creator_type.pop();
    }
  }
  creator_single(constructor, creator_name) {
    // Split on underscore to make tree to creator
    creator_type = creator_type.split("_");
    // Create the tree
    this.creators = this.create_tree(this.creators, creator_type);
    // Add the constructor
    this.add_constructor(creator_type, constructor);
  }
  add_constructor(creator_type, constructor) {
    // Get the most specific list for this creator type
    var creator_list = this.end_tree(this.creators, creator_type);
    // Push the constructor of the array of classes the creator can create
    creator_list.push(constructor);
  }
}
window.creation = new Creation();
