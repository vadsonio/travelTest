<template>
  <div class="modal" :class="{'open': showChat}">
    <div class="modal__inner">
      <div class="modal__decor-ribbon"></div>
      <div class="modal__head">
        <button class="modal__close" @click="showChat = false">
          <img src="../../assets/img/modal-close.png" alt="close-modal">
        </button>
        <div class="modal__head-wrap">
          <a href="#" class="modal__avatar" :style="{'background-image': `url(${require('../../assets/img/user-1.png')})`}"></a>
          <div class="modal__user">
            <h2 class="modal__user-name">
              Токсикова Ольга
            </h2>
            <span class="modal__user-address">
              Днепропетровск
            </span>
          </div>

          <div class="star-rate">
            <input type="radio" name="rating" value="rate-5" id="rating-5" v-model="rating">
            <label for="rating-5"></label>
            <input type="radio" name="rating" value="rate-4" id="rating-4" v-model="rating">
            <label for="rating-4"></label>
            <input type="radio" name="rating" value="rate-3" id="rating-3" v-model="rating">
            <label for="rating-3"></label>
            <input type="radio" name="rating" value="rate-2" id="rating-2" v-model="rating">
            <label for="rating-2"></label>
            <input type="radio" name="rating" value="rate-1" id="rating-1" v-model="rating">
            <label for="rating-1"></label>
          </div>

        </div>
      </div>
      <div class="modal__body" ref="messagesBody">
        <div class="modal__container">

          <div class="user-message"
               :class="{'user-message--received': sendMessage.user === user, 'activeClass': sendMessage.activeClass}"
               v-for="sendMessage in messages" :key="sendMessage.id">
             <a href="#" class="modal__avatar modal__avatar--sm"
                   :style="{'background-image': `url(${require('../../assets/img/'+sendMessage.avatar+'.png')})`}"></a>
            <p class="user-message__text-area">
              {{sendMessage.message}}
            </p>
            <span class="user-message__send-time">
              {{sendMessage.timestamp}}
            </span>
          </div>

        </div>
      </div>
      <div class="modal__bottom">
        <div class="modal__avatar"
             :style="{'background-image': `url(${require('../../assets/img/user-2.png')})`}">
        </div>
        <div class="modal__controls">
          <textarea-autosize
                  class="modal__textarea"
                  placeholder=""
                  ref="myTextarea"
                  rows="4"
                  v-model="message"
                  :min-height="80"
                  :max-height="120"
                  @keyup.enter="addMessage"/>
          <button class="modal__btn-send" @click="addMessage">Отправить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {EventBus} from '../../eventBus';

  export default{
    data(){
      return{
        rating: "rate-4",
        showChat: false,
        user: '2',
        message: '',
        avatar: 'user-2',
        usersArr: [],
        messages: [
          {
            id: "0",
            user: "1",
            avatar: "user-1",
            message: "Где взять на прокат вечернее красивое платье? А еще лучше дизайнерское! Предстоит участие в мероприятии, где все гости будут наверняка одеты в наряды\n" +
            "'от кутюр', а у меня со средствами туговато, да и жалко на один раз такие деньжищи отваливать. Мне",
            timestamp: "15:00"
          },
          {
            id: "1",
            user: "2",
            avatar: "user-2",
            message: "Поисковик вам в помощь! Но цена примерно в половину стоимости платья.",
            timestamp: "16:00"
          },
          {
            id: "2",
            user: "1",
            avatar: "user-1",
            message: "Где взять на прокат вечернее красивое платье? А еще лучше дизайнерское! Предстоит участие в мероприятии, где все гости будут наверняка одеты в наряды\n" +
            "'от кутюр', а у меня со средствами туговато, да и жалко на один раз такие деньжищи отваливать. Мне",
            timestamp: "17:00"
          },
          {
            id: "3",
            user: "2",
            avatar: "user-2",
            message: "Поисковик вам в помощь! Но цена примерно в половину стоимости платья.",
            timestamp: "18:00"
          },
          {
            id: "4",
            user: "1",
            avatar: "user-1",
            message: "Где взять на прокат вечернее красивое платье? А еще лучше дизайнерское! Предстоит участие в мероприятии",
            timestamp: "19:00"
          },
          {
            id: "5",
            user: "2",
            avatar: "user-2",
            message: "Где взять на прокат вечернее красивое платье? А еще лучше дизайнерское! Предстоит участие в мероприятии",
            timestamp: "20:00"
          }
        ]
      }
    },
    methods:{
      scrollToBottom(){
        // скролл спускаем вниз
        let messagesBody = this.$refs.messagesBody;
        messagesBody.scrollTop = messagesBody.scrollHeight - messagesBody.clientHeight;
      },
      addMessage(){
        if(this.message===""){
          return;
        }

        let messageId = this.messages.length;
        let message = {
          id: messageId,
          user: this.user,
          avatar: this.avatar,
          message: this.message,
          timestamp: '11:00',
          activeClass: true
        };

        let messageToActive = messageId;
        this.usersArr.push(messageToActive);

        this.message="";
        this.messages.push(message);
      }
    },
    updated(){
      this.scrollToBottom();
    },
    created(){
      EventBus.$on('openChat', ()=> this.showChat = true);
    },
    watch: {
      showChat(newVal){
        newVal ? setTimeout(this.scrollToBottom(), 0) : false;
      },
      usersArr(newVal){
        newVal.forEach((messageId, index)=>{
          setTimeout(()=>{
            this.messages.forEach(message=>{
              if(message.id === messageId){
                message.activeClass = false;
              }
            });
          }, 2000);
          newVal.splice(index, 1);
        });
      }
    }
  }

