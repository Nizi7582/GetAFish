<template>
  <div class="card-form pt-20">
    <div class="card-list">
      <div class="card-item" :class="{ '-active': isCardFlipped }">
        <div class="card-item__side -front">
          <div
            ref="focusElement"
            class="card-item__focus"
            :class="{ '-active': focusElementStyle }"
            :style="focusElementStyle"
          ></div>
          <div class="card-item__cover">
            <img src="~/assets/img/bg_collection.jpg" class="card-item__bg" />
          </div>

          <div class="card-item__wrapper">
            <div class="card-item__top">
              <img
                src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png"
                class="card-item__chip"
              />
              <div class="card-item__type">
                <transition name="slide-fade-up">
                  <img
                    v-if="getCardType"
                    :key="getCardType"
                    :src="
                      'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                      getCardType +
                      '.png'
                    "
                    alt=""
                    class="card-item__typeImg"
                  />
                </transition>
              </div>
            </div>
            <label ref="cardNumber" for="cardNumber" class="card-item__number">
              <template v-if="getCardType === 'amex'">
                <span v-for="(n, $index) in amexCardMask" :key="$index">
                  <transition name="slide-fade-up">
                    <div
                      v-if="
                        $index > 4 &&
                        $index < 14 &&
                        cardNumber.length > $index &&
                        n.trim() !== ''
                      "
                      class="card-item__numberItem"
                    >
                      *
                    </div>
                    <div
                      v-else-if="cardNumber.length > $index"
                      :key="$index"
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                    >
                      {{ cardNumber[$index] }}
                    </div>
                    <div
                      v-else
                      :key="$index + 1"
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                    >
                      {{ n }}
                    </div>
                  </transition>
                </span>
              </template>

              <template v-else>
                <span v-for="(n, $index) in otherCardMask" :key="$index">
                  <transition name="slide-fade-up">
                    <div
                      v-if="
                        $index > 4 &&
                        $index < 15 &&
                        cardNumber.length > $index &&
                        n.trim() !== ''
                      "
                      class="card-item__numberItem"
                    >
                      *
                    </div>
                    <div
                      v-else-if="cardNumber.length > $index"
                      :key="$index"
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                    >
                      {{ cardNumber[$index] }}
                    </div>
                    <div
                      v-else
                      :key="$index + 1"
                      class="card-item__numberItem"
                      :class="{ '-active': n.trim() === '' }"
                    >
                      {{ n }}
                    </div>
                  </transition>
                </span>
              </template>
            </label>
            <div class="card-item__content">
              <label ref="cardName" for="cardName" class="card-item__info">
                <div class="card-item__holder">Titulaire de la carte</div>
                <transition name="slide-fade-up">
                  <div v-if="cardName.length" key="1" class="card-item__name">
                    <transition-group name="slide-fade-right">
                      <span
                        v-for="(n, $index) in carddata"
                        :key="$index + 1"
                        class="card-item__nameItem"
                        >{{ n }}</span
                      >
                    </transition-group>
                  </div>
                  <div v-else key="2" class="card-item__name">Nom complet</div>
                </transition>
              </label>
              <div ref="cardDate" class="card-item__date">
                <label for="cardMonth" class="card-item__dateTitle"
                  >Expires</label
                >
                <label for="cardMonth" class="card-item__dateItem">
                  <transition name="slide-fade-up">
                    <span v-if="cardMonth" :key="cardMonth">{{
                      cardMonth
                    }}</span>
                    <span v-else key="2">MM</span>
                  </transition>
                </label>
                /
                <label for="cardYear" class="card-item__dateItem">
                  <transition name="slide-fade-up">
                    <span v-if="cardYear" :key="cardYear">{{
                      String(cardYear).slice(2, 4)
                    }}</span>
                    <span v-else key="2">YY</span>
                  </transition>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="card-item__side -back">
          <div class="card-item__cover">
            <img src="~/assets/img/bg_collection.jpg" class="card-item__bg" />
          </div>
          <div class="card-item__band"></div>
          <div class="card-item__cvv">
            <div class="card-item__cvvTitle">CVV</div>
            <div class="card-item__cvvBand">
              <span v-for="(n, $index) in cardCvv" :key="$index"> * </span>
            </div>
            <div class="card-item__type">
              <img
                v-if="getCardType"
                :src="
                  'https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/' +
                  getCardType +
                  '.png'
                "
                class="card-item__typeImg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-form__inner">
      <div class="card-input">
        <label for="cardNumber" class="card-input__label"
          >Numéro de la carte</label
        > <!-- v-mask="generateCardNumberMask" -->
        <input
          id="cardNumber"
            v-model="cardNumber"
            type="tel"
            class="card-input__input"
            maxlength="19"
            @input="formatCardNumber"
            @blur="blurInput"
        />  
      </div>
      <div class="card-input">
        <label for="cardName" class="card-input__label">Nom sur la carte</label>
        <input
          id="cardName"
          v-model="cardName"
          type="text"
          class="card-input__input"
          data-ref="cardName"
          autocomplete="off"
          @focus="focusInput"
          @blur="blurInput"
        />
      </div>
      <div class="card-form__row">
        <div class="card-form__col">
          <div class="card-form__group">
            <label for="cardMonth" class="card-input__label"
              >Date d'expiration</label
            >
            <select
              id="cardMonth"
              v-model="cardMonth"
              class="card-input__input -select"
              data-ref="cardDate"
              @focus="focusInput"
              @blur="blurInput"
            >
              <option value="" disabled selected>Mois</option>
              <option
                v-for="n in 12"
                :key="n"
                :value="n < 10 ? '0' + n : n"
                :disabled="n < minCardMonth"
              >
                {{ n < 10 ? '0' + n : n }}
              </option>
            </select>
            <select
              id="cardYear"
              v-model="cardYear"
              class="card-input__input -select"
              data-ref="cardDate"
              @focus="focusInput"
              @blur="blurInput"
            >
              <option value="" disabled selected>Année</option>
              <option
                v-for="(n, $index) in 12"
                :key="n"
                :value="$index + minCardYear"
              >
                {{ $index + minCardYear }}
              </option>
            </select>
          </div>
        </div>
        <div class="card-form__col -cvv">
          <div class="card-input">
            <label for="cardCvv" class="card-input__label">CVV</label>
            <!-- v-mask="'####'" -->
            <input 
              id="cardCvv"
              v-model="cardCvv"
              
              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="4"
              type="number"
              class="card-input__input"
              autocomplete="off"
              @focus="flipCard(true)"
              @blur="flipCard(false)"
            />
          </div>
        </div>
      </div>

      <div v-if="!load" class="flex justify-center">
        <button
          class="w-full py-2 rounded-md text-gray-400 shadow-lg border"
          @click="Carte"
        >
          Payer par carte - {{ subtotal }}€
        </button>
      </div>
      <div v-else class="flex items-center justify-center">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-gray-400 bg-unsacpourtous-500 hover:bg-unsacpourtous-400 transition ease-in-out duration-150 cursor-not-allowed"
          disabled=""
        >
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>_
          Processing...
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'collection',
  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
      cardName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      minCardYear: new Date().getFullYear(),
      amexCardMask: '#### ###### #####',
      otherCardMask: '#### #### #### ####',
      cardNumberTemp: '',
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false,
      load: false,
      totalPrice: 0,
    }
  },
  computed: {
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
    carddata() {
      return this.cardName.replace(/\s\s+/g, ' ')
    },
    getCardType() {
      const number = this.cardNumber
      let re = /^4/
      if (number.match(re) != null) return 'visa'

      re = /^(34|37)/
      if (number.match(re) != null) return 'amex'

      re = /^5[1-5]/
      if (number.match(re) != null) return 'mastercard'

      re = /^6011/
      if (number.match(re) != null) return 'discover'

      re = /^9792/
      if (number.match(re) != null) return 'troy'

      return 'visa' // default type
    },
    generateCardNumberMask() {
      return this.getCardType === 'amex'
        ? this.amexCardMask
        : this.otherCardMask
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1
      return 1
    },
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = ''
      }
    },
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask
  },
  methods: {
    // eslint-disable-next-line require-await
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async Carte() {
      this.$emit('return', {
        cardName: this.cardName,
        cardNumber: this.cardNumber,
        cardMonth: this.cardMonth,
        cardYear: this.cardYear,
        cardCvv: this.cardCvv,
      })
      this.load = true
      await this.sleep(10000)
      this.load = false
    },
    async renvoyer(ev) {
      this.$emit('return', { method: ev })
      this.load = true
      await this.sleep(10000)
      this.load = false
    },
    flipCard(status) {
      this.isCardFlipped = status
    },
    focusInput(e) {
      this.isInputFocused = true
      const targetRef = e.target.dataset.ref
      const target = this.$refs[targetRef]
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
      }
      
    },
    blurInput() {
      const vm = this
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null
        }
      }, 300)
      vm.isInputFocused = false
    },
    formatCardNumber() {
      this.cardNumber = this.cardNumber.replace(/\D+/g, ''); // enlever tous les caractères non numériques
      this.cardNumber = this.cardNumber.replace(/(\d{4})/g, '$1 '); // ajouter un espace tous les 4 chiffres
      this.cardNumber = this.cardNumber.trim(); // enlever les espaces au début et à la fin de la chaîne
    },
  },
}
</script>

