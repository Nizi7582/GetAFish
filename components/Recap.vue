<template>
  <div>
    <div class="pb-14 pt-24 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto ">
    <div class="flex justify-center items-center space-y-2 flex-col">
      <h1 class="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Order #13432</h1>
      <p class="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">21st Mart 2021 at 10:34 PM</p>
    </div>
    <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
      <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
        <div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full overflow-y-scroll h-custom">
          <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full" v-for="(fish, index) in fishs" :key="index">
            <div class="pb-4 md:pb-8 w-full md:w-40">
              <img class="w-full hidden md:block" :src="fish.image" alt="fish" />
              <img class="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
            </div>
            <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
              <div class="w-full flex flex-col justify-start items-start space-y-8">
                <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{{ fish.name }}</h3>
              </div>
              <div class="flex justify-end space-x-8 items-start w-full">
                <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">${{ fish.price }}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
        <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
        <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
          <div class="flex flex-col justify-start items-start flex-shrink-0">
            <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-16 h-16 text-gray-800"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              <div class="flex justify-start items-start flex-col space-y-2">
                <p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800 uppercase">{{ user.name }}</p>
              </div>
            </div>

            <div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p class="cursor-pointer text-sm leading-5 ">{{ user.email }}</p>
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
          <div class="flex flex-col  w-full bg-gray-50 dark:bg-gray-800 space-y-6">
            <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
            <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
              <div class="flex justify-between items-center w-full">
                <p class="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                <p class="text-base dark:text-gray-300 leading-4 text-gray-600">${{ subtotal }}</p>
              </div>
              <div class="flex justify-between items-center w-full">
                <p class="text-base dark:text-white leading-4 text-gray-800">Promo code</p>
                <p class="text-base dark:text-gray-300 leading-4 text-gray-600">$0.00</p>
              </div>
            </div>
            <div class="flex justify-between items-center w-full">
              <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
              <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">${{ subtotal }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    fishs: {
      type: Array,
      required: true,
    },
    totalFish: {
      type: Number,
      required: true,
    },
    currentDate: {
      type: String,
      required: true,
    },
    subtotal: {
      type: String,
      required: true,
    },
  },
}
</script>
