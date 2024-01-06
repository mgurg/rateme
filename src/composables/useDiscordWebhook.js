import {ref} from 'vue';
import axios from 'axios';

export async function useDiscordWebhook(message) {
  const error = ref(null);
  const response = ref(null);

  try {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: process.env.VUE_WEBHOOK_DISCORD,
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        content: message
      })
    };

    const res = await axios.request(config);
    response.value = res.data;
  } catch (err) {
    error.value = err;
  }

  function isValidDiscordWebhookUrl(discordWebhookUrl) {
    return discordWebhookUrl ? discordWebhookUrl.startsWith('https://discord.com/api/webhooks/') : null;
  }

  return {
    response,
    error
  };
}