</script>

<style lang="scss">

  .modal{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 2;
    &.open{
      display: block;
    }
    &__inner{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      width: 600px;
      max-height: 550px;
      min-height: 250px;
      height: 100%;
      border-radius: 6px;
      overflow: hidden;
      background: #fff;
    }
    &__decor-ribbon{
      height: 11px;
      flex-shrink: 0;
      background-image: url("../../assets/img/modal-ribbon.png");
    }
    &__head{
      padding: 17px 30px 13px;
      position: relative;
      border-bottom: 1px solid rgba(173,173,173,.24);
      &-wrap{
        display: flex;
      }
    }
    &__close{
      position: absolute;
      top: 12px;
      right: 6px;
      padding: 0;
      border: 0;
      cursor: pointer;
      outline: none;
      background: transparent;
      &:hover,
      &:focus{
        opacity: .8;
      }
    }
    &__avatar{
      margin-right: 15px;
      width: 45px;
      height: 45px;
      flex-shrink: 0;
      border-radius: 3px;
      background-position: center;
      background-size: cover;
      &--sm{
        width: 30px;
        height: 30px;
        border-right: 3px;
      }
    }
    &__user{
      &-name{
        margin: 0;
        margin-bottom: 6px;
        font-size: 24px;
        line-height: 20px;
        font-family: 'PT Sans', sans-serif;
        max-width: 370px;
      }
      &-address{
        font-size: 16px;
        font-family: Arial, sans-serif;
        line-height: 20px;
        color: #7F7F7F;
      }
    }
    .star-rate {
      margin-left: auto;
      margin-right: 15px;
      display: flex;
      flex-direction: row-reverse;
      & > input {
        display: none;
      }
      & > label {
        cursor: pointer;
        width: 18px;
        height: 17px;
        background-image: url("../../assets/img/star-deactive.png");
        background-repeat: no-repeat;
        background-position: center;
        transition: .3s;
      }
      & > input:checked ~ label,
      & > input:checked ~ label ~ label {
        background-image: url("../../assets/img/star-active.png");
      }
      & > input:not(:checked) ~ label:hover,
      & > input:not(:checked) ~ label:hover ~ label {
        background-image: url("../../assets/img/star-active.png");
      }
    }
    &__body{
      padding: 0 30px;
      flex-shrink: 1;
      overflow: auto;
      margin-right: 7px;
      &::-webkit-scrollbar {
        width: 8px;
      }
      &::-webkit-scrollbar-track {
        /**/
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: #C2C2C2;
      }
    }
    .user-message{
      margin: 8px 0;
      padding: 7px 0 8px 15px;
      border-radius: 3px;
      display: flex;
      align-items: flex-start;
      &.activeClass{
        background: rgba(51, 153, 255, .2);
      }
      &--received{
        background: rgba(240, 236, 240, .53);
      }
      &__text-area{
        margin: 0;
        font-family: Arial, sans-serif;
        font-size: 14px;
        max-width: 370px;
        color: #3E3E3E;
        a{
          color: #3399FF;
          text-decoration: underline;
        }
      }
      &__send-time{
        margin-left: auto;
        margin-right: 5px;
        font-size: 12px;
        font-family: Arial, sans-serif;
        color: #7F7F7F;
      }
    }

    &__bottom{
      margin-top: auto;
      padding: 12px 30px 9px;
      display: flex;
      background: #E9F2FA;
    }
    &__controls{
      width: 100%;
    }
    &__textarea{
      padding: 5px;
      margin-bottom: 7px;
      width: 100%;
      border-radius: 3px;
      border: 1px solid rgba(85,85,85,.39);
      resize: none;
    }
    &__btn-send{
      padding: 5px 26px;
      font-size: 16px;
      line-height: 19px;
      border-radius: 3px;
      border: 1px solid rgba(85,85,85,.39);
      font-family: Arial, sans-serif;
      cursor: pointer;
      background: #ffffff; /* Old browsers */
      background: -moz-linear-gradient(top, #ffffff 0%, #d4d4d8 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, #ffffff 0%,#d4d4d8 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, #ffffff 0%,#d4d4d8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#d4d4d8',GradientType=0 ); /* IE6-9 */
      color: #3E3E3E;
    }
  }
</style>