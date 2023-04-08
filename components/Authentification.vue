<template>
  <nav
    class="fixed z-10 w-full bg-white dark:bg-transparent md:absolute md:bg-transparent"
  >
    <div class="container m-auto px-2 md:px-12 lg:px-7">
      <div
        class="flex items-center justify-center py-3 gap-6 md:py-4 md:gap-0"
      >
        <div class="w-full px-6 z-30">
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
      </div>
    </div>
  </nav>
</template>

