<template>
  <aside class="sidebar">
    <button class="btn btn--blue" @click="clearFilters">
      Очистить фильтры
    </button>
    <SelectCountries/>
    <SelectType/>
    <SelectStars/>
    <InputReviews/>
    <RangePrice/>
    <button class="btn btn--blue" @click="submitFilters">
      Применить фильтры
    </button>
  </aside>
</template>

<script>
  import SelectCountries from '../ui/AsideSelectCountries';
  import SelectType from '../ui/AsideSelectType';
  import SelectStars from '../ui/AsideCheckboxStars';
  import InputReviews from '../ui/AsideInputReviews';
  import RangePrice from '../ui/AsideRangePrice';

  import { filterLeads } from "../../helpers/filter";

  import { mapMutations, mapGetters } from 'vuex';

  export default{
    components:{
      SelectCountries,
      SelectType,
      SelectStars,
      InputReviews,
      RangePrice
    },
    methods: {
      ...mapMutations(['clearFilters', 'submitFilters','submitList']),
      submitFilters(){
        let filtered = filterLeads(this.getFilters, this.getHotels);
        this.submitList(filtered);
      }
    },
    computed:{
      ...mapGetters(['getHotels', 'getFilters'])
    }
  }

</script>

<style lang="scss">
  .sidebar{
    width: 300px;
    margin-right: 20px;
    flex-shrink: 0;
  }
</style>