<template>
  <div class="form-group">
    <div class="input-form">
      <label>Количество отзывов от</label>
      <input class="input-form__input" type="number" placeholder="0" v-model="reviews">
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default{
    methods:{
      ...mapMutations(['addFilterReviews'])
    },
    computed:{
      ...mapGetters(['getFilters']),
      reviews:{
        set(val){
          this.addFilterReviews(val);
        },
        get(){
          return this.getFilters.rate;
        }
      }
    }
  }
</script>

<style lang="scss">

</style>