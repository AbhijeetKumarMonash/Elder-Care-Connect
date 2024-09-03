<template>
  <div>
    <BHeader />
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-12">
          <div id="homeCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#homeCarousel"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="../images/websitemain.jpg" class="d-block w-100" alt="First slide" />
              </div>
              <div class="carousel-item">
                <img src="../images/Elder2.jpg" class="d-block w-100" alt="Second slide" />
              </div>
              <div class="carousel-item">
                <img src="../images/Elder3.jpg" class="d-block w-100" alt="Third slide" />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#homeCarousel"
              data-bs-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col text-center about-us-section">
          <h2>About Us</h2>
          <h3>Our Mission</h3>
          <p>
            At Elder Care Connect, our mission is to enhance the well-being and quality of life for
            the elderly population by providing accessible healthcare resources, fostering social
            connections, and promoting mental and physical wellness.
          </p>
          <h3>Who We Are</h3>
          <p>
            Founded in 2023, we are a dedicated health charity that offers a variety of services
            aimed at supporting seniors in their journey toward healthier, more fulfilling lives.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BHeader from '@/components/BHeader.vue'

export default {
  name: 'HomeView',
  components: {
    BHeader
  }
}
</script>

<style scoped>
.carousel-item img {
  height: 100%;
  object-fit: cover;
}
.about-us-section {
  background-color: #007bff;
  color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.about-us-section h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.about-us-section h3 {
  font-size: 1.75rem;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 600;
}

.about-us-section p {
  font-size: 1.2rem;
  margin-bottom: 15px;
  line-height: 1.6;
}
</style>
