window.addEventListener('load', initApp, false);
var mapCoordinates;
function initApp() {
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
    marker.addListener('position_changed', function (pos) {
        var lat = marker.getPosition().lat();
        var lng = marker.getPosition().lng();
    });
}
//# sourceMappingURL=index.js.map