<template>
  <div class="bg1 min-h-screen h-full">
    <div v-if="step === 1">
      <div class="flex items-center">
        <section class="w-full py-10">
          <div class="container mx-auto text-center text-yellow-800">
            <h1 class="text-7xl font-bold mb-6 police">Cart</h1>
            <p class="text-2xl">
              Add items from the collection and purchase them !
            </p>
          </div>
        </section>
      </div>
      <div class="container mx-auto">
        <div class="flex shadow-md bg-gray-100">
          <div class="w-3/4 bg-white px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-2xl">{{ totalFish }} Item</h2>
            </div>
            <div class="flex mt-10 mb-5">
              <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/4">
                Fish Details
              </h3>
              <h3
                class="font-semibold text-center text-gray-600 text-xs uppercase w-1/4 text-center"
              >
                Quantity
              </h3>
              <h3
                class="font-semibold text-center text-gray-600 text-xs uppercase w-1/4 text-right"
              >
                Price
              </h3>
            </div>
            <div v-if="fishs.length > 0">
              <div
                v-for="(fish, index) in fishs"
                :key="index"
                class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              >
                <div class="flex w-2/4">
                  <!-- product -->
                  <div class="w-52 flex justify-center border">
                    <img class="h-24" :src="fish.image" alt="" />
                  </div>
                  <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-xl truncate">{{
                      fish.name
                    }}</span>
                    <button class="" @click="removeFish(index)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="flex justify-center w-1/4">
                  <div>1</div>
                </div>
                <span class="text-right w-1/4 font-semibold text-sm pr-2"
                  >{{ fish.price }} €</span
                >
              </div>
            </div>
            <div v-else class="flex items-center justify-center h-72 w-full">
              <div class="font-semibold text-3xl">
                Add fish from our collection to display them here !
              </div>
            </div>

            <nuxt-link
              to="/collection"
              class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                class="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path
                  d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z"
                />
              </svg>
              Continue Shopping
            </nuxt-link>
          </div>

          <div id="summary" class="w-1/4 px-8 py-10">
            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase"
                >Number of fish</span
              >
              <span class="font-semibold text-sm">{{ fishs.length }}</span>
            </div>
            <div class="border-t mt-8">
              <div
                class="flex font-semibold justify-between py-6 text-sm uppercase"
              >
                <span>Total cost</span>
                <span>{{ subtotal }}</span>
              </div>
              <button
                @click="step = 2"
                class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Payment
      v-if="step === 2"
      @return="
        completeOrder(
          $event.cardName,
          $event.cardNumber,
          $event.cardMonth,
          $event.cardYear,
          $event.cardCvv
        )
      "
    />
    <Recap v-if="step === 3" :user="user" :fishs="factureItems" :totalFish="factureItems" :currentDate="currentDate" :subtotal="factureSubtotal" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      totalPrice: 0,
      step: 1,
      factureSubtotal: 0,
      factureTotalItems: 0,
      factureItems: []
    }
  },
  layout: 'cart',
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
    ...mapGetters({
      fishs: 'cart/getCart',
    }),
    ...mapGetters({
      totalFish: 'cart/getTotalFish',
    }),
    subtotal() {
      return this.fishs
        .reduce((total, fish) => total + parseFloat(fish.price), 0)
        .toFixed(2)
    },
    currentDate() {
      let today = new Date() // Create a new Date object
      let day = today.getDate() // Get the day of the month (1-31)
      let month = today.getMonth() + 1 // Get the month (0-11), adding 1 to make it 1-12
      let year = today.getFullYear() // Get the full year (e.g. 2023)

      // Combine the day, month, and year into a string in the format "DD/MM/YYYY"
      let dateString = `${day}/${month}/${year}`

      return dateString
    },
  },
  methods: {
    ...mapMutations({
      removeFromCart: 'cart/removeFromCart',
    }),
    ...mapMutations({
      reset: 'cart/resetCart',
    }),
    removeFish(index) {
      this.removeFromCart(index)
    },
    resetCart() {
      this.reset()
    }, 
    deleteFish(fish) {
      const formData = new FormData()
      formData.append('name', fish.Name)
      formData.append('image', fish.Photo.src)
      formData.append('price', fish.Price)

      axios
        .post(
          'http://localhost/my-app/GetafishBack/delete_fish.php',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )

        .then((response) => {
          // handle response from server
          console.log(response.data)
          this.notif = true
          setTimeout(() => {
            this.notif = false
          }, 5000)

          if (response.data) {
            const selectedFish = {
              name: fish.Name,
              image: fish.Photo.src,
              price: fish.Price,
            }

            // Ajouter le poisson au panier en utilisant la méthode commit du store Vuex
            this.$store.commit('cart/deleteFromCart', selectedFish)
          }
        })
        .catch((error) => {
          // handle error
          console.log(error)
        })
    },
    completeOrder(cardName, cardNumber, cardMonth, cardYear, cardCvv) {
      this.cardName = cardName
      this.cardNumber = cardNumber
      this.cardMonth = cardMonth
      this.cardYear = cardYear
      this.cardCvv = cardCvv

      const formData = new FormData()
      // Informations de la commande
      this.fishs.forEach((fish, index) => {
        formData.append(`fishs[${index}][name]`, fish.name)
        formData.append(`fishs[${index}][image]`, fish.image)
        formData.append(`fishs[${index}][price]`, fish.price)
      })

      // ajouter d'autres informations au formulaire
      formData.append('subtotal', this.subtotal)
      formData.append('currentDate', this.currentDate)
      formData.append('fish_number', this.totalFish)
      formData.append('token', this.user.token)

      // Informations de la carte
      formData.append('cardName', this.cardName)
      formData.append('cardNumber', this.cardNumber)
      formData.append('cardMonth', this.cardMonth)
      formData.append('cardYear', this.cardYear)
      formData.append('cardCvv', this.cardCvv)

      // Vérifier que les champs sont remplis
      axios
        .post('http://localhost/my-app/GetafishBack/add_order.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // Afficher un message de succès
          this.successMessage = 'The order has been sent !'

          // Rediriger l'utilisateur vers la page d'accueil
          

          // Supprimer le message de succès après quelques secondes
          setTimeout(() => {
            this.step = 3
            this.resetCart()
          }, 5000)

          this.factureItems = this.$store.getters['cart/getCart'];
          this.factureTotalItems = this.$store.getters['cart/getTotalItems'];
          this.factureSubtotal = this.subtotal
           
          this.step = 2
          
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
.bg1 {
  background-image: url(~/assets/img/bg_collection.jpg);
  background-attachment: fixed;
}
</style>
