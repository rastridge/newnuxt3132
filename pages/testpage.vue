<template>
  <div>
    <button @click="test2">sms test</button>
  </div>
</template>

<script setup>
  import twilio from 'twilio'
  const CONFIG = useRuntimeConfig()
  const client = twilio(CONFIG.TWILIO_ACCOUNT_SID, CONFIG.TWILIO_AUTH_TOKEN)

  // Ensure you have the environment variables set
  /*     if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.error(
      'TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set in environment variables.',
    )
    process.exit(1)
  }

  const CONFIG = useRuntimeConfig()

  const accountSid = CONFIG.TWILIO_ACCOUNT_SID
  const authToken = CONFIG.TWILIO_AUTH_TOKEN
  const client = twilio(accountSid, authToken) */

  /*   const test = async () => {
    // await useFetch('https://nuxt3.buffalorugby.org/twilio/sms', {
    await useFetch('/twilio/sms', {
      method: 'post',
      body: {
        to: '+17162758170',
        body: 'This is a test message from Nuxt 3',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  const test2 = async () => {
    console.log('handleSMS called in test2')
    console.log('accountSid:', accountSid)
    console.log('authToken:', authToken)
    // Send an SMS message
    const message = await client.messages.create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+17169954691',
      to: '+17162758170',
    })
  } */
</script>
