//javascript.js
//set map options
var myLatLng = { lat: 48.3460, lng: 2.4907 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);


//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

// Function to add destination to a list
function addTo() {
    var destinationInput = document.getElementById("to");
    var destination = destinationInput.value.trim();

    if (destination !== "") {
        // Ajouter la destination à la liste HTML
        addDestinationToList(destination);

        // Vider le champ de saisie
        destinationInput.value = "";
    }
    event.preventDefault();
    destinationInput.value = "";
}
//Numeroter la list
var counter = 0;

function addDestinationToList(destination) {
    var list = document.getElementById("list");
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(++counter + ". " + destination));
    list.appendChild(listItem);
}

//marker
let marker = new google.maps.Marker({
    map: map
});

//autocomplete for all inputs
var options = {}
var input2 = document.getElementById("to");
var autocomplete = new google.maps.places.Autocomplete(input2, options);

function addTo() {
    var destinationInput = document.getElementById("to");
    var destination = destinationInput.value.trim();

    if (destination !== "") {
        // Ajouter la destination à la liste HTML
        addDestinationToList(destination);

        // Ajouter le nouveau marqueur sur la carte
        addMarkerForDestination(destination);

        // Vider le champ de saisie
        destinationInput.value = "";
    }
    event.preventDefault();
}

// Marker addition function
function addMarkerForDestination(destination) {
    // Utiliser l'autocomplétion pour obtenir les informations de place
    var placeService = new google.maps.places.PlacesService(map);
    placeService.textSearch({ query: destination }, function (results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK && results[0].geometry) {
            // Créer un nouveau marqueur
            var newMarker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location,
                title: destination
            });

            // Centrer la carte sur le nouveau marqueur
            map.setCenter(newMarker.getPosition());
            map.setZoom(17);
        } else {
            window.alert('Erreur lors de la récupération des informations de destination.');
        }
    });
}
