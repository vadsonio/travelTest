<template>
  <div class="form-group">
    <div class="select">
      <label class="select__label">Тип</label>
      <div class="select__dropdown-btn" @click="enableDropdown = !enableDropdown">
        {{getFilters.type.length > 0 ? getFilters.type : 'Выберите тип'}}
      </div>
      <div class="select__dropdown" v-if="enableDropdown">
        <div class="select__list-wrap">
          <ul class="select__list">
            <li class="select__list-item" v-for="(type, index) in getTypes" :key="index">
              <a href="" class="select__list-link" @click.prevent="chooseType(type)">
                {{type}}
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
        enableDropdown: false
      }
    },
    methods:{
      ...mapActions(['setTypes']),
      ...mapMutations(['addFilterType']),
      chooseType(type){
        this.addFilterType(type);
        this.enableDropdown = false;
      },
      hide() {
        this.enableDropdown = false
      }
    },
    computed:{
      ...mapGetters(['getTypes', 'getFilters'])
    },
    mounted(){
      this.setTypes();
    }
  }
</script>

<style>

</style>