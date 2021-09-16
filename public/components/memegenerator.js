Vue.component('memegenerator', {
  data: function () {
    return {
      url: null,
      image: null,
      top_text: null,
      bottom_text: null,
    }
  },
  methods: {
    Preview_image() {
      this.url= URL.createObjectURL(this.image)
    }
  },
  template:
  `
  <v-container fluid>
     <v-row>
      <v-col cols="12" md="7">
         <v-card elevation="2">
          <v-img :src="url" :lazy-src="url">

            <v-container style="position:absolute;top:0px">
              <v-row align="center" justify="space-around">
                <div class="white--text mx-2">{{ top_text }}</div>
              </v-row>
            </v-container>

            <v-container style="position:absolute;bottom:0px">
              <v-row align="center" justify="space-around">
                <div class="white--text mx-2">{{ bottom_text }}</div>
              </v-row>
            </v-container>

          </v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
         <v-file-input
            label="Image"
            accept="image/*"
            @change="Preview_image"
            v-model="image"
            outlined
          ></v-file-input>

          <v-text-field
           label="Top Text"
           v-model="top_text"
           outlined
          ></v-text-field>

          <v-text-field
           label="Bottom Text"
           v-model="bottom_text"
           outlined
          ></v-text-field>
      </v-col>

    </v-row>
  </v-container>
  `
})
