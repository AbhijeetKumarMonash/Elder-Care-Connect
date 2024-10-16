<template>
  <footer class="footer">
    <div class="footer-content">
      <p>© 2024 Elder Care Connect. All rights reserved.</p>
      <ul>
        <li><router-link to="/privacy">Privacy Policy</router-link></li>
        <li><router-link to="/terms">Terms & Conditions</router-link></li>
        <li><router-link to="/contact">Contact Us</router-link></li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  margin: 0;
}

.footer-content ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 15px;
}

.footer-content ul li {
  display: inline;
}

.footer-content a {
  color: white;
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
}
</style>
