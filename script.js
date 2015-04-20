function initialize() {
  var directionsService = new google.maps.DirectionsService();
  var targetLocation = new google.maps.LatLng(50.083019, 14.409906);
  directionsDisplay = new google.maps.DirectionsRenderer();  
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var devicePosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      var mapOptions = {
        zoom: 14,
        center: devicePosition
      }
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      directionsDisplay.setMap(map);
      var request = {
        origin: devicePosition,
        destination: targetLocation,
        travelMode: google.maps.TravelMode.WALKING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    handleNoGeolocation(false);
  }
}
google.maps.event.addDomListener(window, 'load', initialize);
