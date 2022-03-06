<template>
  <div id="carousel" class="carousel swiper-container usePx">
    <div class="swiper-wrapper">
      <div
        class="item swiper-slide"
        v-for="(item, index) in rowData.items"
        :key="index"
      >
        <img :src="imgs[index]" />
      </div>
    </div>
  </div>
</template>
<script>
import img1 from "/static/images/380x180/1.jpg";
import img2 from "/static/images/380x180/2.jpg";
import img3 from "/static/images/380x180/3.jpg";
import img4 from "/static/images/380x180/4.jpg";
import img5 from "/static/images/380x180/5.jpg";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "carouselCom",
  data() {
    return {
      imgs: [img1, img2, img3, img4, img5],
      carouselSwiper: undefined,
    };
  },
  props: {
    rowData: {
      type: Object,
      default() {
        return {
          items: [],
        };
      },
    },
    curItemCoord: {
      type: Object,
      default() {
        return {
          row: 0,
          item: 0,
          direction: undefined,
        };
      },
    },
  },
  watch: {
    curItemCoord: {
      deep: true,
      handler(coord) {
        if (coord.row == 0 && this.carouselSwiper) {
          this.carouselSwiper.stopAutoplay();
          switch (coord.direction) {
            case "left":
              this.carouselSwiper.slidePrev();
              break;
            case "right":
              this.carouselSwiper.slideNext();
              break;
            default:
              break;
          }
        } else if (this.carouselSwiper){
          this.carouselSwiper.startAutoplay();
        }
      },
    },
  },
  mounted() {
    this.carouselSwiper = new Swiper("#carousel", {
      // autoplay: {
      //   delay: 5000,
      // },
      autoplay: 5000,
      speed: 300,
      initialSlide: 0,
      direction: "horizontal",
      loop: true,
      loopAdditionalSlides: 2,
      loopedSlides: 5,
      parallax: true,
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: 3,
      updateOnImagesReady: true,
      coverflowEffect: {
        rotate: 20,
        stretch: 18,
        depth: 150,
        modifier: 2,
        slideShadows: true,
      },
      on: {
        slideChangeTransitionEnd() {
          console.log(this);
        },
      },
    });

    console.log(this.carouselSwiper);
  },
  methods: {},
};
</script>
<style lang="scss">
.carousel.usePx {
  height: calc((100vw - 100px) / 3 / 380 * 180);
  margin-bottom: 40px;

  .swiper-wrapper {
    width: 100%;
    height: 100%;

    .swiper-slide {
      position: relative;
      width: calc(100% / 3);
      height: 100%;
      

      &.swiper-slide-active img {
        transform: scale(1.05);
      }

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>