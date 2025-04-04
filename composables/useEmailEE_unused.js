import ElasticEmail from '@elasticemail/elasticemail-client'

export default function useEmailEE() {
  const CONFIG = useRuntimeConfig()

  function getStatusEmailEE(transaction) {
    const callback = (error, data, response) => {
      if (error) {
        console.error(error)
      } else {
        console.log('response.res.statusMessage = ', response.res.statusMessage)
      }
    }

    const defaultClient = ElasticEmail.ApiClient.instance
    const apikey = defaultClient.authentications['apikey']
    apikey.apiKey = CONFIG.EE_API_KEY

    const statsApi = new ElasticEmail.EmailsApi()

    statsApi.emailsByTransactionidStatusGet(transaction, callback)
  }

  return {
    getStatusEmailEE,
  }
}
