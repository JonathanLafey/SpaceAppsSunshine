window.addEventListener('load', initApp, false);

let mapCoordinates;
function initApp (): void {

}

function initMap(): void {
     const initialPos = {lat: -25.363, lng: 131.044};
     const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: initialPos
        });
        const marker = new google.maps.Marker({
          position: initialPos,
          map: map,
          draggable: true
        });
        

marker.addListener('position_changed', (pos) => {
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
})

}