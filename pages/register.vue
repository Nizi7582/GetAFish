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
    <div class="relative flex justify-center items-center max-w-xl">
      <div
        class="bg-yellow-400 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"
      ></div>
      <div
        class="bg-blue-400 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"
      ></div>
      <div class="py-20 px-32 bg-gray-100 rounded-2xl shadow-xl z-20">
        <div>
          <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
            Create An Account
          </h1>
          <p
            class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"
          >
            Create an account to enjoy our services !
          </p>
        </div>
        <div class="space-y-4">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Username"
            v-model="name"
            class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
          />
          <div>
            <input
              type="email"
              name="emails"
              id="email"
              placeholder="Email"
              v-model="email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              minlength="7"
              @blur="validateEmail"
              class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              autocomplete="new-password"
            />
            <div v-if="!isEmailValid" class="error text-red-500 text-sm">
              Please enter a valid email address
            </div>
            <div v-if="errorMail != ''" class="error text-red-500 text-sm">
              A user with this email already exist
            </div>
          </div>
          <div>
            <input
              type="password"
              name="passwords"
              id="password"
              placeholder="Password"
              v-model="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}"
              required
              minlength="7"
              @blur="validatePassword"
              class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
              autocomplete="new-password"
            />
            <div v-if="!isPasswordValid" class="error text-red-500 text-sm">
              Please enter a password that includes at least one digit, one
              lowercase letter, one uppercase letter, and one symbol.
            </div>
          </div>
        </div>
        <div class="text-center mt-6">
          <button
            @click="register()"
            class="py-3 w-64 text-xl text-white bg-yellow-500 hover:bg-yellow-600 transition rounded-2xl"
          >
            Create Account
          </button>
          <p class="mt-4 text-sm">
            Already Have An Account ?
            <nuxt-link to="../login" class="underline cursor-pointer">
              Sign In</nuxt-link
            >
          </p>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from 'axios'

export default {
  layout: 'empty',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      isEmailValid: true,
      isPasswordValid: true,
      errorMail: ''
    }
  },
  methods: {
    register() {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('email', this.email)
      formData.append('password', this.password)

      // Vérifier que les champs sont remplis
      axios
        .post('http://localhost/my-app/GetafishBack/register.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data === 'Un utilisateur avec cet email existe déjà.') {
            this.errorMail = response.data
            setTimeout(() => {
              this.errorMail = ''
            }, 3500)
            return
          }
          this.$store.commit('user/addUser', {
            name: this.name,
            email: this.email,
            token: response.data.token,
          })
          this.successMessage = 'Utilisateur enregistré avec succès!'

          console.log(response.data)
          setTimeout(() => {
            this.successMessage = ''
          }, 5000)
          this.$router.push({
            path: '/',
          })
          // masquer le message après 5 secondes
          this.email = ''
          this.password = ''
        })

        .catch((error) => {
          console.log(error)
        })
    },
    validateEmail() {
      this.isEmailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email) && this.email.length >= 7
    },
    validatePassword() {
      this.isPasswordValid =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(this.password) &&
        this.password.length >= 8
    },
  },
}
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
