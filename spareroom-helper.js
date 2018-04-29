var immerseaddress = "EC1R%204RR";
var macintyreaddress = "N6%205TR";

function convert_pw_to_pcm() {
  var filter = /£(\d+)\s*<abbr title="per week">pw<\/abbr>/g;
  $("body").html($("body").html().replace(filter, function(match, pwAmount) {
    console.log(match, pwAmount);
    pmAmount = (pwAmount / (12 / 365.25 * 7)).toFixed(0);
    return "[£" + pmAmount + " pcm] " + match;
  }));
}

function replace_flimsy_map(dest, mode) {
  coord = get_coordinates();
  map = '<iframe width="500" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/directions?origin=';
  map += coord;
  map += '&destination=';
  map += dest;
  map += '&key=AIzaSyAxPJtq-T2GUAVd5Zcwho_oKYE5XWHZLeM';
  if (mode) {
    map += '&mode=' + mode;
  }
  map += '" allowfullscreen></iframe>';
  $("#map").before(map);
}

function get_coordinates() {
  var coord = null;
  $("script:not([src])").each(function () {
    var content = $(this).html();
    var results = content.match(/SR\.listing\.detail\.init\(\{\s*coords:\s*\{\s*lat:\s*'(-?\d+\.\d+)',\s*lon:\s*'(-?\d+\.\d+)'\s*\}\s*\}\);/);
    if (results != null) {
      coord = results[1] + "," + results[2];
    }
  });
  return coord;
}

function add_gmaps_link() {
  if ((coord = get_coordinates()) != null) {
    var host = "https://www.google.com/maps/dir/";
    var workplaceAddress = immerseaddress;
    var url = host + coord + "/" + workplaceAddress;
    $("#map").after('<a href="' + url + '" target="_blank">Go to GMaps</a>');
    return false;
  }
}

replace_flimsy_map(immerseaddress, "transit");
replace_flimsy_map(macintyreaddress, "transit");
console.log("replaced map");
add_gmaps_link();
console.log("added gmaps link");
convert_pw_to_pcm();
console.log("converted to pcm");
