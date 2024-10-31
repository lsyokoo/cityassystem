const map = L.map('map').setView([40.7128, -74.0060], 11); // NYC

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// api,pin
fetch('https://data.cityofnewyork.us/resource/8ev8-jjxq.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(zone => {
      if (zone.the_geom && zone.the_geom.coordinates) {
       
        const center = zone.the_geom.coordinates[0][0][0]; 
        const latLng = [center[1], center[0]]; 


        L.marker(latLng)
          .addTo(map)
          .bindPopup(`<b>Zone:</b> ${zone.zone_name || 'N/A'}`);
      }
    });
  })
  .catch(error => console.error('Error fetching data:', error));







