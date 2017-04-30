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

let mapCoordinates:ILocation;
let graph;

interface FormDataToSend {
    location: ILocation;
    setup: ISetup;
}

interface Estimate {
    timestamp: number,
    estimate: number
}
interface ExpectedData {
    estimates: Estimate []
}

function initApp():void {
    initializeListeners();
}

function initializeListeners():void {
    const estimate = document.getElementById("estimate");
    estimate.onclick = () => {
        const data:FormDataToSend = getUserData();
        var r = new XMLHttpRequest();
        r.open("POST", "http://ec2-52-87-237-84.compute-1.amazonaws.com:90/prediction", true);
        r.onreadystatechange = function (res) {
            if (r.readyState !== XMLHttpRequest.DONE || r.status != 200) {
                console.error('ERROR!!', res);
                return;
            }
            ;
            const response = r.responseText;
            const formatedResponse: Estimate [] = JSON.parse(response);
            alert("Success: " + formatedResponse);
            const estimatesRes = formatedResponse;
            drawData(estimatesRes);
            updateView(estimatesRes);
        };
        r.send(JSON.stringify(data));
        //let mockData =  [
        //        {
        //            timestamp: 1493560242,
        //            estimate: 3.45
        //        },
        //        {
        //            timestamp: 1493646642,
        //            estimate: 3.17
        //        },
        //        {
        //            timestamp: 1493733042,
        //            estimate: 4.02
        //        },
        //        {
        //            timestamp: 1493819442,
        //            estimate: 3.58
        //        },
        //        {
        //            timestamp: 1493905842,
        //            estimate: 3.97
        //        },
        //        {
        //            timestamp: 1493992242,
        //            estimate: 3.36
        //        },
        //        {
        //            timestamp: 1494078642,
        //            estimate: 3.48
        //        }
        //        ];
        //drawData(mockData);
        //updateView(mockData);
    };

    const sendFeedback = document.getElementById("estimate-help");
    sendFeedback.onclick = () => {
        const feedbackSection = document.getElementById("help-feedback");
        feedbackSection.style.display = 'block';
    }
}

function updateView(estimates: Estimate []): void {
    const calculationRes = document.getElementById("after-data");
    calculationRes.style.display = 'block';

    const calculationText = document.getElementById("calculated-energy");
    const today = new Date();
    calculationText.innerText = `The approximate maximum of energy that will be produced today is ${estimates[0].estimate} Kwh`;
}

function drawData(estimates:Estimate []) {
    const graphicsViewContainer = document.getElementById("graphics-view");
    graphicsViewContainer.innerHTML = '';

    const graphDom = createDom(estimates);
    graphicsViewContainer.appendChild(graphDom);
}

function createDom(estimates:Estimate []): HTMLElement {
    const listParent = document.createElement("ul");
    listParent.setAttribute("class", "graph");
    const maxEstimation = getMaxLength(estimates);
    for (let i=0; i< estimates.length; i++) {
        let dateInfo = new Date(estimates[i].timestamp*1000);
        const estimateVal = estimates[i].estimate;
        const estimateItemContainer = document.createElement("li");
        estimateItemContainer.setAttribute("class", "graph_item-container");

        const itemLabel = document.createElement("p");
        itemLabel.innerText = `Estimated energy produced on ${dateInfo.getDate()}/${dateInfo.getMonth()+1}: ${estimateVal}Kwh`;
        estimateItemContainer.appendChild(itemLabel);

        const estimateItem = document.createElement("div");
        estimateItem.setAttribute("class", "graph_item-container__item");
        const widthInPercent = Math.floor(estimateVal / maxEstimation * 100);
        const widthVal = widthInPercent + "%";
        (<any> estimateItem).style.width = widthVal;

        estimateItemContainer.appendChild(estimateItem);
        listParent.appendChild(estimateItemContainer);
    }
    return listParent;
}

function getMaxLength(estimates:Estimate []): number {
    return estimates.reduce((prev, curr) => {
        if (curr.estimate > prev) {
            return curr.estimate
        } else {
            return prev;
        }
    }, 0)
}

function getUserData():FormDataToSend {
    const {lat, lng} = mapCoordinates || {lat: 0, lng: 0};
    const locationData:ILocation = {lat, lng};
    const setupData:ISetup = getSetupData();
    const formData = {
        location: locationData,
        setup: setupData
    };
    return formData
}

function getSetupData():ISetup {
    const typeInput = document.getElementById("setup-type");
    const areaInput = document.getElementById("setup-area");
    return {
        type: Number((<HTMLInputElement> typeInput).value),
        area: Number((<HTMLInputElement> areaInput).value)
    }
}

function initMap():void {
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