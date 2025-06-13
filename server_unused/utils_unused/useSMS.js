import twilio from 'twilio'
const CONFIG = useRuntimeConfig()
const client = twilio(CONFIG.TWILIO_ACCOUNT_SID, CONFIG.TWILIO_AUTH_TOKEN)

export default function useSMS() {
  function sendOneSMS(recipient, sms_body_text) {
    console.log(
      'TWILIO_ACCOUNT_SID = ',
      CONFIG.TWILIO_ACCOUNT_SID,
      '\nTWILIO_AUTH	= ',
      CONFIG.TWILIO_AUTH_TOKEN,
      '\nTWILIO_NUMBER = ',
      CONFIG.TWILIO_NUMBER,
    )

    console.log('Twilio client  = ', client)
    client.messages

      .create({
        from: CONFIG.TWILIO_NUMBER,
        to: recipient.account_addr_phone,
        body: sms_body_text,
        // statusCallback: `/sms/MessageStatus`,
      })
      .then((message) => console.log('message.status = ', message.status))
      .catch((err) => console.log(err))
  }
  return {
    sendOneSMS,
  }
}
