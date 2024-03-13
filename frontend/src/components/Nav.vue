<script setup>
import axios from 'axios'
import { ref,computed } from 'vue'
import { useRoute, useRouter } from 'vue-router';


const isLoggedIn = ref(!!sessionStorage.getItem('token'));

const router = useRouter();

const isUserLoggedIn = computed(() => {
  return isLoggedIn.value;
});

const handleLogout= async()=>{
    await axios.get('/user/logout').then((res)=>{
        console.log(res)
        sessionStorage.removeItem('token')
        location.reload();
    }).catch((err)=>{
        console.log(err)
    })
}
// Navigation guard to check authentication status before each navigation
router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    // If navigating to the login page, no need to check authentication
    next();
  } else {
    // For other pages, check if the user is logged in
    if (sessionStorage.getItem('token')) {
      // User is logged in
      isLoggedIn.value = true;
      next();
    } else {
      // User is not logged in, redirect to login page
      isLoggedIn.value = false;
      next({ name: 'Login' });
    }
  }
});
</script>

<template>

<!-- navbar start -->
<nav class="bg-indigo-950">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
      </div>
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">

        <!-- <div class="flex flex-shrink-0 items-center">
        </div> -->
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
        <!-- Profile dropdown -->
        <div class="relative ml-3">
          <div>
           <!-- Conditional rendering of login/logout button -->
           <template v-if="isUserLoggedIn">
            <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page" @click="handleLogout">Logout</a>
           </template>
            <template v-else>
            <router-link to='/login' class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</router-link>
            </template>
            <!-- <router-link to='/login' class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Login</router-link> -->
            <!-- <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page" @click="handleLogout">Logout</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
<!-- navbar end -->

</template>