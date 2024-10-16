<template>
  <div>
    <BHeader />
    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'

export default {
  name: 'MapView',
  setup() {
    onMounted(() => {
      // Mapbox access token
      mapboxgl.accessToken =
        'pk.eyJ1IjoiYWJoaWplZXQwMGk3IiwiYSI6ImNtMmJhdjRvOTAzZ2MybW9meWR4bGJqb3QifQ.KySwta8EFws6MPjMDjTk-Q'

      // Initialize the map
      const map = new mapboxgl.Map({
        container: 'map', // The ID of the HTML container for the map
        style: 'mapbox://styles/mapbox/streets-v11', // Map style to use
        center: [-74.5, 40], // Initial map center in [lng, lat]
        zoom: 9 // Initial map zoom level
      })

      // Add navigation controls to the map (zoom in/out)
      map.addControl(new mapboxgl.NavigationControl())

      // You can also add markers, popups, and other functionalities here
    })
  }
}
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
  margin-top: 20px;
}
</style>
