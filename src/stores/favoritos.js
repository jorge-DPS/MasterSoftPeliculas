import { ref, computed } from "vue";
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', () => {
//   const contador = ref(0)
//   const incrementar = () => {
//     contador.value++
//   }

//   const favoritos = (p = 'hola') => {
//   }

//   return {contador, incrementar}

// })

export const useDataStore = defineStore('data', {
  state: () => ({
    myObject: null,
  }),
  getters: {
    getMyObject() {
      return this.myObject;
    },
  },
  actions: {
    setMyObject(value) {
      this.myObject = value;
    },
  },
});