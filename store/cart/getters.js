export default {
  getCart (state) {
    return state.fish
  },
  getTotalFish(state) {
    return state.fish.length;
  }
}
