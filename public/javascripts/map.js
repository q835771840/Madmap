function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14.5,
    center: new google.maps.LatLng(43.076592, -89.4124875),
    mapTypeId: 'roadmap'
  });

  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  var icons = {
    info: {
      icon: iconBase + 'info-i_maps.png'
    }
  };  

  let sValue = new URLSearchParams(document.location.search.substring(1)).get("sValue");
  let resultList = $("#resultList")
 $.ajax({
    url: 'http://localhost:8080/USWISCUWMAD',
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: function(data) {
      var buildings = data.foundBuildings
      buildings.forEach((building)=>{
        if(building.utilities.length!=0){
          building.utilities.forEach((utility)=>{
            console.log("??")
            if(utility.type === sValue){
              creatMark(building.lat,building.lng)
              resultList.append( '<li>'+ 
              '<img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/bascom-hall-todd-klassy.jpg" />'+
              '<h3>'+building.name+'</h3>'+
              '<p>'+utility.description+'</p>'+
              '</li>')
            }
          })
        }
      })
    },
    error: function() { alert('Failed!'); }
});

const creatMark = (lat,lng) =>{
  var marker = new google.maps.Marker({
              position: new google.maps.LatLng(lat, lng),
              icon: icons['info'].icon,
              map: map
            });
}
}
