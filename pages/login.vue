<template>
  <body class="min-h-screen flex justify-center items-center">
    <div class="wrapper">
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
      <div><span class="dot"></span></div>
    </div>
    <div class="relative flex justify-center items-center">
      <div
        class="bg-yellow-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"
      ></div>
      <div
        class="bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"
      ></div>
      <div class="py-32 px-32 bg-gray-100 rounded-2xl shadow-xl z-20">
        <div>
          <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
            Log Into Your Account
          </h1>
          <p
            class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"
          >
            Get access to our collection of fish !
          </p>
        </div>
        <div class="space-y-4">
          <input
            type="text"
            name="nameé"
            id="name"
            placeholder="name"
            v-model="name"
            autocomplete=""
            class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <input
            type="password"
            name="passwordè"
            id="password"
            placeholder="Password"
            v-model="password"
            autocomplete=""
            class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
        </div>
        <div v-if="errorMessage" class="bg-red-200 py-2 px-4 text-red-800">
          {{ errorMessage }}
        </div>
        <div class="text-center mt-6">
          <button
            @click="login()"
            class="py-3 w-64 text-xl text-white bg-yellow-500 hover:bg-yellow-600 transition rounded-2xl"
          >
            Sign In
          </button>
          <p class="mt-4 text-sm">
            Don't have an account ?
            <nuxt-link to="../register" class="underline cursor-pointer">
              Sign Up</nuxt-link
            >
          </p>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      password: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  layout: 'empty',
  methods: {
    login() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("password", this.password);

      // Effectuer une requête AJAX pour vérifier si les informations d'identification sont correctes
      axios
        .post("http://localhost/my-app/GetafishBack/login.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          // Vérifier si les informations d'identification sont correctes
          if (response.data.name) {
            this.successMessage = "Connexion réussie!";
            this.$store.commit('user/addUser', { name: this.name, token: response.data.token })
            this.$router.push({
              path: "/", 
            });
          } else {
            this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.wrapper {
  height: 100%;
  width: 100%;
  background: linear-gradient(180deg, #04fafd, 5%, #119dff, 50%, #030423);
  position: absolute;
}
.wrapper h1 {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  font-family: sans-serif;
  letter-spacing: 1px;
  word-spacing: 2px;
  color: #fff;
  font-size: 40px;
  font-weight: 888;
  text-transform: uppercase;
}
.wrapper div {
  height: 60px;
  width: 60px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  position: absolute;
  top: 10%;
  left: 10%;
  animation: 4s linear infinite;
}
div .dot {
  height: 10px;
  width: 10px;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 20%;
  right: 20%;
}
.wrapper div:nth-child(1) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(2) {
  top: 60%;
  left: 80%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(3) {
  top: 40%;
  left: 40%;
  animation: animate 3s linear infinite;
}
.wrapper div:nth-child(4) {
  top: 66%;
  left: 30%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(5) {
  top: 90%;
  left: 10%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(6) {
  top: 30%;
  left: 60%;
  animation: animate 5s linear infinite;
}
.wrapper div:nth-child(7) {
  top: 70%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(8) {
  top: 75%;
  left: 60%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(9) {
  top: 50%;
  left: 50%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(10) {
  top: 45%;
  left: 20%;
  animation: animate 10s linear infinite;
}
.wrapper div:nth-child(11) {
  top: 10%;
  left: 90%;
  animation: animate 9s linear infinite;
}
.wrapper div:nth-child(12) {
  top: 20%;
  left: 70%;
  animation: animate 7s linear infinite;
}
.wrapper div:nth-child(13) {
  top: 20%;
  left: 20%;
  animation: animate 8s linear infinite;
}
.wrapper div:nth-child(14) {
  top: 60%;
  left: 5%;
  animation: animate 6s linear infinite;
}
.wrapper div:nth-child(15) {
  top: 90%;
  left: 80%;
  animation: animate 9s linear infinite;
}
@keyframes animate {
  0% {
    transform: scale(0) translateY(0) rotate(70deg);
  }
  100% {
    transform: scale(1.3) translateY(-100px) rotate(360deg);
  }
}
</style>
