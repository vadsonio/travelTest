<template>
  <div class="form-group">
    <div class="select">
      <label class="select__label">Страна</label>
      <div class="select__dropdown-btn" @click="enableDropdown = !enableDropdown">
        {{getFilters.country.length > 0 ? getFilters.country : 'Выберите страну'}}
      </div>
      <div class="select__dropdown" v-if="enableDropdown" >
        <input
                type="text"
                class="select__search"
                placeholder="Поиск..."
                v-model="searchQuery">
        <div class="select__list-wrap">
          <ul class="select__list">
            <li class="select__list-item" v-for="(country, index) in filterList" :key="index">
              <a href="" class="select__list-link" @click.prevent="chooseCountry(country)">
                {{country}}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    data(){
      return{
        searchQuery: '',
        enableDropdown: false
      }
    },
    methods:{
      ...mapActions(['setCountries']),
      ...mapMutations(['addFilterCountry']),
      chooseCountry(countryName){
        this.addFilterCountry(countryName);
        this.searchQuery = '';
        this.enableDropdown = false;
      },
      hide() {
        this.enableDropdown = false
      }
    },
    computed:{
      ...mapGetters(['getCountries', 'getFilters']),
      filterList(){
        const filteredArr = [];
        for(let key in this.getCountries){
          let countryItem = this.getCountries[key].toLowerCase();
          if(countryItem.indexOf(this.searchQuery.toLowerCase())>-1){
            filteredArr.push(this.getCountries[key]);
          }
        }
        return filteredArr;
      }
    },
    mounted(){
      this.setCountries();
    }
  }
</script>