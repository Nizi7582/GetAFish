<template>
  <nav
    class="relative z-10 w-full bg-white dark:bg-transparent md:absolute md:bg-transparent"
  >
    <div class="container m-auto px-2 md:px-12 lg:px-7">
      <div
        class="flex items-center justify-between py-3 gap-6 md:py-4 md:gap-0"
      >
        <div class="px-6 z-30">
          <nuxt-link to="/" aria-label="logo" class="flex items-center">
            <img
              src="~/assets/img/fish.svg"
              class="w-12 mr-2"
              alt="WifiFish logo"
              width="144"
              height="133"
            />
            <span
              class="text-4xl font-bold text-yellow-900 dark:text-white police"
              >Get<span class="text-blue-500 dark:text-blue-300">A</span
              >Fish</span
            >
          </nuxt-link>

          <div class="flex items-center lg:hidden max-h-10">
            <label
              role="button"
              for="toggle_nav"
              aria-label="humburger"
              id="hamburger"
              class="relative w-10 h-auto p-2"
            >
              <div
                id="line"
                class="m-auto h-0.5 w-6 rounded bg-yellow-900 dark:bg-white transition duration-300"
              ></div>
              <div
                id="line2"
                class="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900 dark:bg-white transition duration-300"
              ></div>
            </label>
          </div>
        </div>
        <div class="w-full flex items-center justify-center"></div>
        <div
          v-if="!user.online"
          class="hidden w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-white dark:bg-blue-900 lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent"
        >
          <div
            class="w-full min-w-max space-y-2 border-yellow-200 lg:space-y-0 sm:w-max lg:border-l dark:lg:border-blue-700"
          >
            <nuxt-link to="/register">
              <button
                type="button"
                title="Start buying"
                class="w-full py-3 px-6 text-center rounded-full transition sm:w-max"
              >
                <span
                  class="block text-yellow-800 dark:text-white font-semibold text-sm"
                >
                  Sign up
                </span>
              </button>
            </nuxt-link>

            <nuxt-link to="/login">
              <button
                type="button"
                title="Start buying"
                class="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
              >
                <span class="block text-yellow-900 font-semibold text-sm">
                  Login
                </span>
              </button>
            </nuxt-link>
          </div>
        </div>
        <div v-else class="w-full flex text-xl justify-end px-4 items-center">
          <div class="flex items-center">
            <nuxt-link to="/account" class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-8 h-8 text-yellow-800"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <span class="uppercase font-bold text-yellow-700 pl-2 pr-8">
                {{ user.name }}
              </span>
            </nuxt-link>
            <nuxt-link to="/cart" class="flex flex-row cursor-pointer truncate p-2 pr-3 rounded">
              <div class="flex flex-row-reverse w-full text-yellow-800">
                <div slot="icon" class="relative">
                  <div
                    class="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white"
                  >
                    {{ cart }}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-shopping-cart w-7 h-7"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path
                      d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                    ></path>
                  </svg>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
    ...mapGetters({
      cart: 'cart/getTotalFish',
    }),
  },
}
</script>
