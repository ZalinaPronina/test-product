import Swiper from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";


const FeaturedProducts = {
  onLoad() {
    this._init();
    this.media = window.matchMedia(Shopify.theme.media.md);
    this.media.addEventListener("change", (ev) => this._mediaChange(ev));
    this._mediaChange(this.media);
  },
  
  _mediaChange(ev) {
    if (ev.matches) {
      this._destroySwiper();
    } else {
      this._initSwiper();
    }
  },

  _init() {
    this.sliderWrapper = this.container.querySelector(".swiper");
    if (!this.sliderWrapper) return;
    this._initSwiper();
  },

  _initSwiper() {
    if (!this.slider) {
      this.slider = new Swiper(this.sliderWrapper, {
        slidesPerView: 1.1,
        spaceBetween: 20,
        breakpoints: {
          525: {
            slidesPerView: 2,
          },
          425: {
            slidesPerView: 1.5,
          }
        }
      });
    }
  },

  _destroySwiper() {
    if (this.slider) {
      this.slider.destroy(true, true);
      this.slider = null;
    }
  }
};

export default FeaturedProducts;
