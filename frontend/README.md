<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { BASE_URL } from "../axios.js";
import { Form, Field } from "vee-validate";

const router = useRouter();
const form = ref({
  email: "",
  password: "",
});


const handleLogin = async () => {
  await axios
    .post(`${BASE_URL}/user/login`, {
      email: form.value.email,
      password: form.value.password,
    })
    .then((res) => {
      sessionStorage.setItem("token", JSON.stringify(res.data.data));
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Login in to your account
          </h1>
          <Form @submit="onSubmit">
            <Field name="email" type="email" />
            <button>Sign up for newsletter</button>
          </Form>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                v-model="form.email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your password</label
              >
              <input
                type="password"
                name="password"
                v-model="form.password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <!-- <button type="submit" class="w-full text-white bg-Purple-700 hover:bg-Purple-700 focus:ring-4 focus:outline-none focus:bg-Purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-Purple-700 dark:hover:bg-Purple-700 dark:focus:bg-Purple-700">Sign in</button> -->
            <button
              class="bg-indigo-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link
                to="/register"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Sign up</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


///////////////////////////////////////////register

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import {ref} from "vue"
import { BASE_URL } from '../axios.js'

const router = useRouter();
const form = ref({
    name:'',email:'',password:'',cpassword:''
})
const handleRegister=async()=>{
    await axios.post(`${BASE_URL}/user/register`,{name:form.value.name,email:form.value.email,password:form.value.password,cpassword:form.value.cpassword}).then((data)=>{
        console.log(data)
        router.push('/login')
    }).catch((err)=>{
        console.log(err);
    })
}

</script>

<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Create Account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleRegister">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your Name</label
              >
              <input
                type="name"
                v-model="form.name"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <input
                type="email"
                name="email"
                v-model="form.email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your password</label
              >
              <input
                type="password"
                v-model="form.password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label
                for="cpassword"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your password</label
              >
              <input
                type="password"
                name="cpassword"
                v-model="form.cpassword"
                id="cpassword"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
            </div>
            <!-- <button type="submit" class="w-full text-white bg-Purple-700 hover:bg-Purple-700 focus:ring-4 focus:outline-none focus:bg-Purple-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-Purple-700 dark:hover:bg-Purple-700 dark:focus:bg-Purple-700">Sign in</button> -->
            <button
              class="bg-indigo-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Signup
            </button>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have Account?
              <router-link
                to="/login"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >Login</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
