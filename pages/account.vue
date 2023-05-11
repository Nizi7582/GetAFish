<template>
  <div class="min-h-screen flex items-center justify-center px-4 bg1">
    <div
      class="max-w-7xl bg-white border border-gray-400 w-full rounded-lg shadow-xl"
    >
      <div class="p-4 rounded-t-lg border-b">
        <h2 class="text-2xl font-semibold">Account information</h2>
        <p class="text-sm text-gray-500">Personal details.</p>
      </div>
      <div>
        <div
          class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
        >
          <p class="text-gray-600">Full name</p>
          <p>{{ user.name }}</p>
        </div>

        <!--<div
          class="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b"
        >
          <p class="text-gray-600">Total orders</p>
          <p>{{ }}</p>
        </div> -->
        <div
          class="hover:bg-gray-50 rounded-b-lg md:space-y-0 space-y-1 p-4"
        >
          <button class="flex justify-end" @click="deleteUser()">
            <div class="flex items-center bg-red-600 px-4 py-2 gap-x-2 border border-gray-900 font-semibold">
              Disconnect
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
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'collection',
  data() {
    return {
      email: '',
      name: '',
      error: false,
      success: false,
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser',
    }),
  },
  methods: {
    ...mapMutations({
      delete: 'user/deleteUser',
    }),
    deleteUser() {
      this.delete()
      this.$router.push('/')
    },
  }
}
</script>

<style>
.bg1 {
  background-image: url(~/assets/img/bg_collection.jpg);
  background-attachment: fixed;
}
</style>
