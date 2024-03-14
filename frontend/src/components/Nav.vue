<script setup>
import axios from 'axios'
import { ref,computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { BASE_URL} from '../axios'


const isLoggedIn = ref(!!sessionStorage.getItem('token'));

const router = useRouter();

const isUserLoggedIn = computed(() => {
  return isLoggedIn.value;
});

const handleLogout= async()=>{
    await axios.get(`${BASE_URL}/user/logout`).then((res)=>{
        console.log(res)
        sessionStorage.removeItem('token')
        location.reload();
    }).catch((err)=>{
        console.log(err)
    })
}
// Navigation guard to check authentication status before each navigation

</script>

<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
        <div class="flex items-center gap-3 flex-1">
        <i class="fa-regular fa-sun text-2xl"></i>
        <p class="text-2xl">The Local Weather</p>
      </div>
    <div class="flex flex-1 gap-3 justify-end">
    <router-link to='/' class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Home</router-link>
           <template v-if="isUserLoggedIn">
            <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page" @click="handleLogout">Logout</a>
           </template>
            <template v-else>
            <router-link to='/login' class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</router-link>
            </template>
    </div>
    </nav>

  </header>
<!--
        <div class="flex text-white m-3 items-center gap-3 flex-1">
        <i class="fa-regular fa-sun text-1xl"></i>
        <p class="text-1xl">The Local Weather</p>
      </div>


        <div class="hidden sm:ml-6 sm:block">
          <div class="flex space-x-4">
          </div>
        </div>
      </div>


      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <div class="relative ml-3">
          <div>
           <template v-if="isUserLoggedIn">
            <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page" @click="handleLogout">Logout</a>
           </template>
            <template v-else>
            <router-link to='/login' class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav> -->
<!-- navbar end -->

</template>