<template>
  <div class="w3-container">
    <ul class="w3-ul w3-card-4">
      <li
        class="w3-bar"
        v-for="(value, propertyName) in users.result"
        v-bind:key="value"
      >
        <img
          v-for="picture in pictures"
          v-bind:key="picture.pic"
          src="{{picture.pic}}"
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
          src="img_avatar5.png"
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
      pictures: [
        { pic: 'https://picsum.photos/100' },
        { pic: 'https://picsum.photos/100' },
        { pic: 'https://picsum.photos/100' },
        { pic: 'https://picsum.photos/100' },
        { pic: 'https://picsum.photos/100' },
        { pic: 'https://picsum.photos/100' },
      ],
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