<style>
.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;
}
@media screen and (max-width: 576px) {
  .card-form {
    margin: 0 auto;
  }
}
.card-form__inner {
  background: #fff;
  box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
  border-radius: 10px;
  padding: 35px;
  padding-top: 180px;
}
@media screen and (max-width: 480px) {
  .card-form__inner {
    padding: 25px;
    padding-top: 165px;
  }
}
@media screen and (max-width: 360px) {
  .card-form__inner {
    padding: 15px;
    padding-top: 165px;
  }
}
.card-form__row {
  display: flex;
  align-items: flex-start;
}
@media screen and (max-width: 480px) {
  .card-form__row {
    flex-wrap: wrap;
  }
}
.card-form__col {
  flex: auto;
  margin-right: 35px;
}
.card-form__col:last-child {
  margin-right: 0;
}
@media screen and (max-width: 480px) {
  .card-form__col {
    margin-right: 0;
    flex: unset;
    width: 100%;
    margin-bottom: 20px;
  }
  .card-form__col:last-child {
    margin-bottom: 0;
  }
}
.card-form__col.-cvv {
  max-width: 150px;
}
@media screen and (max-width: 480px) {
  .card-form__col.-cvv {
    max-width: initial;
  }
}
.card-form__group {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
.card-form__group .card-input__input {
  flex: 1;
  margin-right: 15px;
}
.card-form__group .card-input__input:last-child {
  margin-right: 0;
}
.card-form__button {
  width: 100%;
  height: 55px;
  background: #2364d2;
  border: none;
  border-radius: 5px;
  font-size: 22px;
  font-weight: 500;
  font-family: 'Source Sans Pro', sans-serif;
  box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
  color: #fff;
  margin-top: 20px;
  cursor: pointer;
}
@media screen and (max-width: 480px) {
  .card-form__button {
    margin-top: 10px;
  }
}
.card-item {
  max-width: 430px;
  height: 270px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  z-index: 2;
  width: 100%;
}
@media screen and (max-width: 480px) {
  .card-item {
    max-width: 310px;
    height: 220px;
    width: 90%;
  }
}
@media screen and (max-width: 360px) {
  .card-item {
    height: 180px;
  }
}
.card-item.-active .card-item__side.-front {
  transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotateZ(0deg);
}
.card-item.-active .card-item__side.-back {
  transform: perspective(1000px) rotateY(0) rotateX(0deg) rotateZ(0deg);
}
.card-item__focus {
  position: absolute;
  z-index: 3;
  border-radius: 5px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all 0.35s cubic-bezier(0.71, 0.03, 0.56, 0.85);
  opacity: 0;
  pointer-events: none;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.65);
}
.card-item__focus:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #08142f;
  height: 100%;
  border-radius: 5px;
  filter: blur(25px);
  opacity: 0.5;
}
.card-item__focus.-active {
  opacity: 1;
}
.card-item__side {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
  transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
  transform-style: preserve-3d;
  transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
  backface-visibility: hidden;
  height: 100%;
}
.card-item__side.-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg);
  z-index: 2;
  padding: 0;
  height: 100%;
}
.card-item__side.-back .card-item__cover {
  transform: rotateY(-180deg);
}
.card-item__bg {
  max-width: 100%;
  display: block;
  max-height: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.card-item__cover {
  height: 100%;
  background-color: #1c1d27;
  position: absolute;
  height: 100%;
  background-color: #1c1d27;
  left: 0;
  top: 0;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
}
.card-item__cover:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(6, 2, 29, 0.45);
}
.card-item__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 40px;
  padding: 0 10px;
}
@media screen and (max-width: 480px) {
  .card-item__top {
    margin-bottom: 25px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__top {
    margin-bottom: 15px;
  }
}
.card-item__chip {
  width: 60px;
}
@media screen and (max-width: 480px) {
  .card-item__chip {
    width: 50px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__chip {
    width: 40px;
  }
}
.card-item__type {
  height: 45px;
  position: relative;
  display: flex;
  justify-content: flex-end;
  max-width: 100px;
  margin-left: auto;
  width: 100%;
}
@media screen and (max-width: 480px) {
  .card-item__type {
    height: 40px;
    max-width: 90px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__type {
    height: 30px;
  }
}
.card-item__typeImg {
  max-width: 100%;
  object-fit: contain;
  max-height: 100%;
  object-position: top right;
}
.card-item__info {
  color: #fff;
  width: 100%;
  max-width: calc(100% - 85px);
  padding: 10px 15px;
  font-weight: 500;
  display: block;
  cursor: pointer;
}
@media screen and (max-width: 480px) {
  .card-item__info {
    padding: 10px;
  }
}
.card-item__holder {
  opacity: 0.7;
  font-size: 13px;
  margin-bottom: 6px;
}
@media screen and (max-width: 480px) {
  .card-item__holder {
    font-size: 12px;
    margin-bottom: 5px;
  }
}
.card-item__wrapper {
  font-family: 'Source Code Pro', monospace;
  padding: 25px 15px;
  position: relative;
  z-index: 4;
  height: 100%;
  text-shadow: 7px 6px 10px rgba(14, 42, 90, 0.8);
  user-select: none;
}
@media screen and (max-width: 480px) {
  .card-item__wrapper {
    padding: 20px 10px;
  }
}
.card-item__name {
  font-size: 18px;
  line-height: 1;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
}
@media screen and (max-width: 480px) {
  .card-item__name {
    font-size: 16px;
  }
}
.card-item__nameItem {
  display: inline-block;
  min-width: 8px;
  position: relative;
}
.card-item__number {
  font-weight: 500;
  line-height: 1;
  color: #fff;
  font-size: 27px;
  margin-bottom: 35px;
  display: inline-block;
  padding: 10px 15px;
  cursor: pointer;
}
@media screen and (max-width: 480px) {
  .card-item__number {
    font-size: 21px;
    margin-bottom: 15px;
    padding: 10px 10px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__number {
    font-size: 19px;
    margin-bottom: 10px;
    padding: 10px 10px;
  }
}
.card-item__numberItem {
  width: 16px;
  display: inline-block;
}
.card-item__numberItem.-active {
  width: 30px;
}
@media screen and (max-width: 480px) {
  .card-item__numberItem {
    width: 13px;
  }
  .card-item__numberItem.-active {
    width: 16px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__numberItem {
    width: 12px;
  }
  .card-item__numberItem.-active {
    width: 8px;
  }
}
.card-item__content {
  color: #fff;
  display: flex;
  align-items: flex-start;
}
.card-item__date {
  flex-wrap: wrap;
  font-size: 18px;
  margin-left: auto;
  padding: 10px;
  display: inline-flex;
  width: 80px;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
}
@media screen and (max-width: 480px) {
  .card-item__date {
    font-size: 16px;
  }
}
.card-item__dateItem {
  position: relative;
}
.card-item__dateItem span {
  width: 22px;
  display: inline-block;
}
.card-item__dateTitle {
  opacity: 0.7;
  font-size: 13px;
  padding-bottom: 6px;
  width: 100%;
}
@media screen and (max-width: 480px) {
  .card-item__dateTitle {
    font-size: 12px;
    padding-bottom: 5px;
  }
}
.card-item__band {
  background: rgba(0, 0, 19, 0.8);
  width: 100%;
  height: 50px;
  margin-top: 30px;
  position: relative;
  z-index: 2;
}
@media screen and (max-width: 480px) {
  .card-item__band {
    margin-top: 20px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__band {
    height: 40px;
    margin-top: 10px;
  }
}
.card-item__cvv {
  text-align: right;
  position: relative;
  z-index: 2;
  padding: 15px;
}
.card-item__cvv .card-item__type {
  opacity: 0.7;
}
@media screen and (max-width: 360px) {
  .card-item__cvv {
    padding: 10px 15px;
  }
}
.card-item__cvvTitle {
  padding-right: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 5px;
}
.card-item__cvvBand {
  height: 45px;
  background: #fff;
  margin-bottom: 30px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  color: #1a3b5d;
  font-size: 18px;
  border-radius: 4px;
  box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);
}
@media screen and (max-width: 480px) {
  .card-item__cvvBand {
    height: 40px;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 360px) {
  .card-item__cvvBand {
    margin-bottom: 15px;
  }
}
.card-list {
  margin-bottom: -130px;
}
@media screen and (max-width: 480px) {
  .card-list {
    margin-bottom: -120px;
  }
}
.card-input {
  margin-bottom: 20px;
}
.card-input__label {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: 500;
  color: #1a3b5d;
  width: 100%;
  display: block;
  user-select: none;
}
.card-input__input {
  width: 100%;
  height: 50px;
  border-radius: 5px;
  box-shadow: none;
  border: 1px solid #ced6e0;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  padding: 5px 15px;
  background: none;
  color: #1a3b5d;
  font-family: 'Source Sans Pro', sans-serif;
}
.card-input__input:hover,
.card-input__input:focus {
  border-color: #3d9cff;
}
.card-input__input:focus {
  box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
}
.card-input__input.-select {
  -webkit-appearance: none;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAeCAYAAABuUU38AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAUxJREFUeNrM1sEJwkAQBdCsngXPHsQO9O5FS7AAMVYgdqAd2IGCDWgFnryLFQiCZ8EGnJUNimiyM/tnk4HNEAg/8y6ZmMRVqz9eUJvRaSbvutCZ347bXVJy/ZnvTmdJ862Me+hAbZCTs6GHpyUi1tTSvPnqTpoWZPUa7W7ncT3vK4h4zVejy8QzM3WhVUO8ykI6jOxoGA4ig3BLHcNFSCGqGAkig2yqgpEiMsjSfY9LxYQg7L6r0X6wS29YJiYQYecemY+wHrXD1+bklGhpAhBDeu/JfIVGxaAQ9sb8CI+CQSJ+QmJg0Ii/EE2MBiIXooHRQhRCkBhNhBcEhLkwf05ZCG8ICCOpk0MULmvDSY2M8UawIRExLIQIEgHDRoghihgRIgiigBEjgiFATBACAgFgghEwSAAGgoBCBBgYAg5hYKAIFYgHBo6w9RRgAFfy160QuV8NAAAAAElFTkSuQmCC');
  background-size: 12px;
  background-position: 90% center;
  background-repeat: no-repeat;
  padding-right: 30px;
}
.slide-fade-up-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-up-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-up-enter {
  opacity: 0;
  transform: translateY(15px);
  pointer-events: none;
}
.slide-fade-up-leave-to {
  opacity: 0;
  transform: translateY(-15px);
  pointer-events: none;
}
.slide-fade-right-enter-active {
  transition: all 0.25s ease-in-out;
  transition-delay: 0.1s;
  position: relative;
}
.slide-fade-right-leave-active {
  transition: all 0.25s ease-in-out;
  position: absolute;
}
.slide-fade-right-enter {
  opacity: 0;
  transform: translateX(10px) rotate(45deg);
  pointer-events: none;
}
.slide-fade-right-leave-to {
  opacity: 0;
  transform: translateX(-10px) rotate(45deg);
  pointer-events: none;
}
.github-btn {
  position: absolute;
  right: 40px;
  bottom: 50px;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
  background: #24292e;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  text-align: center;
  transition: all 0.3s ease-in-out;
}
@media screen and (min-width: 500px) {
  .github-btn:hover {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
}
@media screen and (max-width: 700px) {
  .github-btn {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;
  }
  .github-btn:active {
    transform: scale(1.1);
    box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
  }
  .bg1 {
    background-image: url(~/assets/img/bg_collection.jpg);
    background-attachment: fixed;
  }
}
</style>
