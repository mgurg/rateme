<template>
  <div class="col-12 col-md row justify-center q-gutter-sm q-py-sm">
    <div
      class="text-center full-width text-size-24 text-weight-bolder letter-spacing-450 text-brand-primary text-uppercase">
      Jak Ci się podobało?
    </div>
    <q-card v-for="(entry, index) in components" :key="index"
            class="page-docs__card column justify-center items-center cursor-pointer"
            flat
            @click="submitRating(entry.name)"
    >
      <q-icon
        :color="entry.color"
        :name="entry.icon"
        class="q-mb-sm"
      />
      <!--      <div class="page-docs__card-label text-center text-size-12 letter-spacing-100">-->
      <!--        {{ entry.label }}-->
      <!--      </div>-->
    </q-card>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const emit = defineEmits(['ratingSet'])

const components = ref([
  {name: '4', icon: 'img:/icons/icons8-heart-balloon-80.png', label: 'QTable', color: "red-9"},
  {name: '3', icon: 'thumb_up', label: 'QInput', color: "amber-9"},
  // {link: '/vue-components/select', icon: 'sentiment_neutral', label: 'QSelect', color: "warning"},
  {name: '2', icon: 'sentiment_dissatisfied', label: 'QBtn', color: "blue-grey-9"},
  {name: '1', icon: 'sentiment_very_dissatisfied', label: 'QCard', color: "cyan-9"},
]);

function submitRating(name){
  emit('ratingSet',  {value: name})
}
</script>

<style lang="sass">
.page-docs

  &__text
    max-width: 500px

  &__card
    width: 100px
    height: 100px
    border: solid 1px rgba(#475D66, 0.54)
    border-radius: 8px
    //transition: transform $header-quick-transition, box-shadow $header-quick-transition



    &:hover
      // !important needed when used with flat cards
      box-shadow: 0 8px 8px 0 rgba($dark, 0.2) !important
      transform: scale(1.03)

    .q-icon
      font-size: 36px


</style>
