import axios from 'axios';

import countries from '../fakeJson/countries'

export default{
  actions:{
    setCountries({commit}){
      commit('updateCountries', countries);
    },
    async setTypes({commit}){
      await axios
        .get('https://my-json-server.typicode.com/vadsonio/mockjson/hotels')
        .then(response=>{
          let hotelsArr =response.data,
              types = [];
          hotelsArr.forEach(item=>{
            types.push(item.type);
          });
          types = new Set(types);
          commit('updateTypes', types);
        })
        .catch(error=>console.log(error.response))
    },
    async setHotels({commit}){
      await axios
        .get('https://my-json-server.typicode.com/vadsonio/mockjson/hotels')
        .then(response=>{
          let hotels = response.data;
          commit('updateHotels', hotels);
        })
        .catch(error=>console.log(error.response))
    }
  },
  mutations:{
    updateCountries(state, countries) {
      state.countries = countries;
    },
    updateTypes(state, types){
      state.types = types;
    },
    updateHotels(state, hotels){
      state.hotels = hotels;
      state.submitedList = hotels;
    },
    addFilterCountry(state, country){
      state.filters.country = country;
    },
    addFilterType(state, type){
      state.filters.type = type;
    },
    addFilterRate(state, rateArr){
      state.filters.rate = rateArr;
    },
    addFilterReviews(state, reviews){
      state.filters.reviews = reviews;
    },
    addFilterPrice(state, price){
      state.filters.price = price;
    },
    submitList(state, filteredList){
      state.submitedList = filteredList;
    },
    clearFilters(state){
      state.filters.country = "";
      state.filters.type = "";
      state.filters.rate = [];
      state.filters.reviews = 0;
      state.filters.price = "0";

      state.submitedList = state.hotels;
    }
  },
  state: {
    countries: [],
    types: [],
    rate: [],
    hotels: [],
    filters: {
      country: "",
      type: "",
      rate: [],
      reviews: 0,
      price: "0"
    },
    submitedList: []
  },
  getters:{
    getCountries: state => state.countries,
    getTypes: state => state.types,
    getHotels: state => state.hotels,
    getFilters: state => state.filters,
    getFilteredList: state => state.submitedList
  }
}