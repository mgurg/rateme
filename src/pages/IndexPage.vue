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


          <q-btn color="red-14" @click="sendToDiscord('sss')">Test WEBHOOK 1</q-btn>
          <q-btn color="red-14" @click="webhookNotification">Test WEBHOOK 2</q-btn>
          <q-btn color="red-14" @click="sendDiscordNotification">Test WEBHOOK 3</q-btn>

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

function isValidDiscordWebhookUrl(discordWebhookUrl) {
  return discordWebhookUrl ? discordWebhookUrl.startsWith('https://discord.com/api/webhooks/') : null;
}

function webhookNotification() {
  console.log("submit")

  discord_message(process.env.VUE_SENTRY_DSN, "aaaa")
}

function discord_message(webHookURL, message) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", webHookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    'content': message,
    'username': 'Frieren',
  }));
}

const sendToDiscord = async (message) => {

  const discordWebhookURL = process.env.VUE_SENTRY_DSN;

  const data = {
    content: message,
  };

  try {
    const response = await fetch(discordWebhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("OK Discord");
    } else {
      console.error("NOK Discord");
    }
  } catch (error) {
    console.error("Discord:", error);
  }
};

const sendDiscordNotification = async () => {
  const webhookUrl = process.env.VUE_SENTRY_DSN; // Replace this with your Discord webhook URL

  const message = {
    content: 'Your notification message here',
    username: 'Your Bot Name', // Optional: Customize the bot username
    // avatar_url: 'URL_TO_BOT_AVATAR', // Optional: Provide an avatar for the bot
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Notification sent successfully:', responseData);
      // Handle success, if needed
    } else {
      throw new Error('Failed to send notification');
    }
  } catch (error) {
    console.error('Error sending notification:', error);
    // Handle error, if needed
  }
};

</script>
