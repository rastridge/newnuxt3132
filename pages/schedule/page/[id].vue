<template>
  <div class="stats">
    <Head>
      <Title>Buffalo Rugby Club {{ game.opponent_name }}</Title>
    </Head>

    <div class="my-simple-card-style">
      <!-- 			<div class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3 bg-blue-600 text-white">
 -->
      <div class="my-text-style m-1 p-2 md:m-2 md:p-3 text-black">
        <Common-header :title="game.opponent_name" />
        <display-game-info :item="game" />
        <display-roster :players="players" />
      </div>
    </div>
  </div>
</template>

<script setup>
  //
  // Get account id to edit
  //
  const route = useRoute()
  const id = route.params.id

  const players = ref([])
  const game = ref({})

  const getPlayers = async (id) => {
    const url = `/game_player_stats/players/${id}`
    const { data } = await useFetch(url, {
      method: 'get',
    })
    return data.value
  }

  const getOne = async (id) => {
    const url = `/game_player_stats/${id}`
    const { data } = await useFetch(url, {
      method: 'get',
    })
    return data.value
  }

  game.value = await getOne(id) // get game info
  players.value = await getPlayers(id) // get game info for players
</script>
