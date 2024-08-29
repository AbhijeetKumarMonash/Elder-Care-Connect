<template>
  <div class="form">
    <h1>Sign up form</h1>
    <form>
      <label for="username">Username:</label><br />
      <input type="text" id="username" name="username" /><br />

      <label for="password">Password:</label><br />
      <input type="password" id="password" name="password" /><br />

      <label for="Age">Age:</label><br />
      <input type="number" id="Age" name="Age" /><br />

      <label for="Retired">Are you Retired?</label><br />
      <input type="checkbox" id="Retired" name="Retired" /><br />

      <label for="reason">Reason For Joining:</label><br />
      <textarea id="reason" name="reason" rows="3"></textarea><br />

      <label for="gender">Gender</label><br />
      <select id="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
    </form>
  </div>
</template>

<script setup></script>

<style scoped></style>
