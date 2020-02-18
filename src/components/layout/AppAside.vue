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
    <div class="sidebar__component-area">
      <button class="btn btn--pink" @click="openChat">
        Показать чат
      </button>
    </div>
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

  import {EventBus} from "../../eventBus";

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
      },
      openChat(){
        EventBus.$emit('openChat');
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
    &__component-area{
      padding: 10px 0 0;
    }
  }
</style>