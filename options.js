function getWorkplace() {
  return localStorage["workplaceAddress"];
}

function loadWorkplace() {
  $("#address").val(getWorkplace());
}

function saveWorkplace() {
  alert($("#address").val());
  localStorage["workplaceAddress"] = $("#address").val();
}
