<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
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
          <Form class="space-y-4 md:space-y-6" @submit="onSubmit">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your email</label
              >
              <Field
                :rules="validateEmail"
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Your password</label
              >
              <Field
                :rules="validatePassword"
                type="password"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required=""
              />
              <ErrorMessage name="password" />
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
          </Form>
        </div>
      </div>
    </div>
  </div>
  <!-- <div id="app">
  <label for="">name</label>
    <Form @submit="onSubmit">
      <Field name="email" type="email" :rules="validateEmail"  />
      <ErrorMessage name="email" />

            <Field name="password" type="password" :rules="validatePassword"  />
      <ErrorMessage name="password" />
      <button>Sign up</button>
    </Form>
  </div> -->
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "axios";
import { BASE_URL } from "../axios.js";
import { useRouter } from "vue-router";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    async onSubmit(values) {
      try {
        await axios.post(`${BASE_URL}/user/login`, values).then((res) => {
          sessionStorage.setItem("token", JSON.stringify(res.data.data));
          this.$toast.success(`${res.data.message}`);
          window.location.href = "/";
          console.log(res);
        });
      } catch (error) {
        console.log(error);
        this.$toast.error(`${error.response.data.message}`);
      }
    },
    validateEmail(value) {
      if (!value) {
        return "This field is required";
      }
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return "This field must be a valid email";
      }
      return true;
    },
    validatePassword(value) {
      if (!value) {
        return "This field is required";
      }
      return true;
    },
  },
};
</script>
