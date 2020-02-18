<template>
  <div class="body">
    <div class="container">
      <div class="body__wrap">
        <Aside/>
        <Main/>
      </div>
    </div>
    <ModalChat/>
  </div>
</template>

<script>
  import Aside from './components/layout/AppAside';
  import Main from './components/layout/AppMain';
  import ModalChat from './components/ui/MainModalChat';




export default {
  name: 'App',
  components: {
    Aside,
    Main,
    ModalChat
  }
}
</script>

<style lang="scss">
.body{
  &__wrap{
    padding-top: 20px;
    display: flex;
  }
}

</style>
