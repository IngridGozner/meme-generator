Vue.component('memegenerator', {
  data: function () {
    return {
      url: null,
      image: null,
      canvas: null,
      context: null,

      topText: null,
      bottomText: null,
      topSize: 20,
      bottomSize: 20,

      topColor: '#000000FF',
		  topMenu: false,
      bottomColor: '#000000FF',
      bottomMenu: false,

      fonts: ["Arial", "Comic Sans", "Pacifico"],
      topFont: "Arial",
      bottomFont: "Arial",
    }
  },

  mounted() {
    this.canvas = document.getElementById("memeCanvas");
    this.context = this.canvas.getContext('2d');
  },

  computed: {
  topSwatchStyle() {
    const { topColor, topMenu } = this
    return {
      backgroundColor: topColor,
      cursor: 'pointer',
      height: '30px',
      width: '30px',
      borderRadius: topMenu ? '50%' : '4px',
      }
    },
    bottomSwatchStyle() {
      const { bottomColor, bottomMenu } = this
      return {
        backgroundColor: bottomColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: bottomMenu ? '50%' : '4px',
        }
      }
  },
  methods: {
    uploadImage() {
      this.url= URL.createObjectURL(this.image);
      let type = this.image.type;

      if(type === "image/gif"){
        gifler(this.url).animate(this.canvas)
      }
      else{
        let img = new Image;

        // on image load update Canvas Image
        img.onload = () => {
          //Clear Old Image and Reset Bounds
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.canvas.height = img.height;
          this.canvas.width = img.width;

          // Redraw Image
          this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
        img.src = this.url;
      }
    },
  },

  template:
  `
  <v-container fluid>
     <v-row>
      <v-col cols="12" md="7">

      <v-card id="meme" height="canvas.height" color="rgba(0, 0, 0, 0)" elevation="0">
         <canvas id="memeCanvas" class="fullwidth"></canvas>

         <v-container style="position:absolute;top:15px">
              <v-row align="center" justify="center">
                <div v-bind:style="{ fontSize: topSize + 'px', color: topColor, fontFamily: topFont }">{{ topText }}</div>
              </v-row>
            </v-container>

            <v-container style="position:absolute; bottom:15px">
              <v-row align="center" justify="center">
                <div v-bind:style="{ fontSize: bottomSize + 'px', color: bottomColor, fontFamily: bottomFont }">{{ bottomText }}</div>
              </v-row>
            </v-container>
        </v-card>

      </v-col>
      <v-col cols="12" md="5">
        <v-card elevation="2" color="rgba(255, 255, 255, 0.8)">
        <v-card-text>
         <v-file-input
            label="Upload Image"
            accept="image/*"
            @change="uploadImage"
            v-model="image"
            outlined
            filled
            rounded
          ></v-file-input>

          <v-divider></v-divider>

          <v-text-field
           label="Top Text"
           v-model="topText"
           outlined
           filled
           rounded
          ></v-text-field>

          <v-row>
          <v-col cols="12" md="3">
          <v-text-field
            label="Font Size"
            v-model="topSize"
            suffix="px"
            type="number"
            outlined
            filled
            rounded
          ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
          <v-text-field v-model="topColor" label="Text Color" outlined  filled rounded>
  					<template v-slot:append>
  						<v-menu v-model="topMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
  							<template v-slot:activator="{ on }">
  								<div :style="topSwatchStyle" v-on="on" />
  							</template>
  							<v-card>
  								<v-card-text class="pa-0">
  									<v-color-picker v-model="topColor" flat />
  								</v-card-text>
  							</v-card>
  						</v-menu>
  					</template>
  				</v-text-field>
          </v-col>

          <v-col cols="12" md="5">
          <v-select
            :items="fonts"
            label="Text Font"
            v-model="topFont"
            outlined
            filled
            rounded
          ></v-select>
          </v-col></v-row>

          <v-divider></v-divider>

          <v-text-field
           label="Bottom Text"
           v-model="bottomText"
           outlined
           filled
           rounded></v-text-field>

          <v-row>
          <v-col cols="12" md="3">
          <v-text-field
            label="Font Size"
            v-model="bottomSize"
            suffix="px"
            type="number"
            outlined
            filled
            rounded
          ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
          <v-text-field v-model="bottomColor" label="Text Color" outlined  filled rounded>
            <template v-slot:append>
              <v-menu v-model="bottomMenu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
                <template v-slot:activator="{ on }">
                  <div :style="bottomSwatchStyle" v-on="on" />
                </template>
                <v-card>
                  <v-card-text class="pa-0">
                    <v-color-picker v-model="bottomColor" flat />
                  </v-card-text>
                </v-card>
              </v-menu>
            </template>
          </v-text-field>
          </v-col>

          <v-col cols="12" md="5">
          <v-select
            :items="fonts"
            label="Text Font"
            v-model="bottomFont"
            outlined
            filled
            rounded
          ></v-select>
          </v-col></v-row>

          </v-card-text>
          <v-card-actions><slot></slot></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  `
})
