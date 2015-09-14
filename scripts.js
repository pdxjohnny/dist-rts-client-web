window.unit_types = {};
window.have_scripts = 0;
window.units_loaded = false;
window.on_units_loaded = [];

function unit_loaded() {
  have_scripts++;
  if (have_scripts >= scripts.length) {
    window.units_loaded = true;
    for (var i = 0; i < window.on_units_loaded.length; i++) {
      window.on_units_loaded[i]();
    }
    console.log("All units loaded");
  }
}

function load_scripts(argument) {
  var unit_scripts_div = document.getElementById("unit_scripts");
  for (var i = 0; i < scripts.length; i++) {
    var script_el = document.createElement("script");
    script_el.type = "text/javascript";
    script_el.src = window.load_url + scripts[i];
    unit_scripts_div.appendChild(script_el);
  }
}
