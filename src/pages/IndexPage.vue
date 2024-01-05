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


          <q-btn color="red-14" @click="o()">Test WEBHOOK 1</q-btn>
          <q-btn color="red-14" @click="wh()">Test WEBHOOK 2</q-btn>


        </div>
      </div>

    </q-page>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {discord} from "boot/axios";

const rating = ref(null)
const text = ref(null)

function redirect() {
  window.location.href = process.env.VUE_REMOTE_URL
}

function isValidDiscordWebhookUrl(discordWebhookUrl) {
  return discordWebhookUrl ? discordWebhookUrl.startsWith('https://discord.com/api/webhooks/') : null;
}

function webhookNotification() {
  console.log("submit")

  discord_message(process.env.VUE_SENTRY_DSN, "aaaa")
}


function wh(){

  let data = JSON.stringify({
    "content": "Your message here"
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: process.env.VUE_WEBHOOK_DISCORD,
    headers: {
      'Content-Type': 'application/json',
    },
    data : data
  };

  discord.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}


function o(){

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "content": "Your message here"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch(process.env.VUE_WEBHOOK_DISCORD, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


</script>
