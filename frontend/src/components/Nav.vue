<script setup>
import axios from "axios";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { BASE_URL } from "../axios";
import {uid} from "uid"

const isLoggedIn = ref(!!sessionStorage.getItem("token"));

const router = useRouter();

const isUserLoggedIn = computed(() => {
  return isLoggedIn.value;
});

const handleLogout = async () => {
  await axios
    .get(`${BASE_URL}/user/logout`)
    .then((res) => {
      sessionStorage.removeItem("token");
      window.location.href="/login"
    })
    .catch((err) => {
      this.$toast.error(`${err.response.data.message}`);
    });
};
// Navigation guard to check authentication status before each navigation
const savedCities =ref([])
const route = useRoute()
const addCity = () =>{
  if(localStorage.getItem("savedCities")){
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    )
  }
  const locationObj = {
    id:uid(),
    state:route.params.state,
    city:route.params.city,
    coords:{
      lat:route.query.lat,
      lng:route.query.lng,
    }
  }
  savedCities.value.push(locationObj)
  localStorage.setItem("savedCities",JSON.stringify(savedCities.value))

  let query = Object.assign({},route.query);
  delete query.preview;
  query.id=locationObj.id;
  router.replace({query})
}

</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg left-0 w-full px-4 py-3 z-50">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6">
      <div class="flex items-center gap-3 flex-1">
        <i class="fa-regular fa-sun text-2xl"></i>
        <p class="text-2xl">The Local Weather</p>
        <i class="fa-solid fa-store mt-2 text-xl hover:text-weather-secondary duration-150 cursor-pointer" @click="addCity"></i>
      </div>
      <div class="flex flex-1 gap-3 justify-end">
        <router-link
          to="/"
          class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
          >Home</router-link
        >
        <template v-if="isUserLoggedIn">
          <a
            href="#"
            class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
            aria-current="page"
            @click="handleLogout"
            >Logout</a
          >
        </template>
        <template v-else>
          <router-link
            to="/login"
            class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >Login</router-link
          >
        </template>
      </div>
    </nav>
  </header>
  <!-- navbar end -->
</template>
