/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoicmRhYnJvd3NreSIsImEiOiJjbHl1YTAzZHgwN216MmlzYm1wZnNwdmM5In0.ObXnuvyuB9xewxMAs5kIfg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/rdabrowsky/clyuafjez003m01pcfyccf64w',
  center: [-74.5, 40],
  zoom: 9,
  scrollZoom: false,
  zoomControl: true,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((location) => {
  // Create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(location.coordinates)
    .addTo(map);

  // Add popup

  new mapboxgl.Popup({ offset: 30 })
    .setLngLat(location.coordinates)
    .setHTML(`<p>Day ${location.day}: ${location.description}</p>`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(location.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    left: 100,
    right: 100,
    top: 150,
    bottom: 200,
  },
});
