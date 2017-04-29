window.addEventListener('load', initApp, false);
var SETUP_TYPE;
(function (SETUP_TYPE) {
    SETUP_TYPE[SETUP_TYPE["MONO"] = 1] = "MONO";
    SETUP_TYPE[SETUP_TYPE["POLY"] = 2] = "POLY";
})(SETUP_TYPE || (SETUP_TYPE = {}));
var mapCoordinates;
function initApp() {
    initializeListeners();
}
function initializeListeners() {
    var estimate = document.getElementById("estimate");
    estimate.onclick = function () {
        var data = getUserData();
        console.log('Data to send:', data);
    };
}
function getUserData() {
    var lat = mapCoordinates.lat, lng = mapCoordinates.lng;
    var locationData = { lat: lat, lng: lng };
    var setupData = getSetupData();
    var formData = {
        location: locationData,
        setup: setupData
    };
    return formData;
}
function getSetupData() {
    var typeInput = document.getElementById("setup-type");
    var areaInput = document.getElementById("setup-area");
    return {
        type: Number(typeInput.value),
        area: Number(areaInput.value)
    };
}
function initMap() {
    var initialPos = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: initialPos
    });
    var marker = new google.maps.Marker({
        position: initialPos,
        map: map,
        draggable: true
    });
    mapCoordinates = initialPos;
    marker.addListener('position_changed', function (pos) {
        mapCoordinates.lat = marker.getPosition().lat();
        mapCoordinates.lng = marker.getPosition().lng();
    });
}
//# sourceMappingURL=index.js.map