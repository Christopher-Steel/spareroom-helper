function convert_pw_to_pcm() {
  var filter = /£\d+\s*<abbr title="per week">pw<\/abbr>/g
  $("ul.key_features").each(function () {
    var content = $(this).html();
    var results = content.match(filter);
    var seen = [];
    if (results != null) {
      for (entry of results) {
        var value = parseInt(entry.match(/£(\d+)/)[1]);
        if (jQuery.inArray(value, seen) == -1) {
          seen.push(value);
          var newEntry = "[£" + +(value / (12 / 365.25 * 7)).toFixed(0) + " pcm] " + entry;
          content = content.replace(new RegExp(entry, "g"), newEntry);
        }
      };
    }
    $(this).html(content);
  });
}

function grab_address() {
  $("script:not([src])").each(function () {
    var content = $(this).html();
    var results = content.match(/SR\.listing\.detail\.init\(\{\s*coords:\s*\{\s*lat:\s*'(-?\d+\.\d+)',\s*lon:\s*'(-?\d+\.\d+)'\s*\}\s*\}\);/)
    if (results != null) {
      console.log("LAT " + results[1] + " / LON " + results[2]);
      var host = "https://www.google.com/maps/dir/";
      var immerseaddress = "9,+Rosebery+House,+Immerse+Learning,+Rosebery+Avenue,+London,+UK"
      var url = host + results[1] + "," + results[2] + "/" + immerseaddress;
      $("#map").after('<a href="' + url + '" target="_blank">Go to GMaps</a>');
      return false;
    }
  });
}

convert_pw_to_pcm();
grab_address();
