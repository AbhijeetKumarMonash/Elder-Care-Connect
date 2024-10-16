<template>
  <div class="map-page">
    <header><BHeader /></header>
    <div class="navigation-inputs">
      <input v-model="startLocation" placeholder="Enter starting location" />
      <input v-model="destinationLocation" placeholder="Enter destination" />
      <button @click="getRoute">Get Route</button>
    </div>

    <div id="map" class="map-container"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js'
import BHeader from '@/components/BHeader.vue'

export default {
  components: {
    BHeader
  },
  name: 'MapView',
  setup() {
    const map = ref(null)
    const startLocation = ref('')
    const destinationLocation = ref('')
    const geocoder = MapboxGeocoder({
      accessToken:
        'pk.eyJ1IjoiYWJoaWplZXQwMGk3IiwiYSI6ImNtMmJhdjRvOTAzZ2MybW9meWR4bGJqb3QifQ.KySwta8EFws6MPjMDjTk-Q'
    })

    onMounted(() => {
      // Set the Mapbox GL access token globally
      mapboxgl.accessToken =
        'pk.eyJ1IjoiYWJoaWplZXQwMGk3IiwiYSI6ImNtMmJhdjRvOTAzZ2MybW9meWR4bGJqb3QifQ.KySwta8EFws6MPjMDjTk-Q'

      // Initialize the map
      map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
      })

      // Add navigation controls (zoom in/out)
      map.value.addControl(new mapboxgl.NavigationControl())

      // Add directions control
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      })

      // Add directions to the map
      map.value.addControl(directions, 'top-left')
    })

    const getRoute = async () => {
      // Use the geocoding service to get coordinates for the start and destination locations
      const startCoords = await geocoder
        .forwardGeocode({ query: startLocation.value, limit: 1 })
        .send()

      const destinationCoords = await geocoder
        .forwardGeocode({ query: destinationLocation.value, limit: 1 })
        .send()

      // Check if valid results are returned
      if (startCoords.body.features.length && destinationCoords.body.features.length) {
        const start = startCoords.body.features[0].geometry.coordinates
        const destination = destinationCoords.body.features[0].geometry.coordinates

        // Add directions to the map
        map.value.getSource('route').setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [start, destination]
              }
            }
          ]
        })
      }
    }

    return {
      startLocation,
      destinationLocation,
      getRoute
    }
  }
}
</script>

<style scoped>
/* Styling for the map container and input fields */
.map-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.map-container {
  height: 500px;
  width: 100%;
  margin-top: 10px;
}

.navigation-inputs {
  display: flex;
  justify-content: center;
  margin: 10px 0;
}

input {
  width: 250px;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
