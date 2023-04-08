<template>
  <div class="bg1">
    <div class="flex items-center">
      <section class="w-full py-32">
        <div class="container mx-auto text-center text-yellow-800">
          <h1 class="text-7xl font-bold mb-6 police">Collection</h1>
          <p class="text-2xl mb-12">
            Browse around the vast diversity of fish that we can get for you !
          </p>
        </div>
      </section>
    </div>
    <section class="z-10">
      <div class="container px-6 mx-auto">
        <div class="lg:flex">
          <div
            class="w-full p-12 lg:w-2/3 bg-white rounded-tl-2xl border-r space-y-16"
          >
            <div
              v-for="(fishs, index) in paginatedFish"
              :key="index"
              class="space-y-2"
            >
              <div>
                <h1
                  class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"
                >
                  {{ fishs.name }}
                </h1>

                <div class="">
                  <span
                    class="inline-block w-40 h-1 rounded-full bg-blue-500"
                  ></span>
                  <span
                    class="inline-block w-3 h-1 ml-1 rounded-full bg-blue-500"
                  ></span>
                  <span
                    class="inline-block w-1 h-1 ml-1 rounded-full bg-blue-500"
                  ></span>
                </div>
              </div>

              <div class="md:flex md:items-center md:-mx-4 pt-1">
                <span
                  class="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500"
                >
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
                      d="M14.25 7.756a4.5 4.5 0 100 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>

                <div class="md:mx-4 flex">
                  <h1
                    class="text-xl font-semibold text-gray-700 capitalize dark:text-white"
                  >
                    {{ fishs.price }}.99 €
                  </h1>
                </div>
              </div>

              <div class="md:flex md:items-start md:-mx-4">
                <span
                  class="inline-block p-2 text-blue-500 bg-blue-100 rounded-xl md:mx-4 dark:text-white dark:bg-blue-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </span>

                <div class="mt-4 md:mx-4 md:mt-0">
                  <h1
                    class="text-xl font-semibold text-gray-700 capitalize dark:text-white"
                  >
                    {{ fishs.scientific_name }}
                  </h1>
                </div>
              </div>

              <div class="pt-3">
                <button
                  @click="addFish(fishs)"
                  class="relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-gray-500 transition-all duration-500 border-2 border-blue-200 rounded-md cursor-pointer group ease bg-gradient-to-b from-white to-gray-50 hover:from-gray-50 hover:to-white active:to-white"
                >
                  <span
                    class="w-full h-0.5 absolute bottom-0 group-active:bg-transparent left-0 bg-gray-100"
                  ></span>
                  <span
                    class="h-full w-0.5 absolute bottom-0 group-active:bg-transparent right-0 bg-gray-100"
                  ></span>
                  Add to cart
                </button>
              </div>
            </div>
            <div>
              <button @click="previousPage" :disabled="currentPage === 1">
                Previous
              </button>
              <span>{{ currentPage }}</span>
              <button @click="nextPage" :disabled="currentPage === pageCount">
                Next
              </button>
            </div>
          </div>

          <div
            class="min-h-screen h-full bg-gray-100 lg:w-1/3 text-gray-800 rounded-tr-2xl sticky top-0"
          >
            <div class="w-full flex flex-col">
              <div class="py-12 bg-blue-100 rounded-tr-2xl">
                <h2
                  class="text-2xl font-bold text-center leading-tight text-yellow-800 uppercase"
                >
                  Search Species
                </h2>
              </div>

              <form class="flex items-center p-12">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                </div>
              </form>
              <div class="p-10">
                <img src="~/assets/img/fish_collection.svg" class="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <SuccessPopup v-if="notif === true" @close="notif = false" />
  </div>
</template>

<script>
import axios from 'axios'
import fishData from '~/components/model/fish.json'
import SuccessPopup from '~/components/popup/alert.vue'

export default {
  components: {
    SuccessPopup,
  },
  layout: 'collection',
  data() {
    return {
      fishs: fishData,
      currentPage: 1,
      pageSize: 10,
      notif: false,
    }
  },
  computed: {
    paginatedFish() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.fishs.slice(startIndex, endIndex)
    },
    pageCount() {
      return Math.ceil(this.fishs.length / this.pageSize)
    },
  },
  methods: {
    addFish(fish) {
      const formData = new FormData()
      formData.append('name', fish.name)
      formData.append('price', fish.price)

      axios
        .post('http://localhost/my-app/GetafishBack/add_fish.php', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        .then((response) => {
          // handle response from server
          console.log(response.data)
          this.notif = true
          setTimeout(() => {
            this.notif = false
          }, 5000)

          if (response.data) {
            const selectedFish = {
              name: fish.name,
              price: fish.price
            }

            // Ajouter le poisson au panier en utilisant la méthode commit du store Vuex
            this.$store.commit('cart/addToCart', selectedFish)
            /* this.$store.commit('cart/addFish', {
              name: fish.name,
              price: fish.price,
              token: fish.token,
            }) */
          }
        })
        .catch((error) => {
          // handle error
          console.log(error)
        })
    },
    nextPage() {
      this.currentPage++
    },
    previousPage() {
      this.currentPage--
    },
  },
}
</script>

<style>
.bg1 {
  background-image: url(~/assets/img/bg_collection.jpg);
  background-attachment: fixed;
}
#water #waveShape {
  animation-name: waveAction01;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-duration: 2s;
}

@keyframes waveAction01 {
  0% {
    transform: translate(300px, -1830px);
  }
  100% {
    transform: translate(102px, -1830px);
  }
}
</style>
