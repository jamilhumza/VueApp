<template>
  <div class="w3-container">
    <ul class="w3-ul w3-card-4">
      <li
        class="w3-bar"
        v-for="(value, propertyName) in users.result"
        v-bind:key="value"
      >
        <img
          src="https://picsum.photos/50"
          class="w3-bar-item w3-circle w3-hide-small"
          style="width:85px"
        />
        <div class="w3-bar-item">
          <span class="w3-large">{{ value }}</span
          ><br />
          <span>{{ propertyName }}</span>
        </div>
      </li>

      <li
        style="backgroundColor:yellow"
        class="w3-bar"
        v-for="(value, propertyName) in users.high"
        v-bind:key="value"
      >
        <img
          src="https://picsum.photos/50"
          class="w3-bar-item w3-circle w3-hide-small"
          style="width:85px"
        />
        <div class="w3-bar-item">
          <span class="w3-large">{{ value }}</span
          ><br />
          <span>{{ propertyName }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserPanel',
  data() {
    return {
      users: {},
    }
  },

  async created() {
    await this.fetchUsers()
    this.timer = await setInterval(this.fetchUsers, 1000)
  },
  methods: {
    async fetchUsers() {
      await fetch('http://localhost:3000/')
        .then((response) => response.json())
        .then((data) => {
          this.users = data
          console.log(data)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>
