<template>
  <div class="form-group">
    <div class="input-form">
      <label>Цена до</label>
      <div class="input-form__range">
        <span>0</span>
        <custom-slider min="0" max="5000" step="100" v-model="priceFrom" ref="rangeSlider"/>
        <span>5000</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CustomSlider from "vue-custom-range-slider";
  import "vue-custom-range-slider/dist/vue-custom-range-slider.css";

  import { mapGetters, mapMutations } from 'vuex';

  export default {
    data(){
      return{
        componentKey: 0
      }
    },
    methods:{
      ...mapMutations(['addFilterPrice'])
    },
    computed:{
      ...mapGetters(['getFilters']),
      priceFrom:{
        set(val){
          this.addFilterPrice(val);
        },
        get(){
          return this.getFilters.price;
        }
      }
    },
    watch:{
      priceFrom(newVal){
        newVal==='0' ? console.log(this.$refs.rangeSlider.sliderValue="0") : false
      }
    },
    components:{
      CustomSlider
    }
  }
</script>

<style lang="scss">
.input-form__range{
  .slider{
    margin: 20px 10px;
  }
}
</style>