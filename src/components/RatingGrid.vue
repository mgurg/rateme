<template>
  <div class="col-12 col-md row justify-center q-gutter-sm q-py-sm">
    <div
      class="text-center full-width text-size-24 text-weight-bolder letter-spacing-450 text-brand-primary text-uppercase">
      Jak Ci się podobała zabawa?
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
            <div class="page-docs__card-label text-center text-size-12 letter-spacing-100">
              {{ entry.label }}
            </div>
    </q-card>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const emit = defineEmits(['ratingSet'])

//  https://www.iconfinder.com/iconsets/remoji-soft-1
const components = ref([
  {name: '6', icon: 'img:/emoji/8708745_emoji_love_eyes_icon.png', label: 'Uwielbiam', color: "red-9"},
  {name: '5', icon: 'img:/emoji/8708731_emoji_cool_thumbs_up_sunglasses_icon.png', label: 'Super', color: "amber-9"},
  {name: '4', icon: 'img:/emoji/8708791_emoji_smile_confident_happy_icon.png', label: 'Dobrze', color: "blue-grey-9"},
  {name: '3', icon: 'img:/emoji/8708760_emoji_frown_unhappy_mad_icon.png', label: 'Źle', color: "cyan-9"},
  {name: '2', icon: 'img:/emoji/8708771_emoji_vomit_sick_barf_icon.png', label: 'Nieprzyjemnie', color: "cyan-9"},
  {name: '1', icon: 'img:/emoji/8708776_emoji_swearing_mad_icon.png', label: 'Popsute', color: "cyan-9"},
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
    transition: transform .28s ease-in-out, box-shadow .28s ease-in-out



    &:hover
      // !important needed when used with flat cards
      box-shadow: 0 8px 8px 0 rgba($dark, 0.2) !important
      transform: scale(1.03)

    .q-icon
      font-size: 36px


</style>
