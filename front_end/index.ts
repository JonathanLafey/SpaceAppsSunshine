window.addEventListener('load', initApp, false);

interface ILocation {
    lat: number;
    lng: number;
}

enum SETUP_TYPE {
    MONO = 1,
    POLY = 2
}

interface ISetup {
    type: SETUP_TYPE;
    area: number;
}

let mapCoordinates: ILocation;

interface FormDataToSend {
    location: ILocation;
    setup: ISetup;
}

function initApp (): void {
    initializeListeners();
}

function initializeListeners(): void {
    const estimate = document.getElementById("estimate");
    estimate.onclick = () => {
        const data: FormDataToSend = getUserData();
        console.info('Data to send:', data)
    };
}

function getUserData(): FormDataToSend {
    const {lat, lng} = mapCoordinates;
    const locationData: ILocation = {lat, lng};
    const setupData: ISetup = getSetupData();
    const formData = {
        location: locationData,
        setup: setupData
    };
    return formData
}

function getSetupData(): ISetup {
    const typeInput = document.getElementById("setup-type");
    const areaInput = document.getElementById("setup-area");
    return {
        type: Number((<HTMLInputElement> typeInput).value),
        area: Number((<HTMLInputElement> areaInput).value)
    }
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
    mapCoordinates = initialPos;

    marker.addListener('position_changed', (pos) => {
        mapCoordinates.lat = marker.getPosition().lat();
        mapCoordinates.lng = marker.getPosition().lng();
    })
}