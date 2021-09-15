Vue.component('theme', {
  data: function () {
      return {
        title: 'Meme Generator',
      }
    },
  template:
  `  <v-app id="inspire">

    <v-app-bar app
    clipped-left
    color="#3F4045"
    >

    <v-toolbar-title class="mr-12 align-center">
      <span style="color:#fbfbfb; font-family: 'Uncial Antiqua', cursive">{{ title }}</span>
    </v-toolbar-title>

    </v-app-bar>

  <v-main>
      <slot></slot>
  </v-main>
  </v-app>
  `
})
