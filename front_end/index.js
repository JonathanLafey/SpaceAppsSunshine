window.addEventListener('load', initApp, false);
var SETUP_TYPE;
(function (SETUP_TYPE) {
    SETUP_TYPE[SETUP_TYPE["MONO"] = 1] = "MONO";
    SETUP_TYPE[SETUP_TYPE["POLY"] = 2] = "POLY";
})(SETUP_TYPE || (SETUP_TYPE = {}));
var mapCoordinates;
var graph;
function initApp() {
    initializeListeners();
}
function initializeListeners() {
    var estimate = document.getElementById("estimate");
    estimate.onclick = function () {
        var data = getUserData();
        var r = new XMLHttpRequest();
        r.open("POST", "http://ec2-52-87-237-84.compute-1.amazonaws.com:90/prediction", true);
        r.onreadystatechange = function (res) {
            if (r.readyState !== XMLHttpRequest.DONE || r.status != 200) {
                console.error('ERROR!!', res);
                return;
            }
            ;
            var response = r.responseText;
            var formatedResponse = JSON.parse(response);
            alert("Success: " + formatedResponse);
            var estimatesRes = formatedResponse.estimates;
            drawData(estimatesRes);
            updateView(estimatesRes);
        };
        r.send(JSON.stringify(data));
        //let mockData =  [
        //        {
        //            timestamp: 1493517042,
        //            estimate: 3.45
        //        },
        //        {
        //            timestamp: 1493632242,
        //            estimate: 3.17
        //        },
        //        {
        //            timestamp: 1493718642,
        //            estimate: 4.02
        //        },
        //        {
        //            timestamp: 1493718642,
        //            estimate: 3.58
        //        },
        //        {
        //            timestamp: 1493718642,
        //            estimate: 3.97
        //        },
        //        {
        //            timestamp: 1493718642,
        //            estimate: 3.36
        //        },
        //        {
        //            timestamp: 1493718642,
        //            estimate: 3.48
        //        }
        //        ];
        //drawData(mockData);
        //updateView(mockData);
    };
    var sendFeedback = document.getElementById("estimate-help");
    sendFeedback.onclick = function () {
        var feedbackSection = document.getElementById("help-feedback");
        feedbackSection.style.display = 'block';
    };
}
function updateView(estimates) {
    var calculationRes = document.getElementById("after-data");
    calculationRes.style.display = 'block';
    var calculationText = document.getElementById("calculated-energy");
    var today = new Date();
    calculationText.innerText = "The approximate maximum of energy that will be produced on: " + today.getDate() + "/" + today.getMonth() + " is " + estimates[0].estimate + " Kwh";
}
function drawData(estimates) {
    var graphicsViewContainer = document.getElementById("graphics-view");
    graphicsViewContainer.innerHTML = '';
    var graphDom = createDom(estimates);
    graphicsViewContainer.appendChild(graphDom);
}
function createDom(estimates) {
    var listParent = document.createElement("ul");
    listParent.setAttribute("class", "graph");
    var maxEstimation = getMaxLength(estimates);
    for (var i = 0; i < estimates.length; i++) {
        var dateInfo = new Date(estimates[i].timestamp * 1000);
        var estimateVal = estimates[i].estimate;
        var estimateItemContainer = document.createElement("li");
        estimateItemContainer.setAttribute("class", "graph_item-container");
        var itemLabel = document.createElement("p");
        itemLabel.innerText = "Estimated energy produced on " + (dateInfo.getDay() + 1) + "/" + (dateInfo.getMonth() + 1) + ": " + estimateVal + "Kwh";
        estimateItemContainer.appendChild(itemLabel);
        var estimateItem = document.createElement("div");
        estimateItem.setAttribute("class", "graph_item-container__item");
        var widthInPercent = Math.floor(estimateVal / maxEstimation * 100);
        var widthVal = widthInPercent + "%";
        estimateItem.style.width = widthVal;
        estimateItemContainer.appendChild(estimateItem);
        listParent.appendChild(estimateItemContainer);
    }
    return listParent;
}
function getMaxLength(estimates) {
    return estimates.reduce(function (prev, curr) {
        if (curr.estimate > prev) {
            return curr.estimate;
        }
        else {
            return prev;
        }
    }, 0);
}
function getUserData() {
    var _a = mapCoordinates || { lat: 0, lng: 0 }, lat = _a.lat, lng = _a.lng;
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