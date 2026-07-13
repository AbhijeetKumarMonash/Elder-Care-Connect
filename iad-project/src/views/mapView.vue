<template>
  <div class="map-page">
    <section class="map-hero">
      <span class="eyebrow">Getting there</span>
      <h1>Map &amp; directions</h1>
      <p class="lede">Find services and plan routes with turn-by-turn directions.</p>
    </section>

    <section class="map-card">
      <div class="navigation-inputs">
        <div class="input-wrap">
          <label for="from">From</label>
          <input id="from" v-model="startLocation" placeholder="Enter starting location" />
        </div>
        <div class="input-wrap">
          <label for="to">To</label>
          <input id="to" v-model="destinationLocation" placeholder="Enter destination" />
        </div>
        <button class="btn-primary" @click="getRoute">Get route</button>
      </div>

      <div id="map" class="map-container"></div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-sdk/services/geocoding'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js'

export default {
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
      mapboxgl.accessToken =
        'pk.eyJ1IjoiYWJoaWplZXQwMGk3IiwiYSI6ImNtMmJhdjRvOTAzZ2MybW9meWR4bGJqb3QifQ.KySwta8EFws6MPjMDjTk-Q'

      map.value = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
      })

      map.value.addControl(new mapboxgl.NavigationControl())

      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      })

      map.value.addControl(directions, 'top-left')
    })

    const getRoute = async () => {
      const startCoords = await geocoder
        .forwardGeocode({ query: startLocation.value, limit: 1 })
        .send()

      const destinationCoords = await geocoder
        .forwardGeocode({ query: destinationLocation.value, limit: 1 })
        .send()

      if (startCoords.body.features.length && destinationCoords.body.features.length) {
        const start = startCoords.body.features[0].geometry.coordinates
        const destination = destinationCoords.body.features[0].geometry.coordinates

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
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Source+Sans+3:wght@400;500;600;700&display=swap');

.map-page {
  --teal: #0f4c5c;
  --teal-deep: #0a3744;
  --coral: #e76f51;
  --sand: #fbf7f1;
  --line: #ece3d6;
  --muted: #5d6b73;
  --ink: #22333b;

  font-family: 'Source Sans 3', system-ui, sans-serif;
  color: var(--ink);
  background: var(--sand);
  margin: -1rem auto 0;
  padding: clamp(5rem, 9vw, 7rem) clamp(1.25rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
  max-width: 1280px;
}

.map-hero {
  text-align: center;
  margin-bottom: 2rem;
}
.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
  color: var(--coral);
}
.map-hero h1 {
  font-family: 'Fraunces', Georgia, serif;
  font-weight: 600;
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  color: var(--teal-deep);
  margin: 0.5rem 0 0.6rem;
}
.lede {
  color: var(--muted);
  font-size: 1.1rem;
  margin: 0;
}

.map-card {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 24px 60px -34px rgba(15, 76, 92, 0.4);
}

.navigation-inputs {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0.75rem;
  align-items: end;
  margin-bottom: 1.25rem;
}
.input-wrap label {
  display: block;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.input-wrap input {
  width: 100%;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  padding: 0.65rem 0.9rem;
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--ink);
  background: #fffdf9;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}
.input-wrap input:focus {
  outline: none;
  border-color: var(--teal);
  box-shadow: 0 0 0 3px rgba(15, 76, 92, 0.12);
}

.btn-primary {
  background: var(--coral);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0.65rem 1.4rem;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
}

.map-container {
  height: 520px;
  width: 100%;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid var(--line);
}

@media (max-width: 720px) {
  .navigation-inputs {
    grid-template-columns: 1fr;
  }
  .btn-primary {
    width: 100%;
    padding: 0.8rem;
  }
  .map-container {
    height: 420px;
  }
}
</style>
