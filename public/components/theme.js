Vue.component('theme', {
  data: function () {
      return {
        title: 'Meme Generator',
      }
    },
  template:
  `  <v-app id="inspire">

    <v-app-bar app
    color="#3F4045"
    >

    <v-toolbar-title>
      <span style="color:#fbfbfb; font-family: 'Pacifico'; font-size: 30px">{{ title }}</span>
    </v-toolbar-title>

    </v-app-bar>

  <v-main>
      <slot></slot>
  </v-main>
  </v-app>
  `
})
