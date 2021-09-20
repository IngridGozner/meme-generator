Vue.component('memegenerator', {
  data: function () {
    return {
      url: null,
      image: null,
      canvas: null,
      context: null,

      canvasGif: null,
      contextGif: null,

      topText: null,
      bottomText: null,
      topSize: 70,
      bottomSize: 70,

      topColor: '#000000FF',
		  topMenu: false,
      bottomColor: '#000000FF',
      bottomMenu: false,

      fonts: ["Arial", "Comic Sans", "Pacifico"],
      topFont: "Arial",
      bottomFont: "Arial",

      gif: undefined,
      downloadType: 'JPG',
    }
  },

  mounted() {
    this.canvas = document.getElementById("memeCanvas");
    this.context = this.canvas.getContext('2d');

    this.canvasGif = document.getElementById("gifCanvas");
    this.contextGif = this.canvasGif.getContext('2d');

    //hide one of the 2 canvases at the start
    this.contextGif.canvas.hidden = true;
  },

  computed: {
    //color pickers for top and bottom text
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

        //check if it was a gif, to clear it
        if(this.gif != undefined){
          this.gif.pause();

          this.contextGif.clearRect(0, 0, this.canvasGif.width, this.canvasGif.height);
          this.gif = undefined;

          //delete canvas element- to be empty for the next gif
          let wrapper = document.getElementById('wrapper');
          let canvas = document.getElementById('gifCanvas');

          wrapper.removeChild(canvas);
        }

      //check the type of the uploaded image file
      if(type === "image/gif"){

        //check if the gif canvas exists or not
        if(document.getElementById('gifCanvas') === null){
          let wrapper = document.getElementById('wrapper');
          let canvas = document.createElement('canvas');
          canvas.id = 'gifCanvas';
          canvas.className = 'fullwidth';

          //add the gif canvas again to the v-card
          wrapper.appendChild(canvas);
        }

        this.canvasGif = document.getElementById("gifCanvas");
        this.contextGif = this.canvasGif.getContext('2d');

        //show the gif canvas and hide the image canvas
        this.contextGif.canvas.hidden = false;
        this.context.canvas.hidden = true;

        //createe a gif to draw all its frames on the canvas
        this.gif = GIFGroover();
        this.gif.src = this.url;
        this.gif.onload = () => {
          this.canvasGif.width = this.gif.width; // set canvas size to match the gif.
          this.canvasGif.height = this.gif.height;

          let gif = this.gif;
          let context = this.contextGif;
          let canvas = this.canvasGif;

          requestAnimationFrame(displayGif);    // start displaying the gif.

          // Display loop
          function displayGif(){
              context.clearRect(0,0, canvas.width, canvas.height); // Clear in case the gif is transparent
              context.drawImage(gif.image, 0, 0);                 // Draw the current frame
              requestAnimationFrame(displayGif);
          }
        }
      }
      else{
        //hide the gif canvas, show the image canvas if it is not a gif
        this.contextGif.canvas.hidden = true;
        this.context.canvas.hidden = false;

        let img = new Image;
        // on image load update Canvas Image
        img.onload = () => {
          //Clear Old Image and Reset Bounds
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.canvas.height = img.height;
          this.canvas.width = img.width;

          // Draw Image
          this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        };
        img.src = this.url;
      }
    },

    download(){
        if(this.downloadType === "JPG"){
          domtoimage.toJpeg(document.getElementById('wrapper'))
          .then(function (dataUrl) {
            const link = document.createElement('a');
            link.download = `meme-${new Date().getTime()}.jpg`;
            link.href = dataUrl;
            link.click();
          });
        }
        else if(this.downloadType === "PNG"){
          domtoimage.toPng(document.getElementById('wrapper'))
              .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = `meme-${new Date().getTime()}.png`;
                link.href = dataUrl;
                link.click();
              })
        }
        else if(this.downloadType === "GIF" && this.contextGif.canvas.hidden === false){
          const capturer = new CCapture( { format: 'gif', workersPath: '/js/' } );
          let canvas = this.canvasGif;

          //start capturing from the first frame of the gif
          this.gif.seekFrame(0);
          capturer.start();

          function render(){
          	requestAnimationFrame(render);
          	capturer.capture( canvas );
          }
          render();

          //duration of gif in ms
          let gifDuration = this.gif.duration;

          //after the gif was completely captured, save the gif from canvas
          setTimeout(function() {
            capturer.stop();
            //default save, will download automatically a gif
            capturer.save();
          }, gifDuration);
        }
      }
  },

  template:
  `
  <v-container fluid>
     <v-row>
      <v-col cols="12" md="7">

      <v-card style="relative" id="wrapper" height="canvas.height" color="rgba(0, 0, 0, 0)" elevation="0">
         <canvas id="memeCanvas" class="fullwidth"></canvas>
         <canvas id="gifCanvas" class="fullwidth"></canvas>

         <v-container style="position:absolute;top:0px">
              <v-row align="center" justify="center">
                <div :style="{ textAlign: 'center', fontSize: topSize + 'px', color: topColor, fontFamily: topFont, width: '80%' }">{{ topText }}</div>
              </v-row>
            </v-container>

            <v-container style="position:absolute; bottom:0px">
              <v-row align="center" justify="center">
                <div :style="{ textAlign: 'center', fontSize: bottomSize + 'px', color: bottomColor, fontFamily: bottomFont, topFont, width: '80%' }">{{ bottomText }}</div>
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
          <v-card-actions>
          <v-row>
            <v-col>
              <v-btn large color="#EBE4DE" @click="download">Download</v-btn>
            </v-col>
            <v-col>
              <v-select
                :items="['JPG', 'PNG', 'GIF']"
                v-model="downloadType"
                filled
                dense
              ></v-select>
            </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  `
})
