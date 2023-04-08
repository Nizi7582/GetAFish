export default {
  addToCart (state, object) {
    state.fish.push(object)
  },
  removeFromCart(state, index) {
    state.fish.splice(index, 1)
  },
  resetCart(state) {
    state.fish = []
  }
}
