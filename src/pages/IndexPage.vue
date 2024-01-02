<template>
  <div class="row justify-center">
    <q-page class="col-lg-8 col-sm-10 col-xs q-pa-xs">

      <div class="col">
        <div class="text-subtitle1 ">
          🤔 Jak Ci się podobało?:
        </div>
        <div class="q-gutter-sm q-pa-lg">
          <q-btn :color="rating === 4 ? 'primary':'grey'" :disable="rating!==null" :flat="rating !== 4" no-caps
                 size="lg"
                 @click="rating=4">❤️
          </q-btn>
          <q-btn :color="rating === 3 ? 'primary':'grey'" :disable="rating!==null" :flat="rating !== 3" no-caps
                 size="lg"
                 @click="rating=3">👍
          </q-btn>
          <q-btn :color="rating === 2 ? 'primary':'grey'" :disable="rating!==null" :flat="rating !== 2" no-caps
                 size="lg"
                 @click="rating=2">😥
          </q-btn>
          <q-btn :color="rating === 1 ? 'primary':'grey'" :disable="rating!==null" :flat="rating !== 1" no-caps
                 size="lg"
                 @click="rating=1">😩
          </q-btn>
        </div>
        <div>
          <div v-if="rating && rating > 2">
            <div>Super ❤️</div>
            <q-btn color="primary" outline @click="redirect">&nbsp; Podziel się opinią</q-btn>
          </div>

          <div v-if="rating && rating <3">
            <div>Napisz co powinniśmy zmienić:</div>
            <div class="q-pa-md">
              <q-input
                v-model="text"
                filled
                type="textarea"
              />
            </div>
            <q-btn color="red-14">Wyślij</q-btn>
          </div>

        </div>
      </div>

    </q-page>
  </div>
</template>

<script setup>
import {ref} from "vue";

const rating = ref(null)
const text = ref(null)

function redirect() {
  window.location.href = process.env.VUE_REMOTE_URL
}
</script>
