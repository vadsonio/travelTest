<template>
  <div class="form-group">
    <div class="select">
      <div class="select__dropdown-btn select__dropdown-btn--green" @click="enableDropdown = !enableDropdown">
        Звезды
      </div>
      <div class="select__dropdown" v-if="enableDropdown">
        <div class="select__list-wrap">
          <ul class="select__list">
            <li class="select__list-item">
              <label for="stars-rate-1">
                <input id="stars-rate-1" type="checkbox" value="1" v-model.number="rateStars">
                1 звезда
              </label>
            </li>
            <li class="select__list-item">
              <label for="stars-rate-2">
                <input id="stars-rate-2" type="checkbox" value="2" v-model.number="rateStars">
                2 звезды
              </label>
            </li>
            <li class="select__list-item">
              <label for="stars-rate-3">
                <input id="stars-rate-3" type="checkbox" value="3" v-model.number="rateStars">
                3 звезды
              </label>
            </li>
            <li class="select__list-item">
              <label for="stars-rate-4">
                <input id="stars-rate-4" type="checkbox" value="4" v-model.number="rateStars">
                4 звезды
              </label>
            </li>
            <li class="select__list-item">
              <label for="stars-rate-5">
                <input id="stars-rate-5" type="checkbox" value="5" v-model.number="rateStars">
                5 звезд
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';

  export default {
    data(){
      return{
        enableDropdown: false
      }
    },
    methods:{
      ...mapMutations(['addFilterRate']),
      hide() {
        this.enableDropdown = false
      }
    },
    computed:{
      ...mapGetters(['getFilters']),
      rateStars:{
        set(val){
          this.addFilterRate(val);
        },
        get(){
          return this.getFilters.rate;
        }
      }
    }
  }

</script>

<style lang="scss">
.select__list-item label{
  display: block;
  padding: 10px;
  cursor: pointer;
}
</style>