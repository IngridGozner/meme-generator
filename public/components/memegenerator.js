Vue.component('memegenerator', {
  data: function () {
    return {
      url: null,
      image: null,
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
          <v-img :src="url" :lazy-src="url"></v-img>
        </v-card>
      </v-col>
      <v-col cols="12" md="5">
         <v-file-input
            accept="image/*"
            @change="Preview_image"
            v-model="image"
          ></v-file-input>
      </v-col>
    </v-row>
  </v-container>
  `
})
