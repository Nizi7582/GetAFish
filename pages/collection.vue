<template>
  <div class="bg1">
    <div class="flex items-center">
      <section class="w-full py-10">
        <div class="container mx-auto text-center text-yellow-800">
          <h1 class="text-7xl font-bold mb-6 police">Collection</h1>
          <p class="text-2xl">
            Browse around the vast diversity of fish that we can get for you !
          </p>
        </div>
      </section>
    </div>
    <section class="z-10">
      <div class="container mx-auto">
        <div class="lg:flex">
          <div class="w-full lg:w-2/3 bg-white border-r">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
              <article
                class="relative border group"
                v-for="(fish, index) in fishs"
                :key="index"
              >
                <div class="">
                  <img class="h-40 w-full object-cover" :src="fish.Photo.src" />
                  <div
                    v-if="user.online"
                    class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <button
                      @click="addFish(fish)"
                      class="bg-green-700 px-5 py-2 font-semibold border border-gray-300 text-white"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div class="flex items-start justify-between px-3 py-2">
                  <div class="">
                    <h3 class="text-xs font-semibold sm:text-sm md:text-base">
                      <a href="#" title="" class="">
                        {{ fish.Name }}
                        <span class="absolute" aria-hidden="true"></span>
                      </a>
                    </h3>
                  </div>

                  <div class="text-right">
                    <p class="text-xs font-normal sm:text-sm md:text-base">
                      ${{ fish.Price }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div
            class="min-h-screen h-full bg-gray-100 lg:w-1/3 text-gray-800 sticky top-0"
          >
            <div class="w-full flex flex-col">
              <div class="py-12 bg-blue-100">
                <h2
                  class="text-2xl font-bold text-center leading-tight text-yellow-800 uppercase"
                >
                  Search Species
                </h2>
              </div>

              <div class="flex items-center p-12">
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
                    v-model="searchTerm"
                    @click="Dropdown()"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                  />
                  <ul v-if="dropdown" class="bg-white divide-y absolute">
                    <a
                      :href="'#' + fish.id"
                      v-for="fish in filteredFish"
                      :key="fish.id"
                      class="p-3 flex items-center space-x-4 rounded-md text-base leading-6 font-medium text-gray-900 bg-white hover:bg-gray-100 transition ease-in-out duration-150 cursor-pointer"
                    >
                      {{ fish.Name }}
                    </a>
                  </ul>
                </div>
              </div>
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
import { mapGetters } from 'vuex'
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
      notif: false,
      dropdown: false,
      searchTerm: '',
    }
  },
  computed: {
    filteredFish() {
      // Filtrer les poissons en fonction du terme de recherche
      return this.fishs.filter((fish) =>
        fish.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    },
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  methods: {
    addFish(fish) {
      const selectedFish = {
        name: fish.Name,
        image: fish.Photo.src,
        price: fish.Price,
      }

      // Ajouter le poisson au panier en utilisant la méthode commit du store Vuex
      this.$store.commit('cart/addToCart', selectedFish)
      this.notif = true
      setTimeout(() => {
        this.notif = false
      }, 5000)
    },
    Dropdown() {
      this.dropdown = !this.dropdown
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
