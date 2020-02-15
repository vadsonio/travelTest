<template>
  <main class="main">
    <table class="table" cellspacing="0" cellpadding="0">
      <thead>
        <tr class="table__head">
          <th width="20%">Название</th>
          <th width="60%">Описание</th>
          <th width="20%"></th>
        </tr>
      </thead>
      <tbody v-if="paginatedList.length>0">
        <tr v-for="item in paginatedList" :key="item.name" >
          <td>
            {{item.name}}
          </td>
          <td>
            {{item.description}}
          </td>
          <td>
            <a href="">Забронировать</a>
          </td>
        </tr>
      </tbody>
      <div v-else class="table__empty-posts">Записей не найдено</div>
    </table>

    <div class="pagination">
      <button class="pagination__prev" v-if="page!=1" @click="page--">
        <<
      </button>
      <button
              v-for="pageNumber in pages"
              :key="pageNumber.id"
              :class="{'active': pageNumber === page}"
              @click="page = pageNumber"
              v-if="pages.length>1">
        {{pageNumber}}
      </button>
      <button class="pagination__next" @click="page++" v-if="page < pages.length">
        >>
      </button>
    </div>
  </main>


</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data(){
      return{
        page: 1,
        perPage: 3,
        posts: [],
        pages: []
      }
    },
    methods:{
      ...mapActions(['setHotels']),
      setPages(){
        let numberOfPages = Math.ceil(this.getFilteredList.length / this.perPage);
        this.pages=[];

        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      },
      paginate(hotelsArr){
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return hotelsArr.slice(from, to);
      }
    },
    computed:{
      ...mapGetters(['getHotels', 'getFilters', 'getFilteredList']),
      paginatedList(){
        return this.paginate(this.getFilteredList);
      }
    },
    async mounted(){
      await this.setHotels();
      this.setPages();
    },
    watch:{
      getFilteredList(){
        this.setPages();
      }
    }
  }

</script>

<style lang="scss">
  .main{
    width: 100%;
  }
</style>