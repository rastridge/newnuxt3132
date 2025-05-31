// import { useAuthStore } from '~/stores/authStore'

export default function useGametypes() {
  //
  // get member types
  async function getGameTypeOptions() {
    const { data } = await useFetch(
      `https://nuxt3.buffalorugby.org/game_player_stats/gametypes`,
      {
        method: 'get',
      },
    )
    // console.log('game types', data.value)

    // convert for formkit
    let result = []
    data.value.map((old) => {
      let n = {}
      n.label = old.game_type
      n.value = old.game_type_id
      result.push(n)
    })
    return result
  }

  return {
    getGameTypeOptions,
  }
}
