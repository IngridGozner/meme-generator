Vue.component('memegenerator', {
  data: function () {
    return {
      url: null,
      image: null,
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
                <div v-bind:style="{ fontSize: topSize + 'px', color: topColor, fontFamily: topFont }">{{ topText }}</div>
              </v-row>
            </v-container>

            <v-container style="position:absolute;bottom:0px">
              <v-row align="center" justify="space-around">
                <div v-bind:style="{ fontSize: bottomSize + 'px', color: bottomColor, fontFamily: bottomFont }">{{ bottomText }}</div>
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
           v-model="topText"
           outlined
          ></v-text-field>

          <v-text-field
            label="Top Font Size"
            v-model="topSize"
            suffix="px"
            type="number"
            outlined
          ></v-text-field>

          <v-text-field v-model="topColor" label="Top Text Color" outlined>
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

          <v-select
            :items="fonts"
            label="Top Text Font"
            v-model="topFont"
            outlined
          ></v-select>

          <v-text-field
           label="Bottom Text"
           v-model="bottomText"
           outlined
          ></v-text-field>

          <v-text-field
            label="Bottom Font Size"
            v-model="bottomSize"
            suffix="px"
            type="number"
            outlined
          ></v-text-field>

          <v-text-field v-model="bottomColor" label="Bottom Text Color" outlined>
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

          <v-select
            :items="fonts"
            label="Bottom Text Font"
            v-model="bottomFont"
            outlined
          ></v-select>

      </v-col>
    </v-row>
  </v-container>
  `
})
