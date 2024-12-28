<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const { convertToFormkitDate, convertToFormkitTime } = useUnixtime()
  const { $dayjs } = useNuxtApp()

  //
  // initialize blank Add form
  //
  const state = {
    game_id: '0',
    opponent_id: '',
    referee: '',
    venue: 'Delaware Park',
    comment: '',
    date_ut: $dayjs().unix(),
    date: convertToFormkitDate($dayjs().unix()),
    time: convertToFormkitTime($dayjs().unix()),
    occasion: '',
    ptsFor: '',
    ptsAgn: '',
  }

  const players = []
  // initialize players - any new older games will have room for 23 players
  for (let i = 0; i < 23; i++) {
    players.push({
      position_id: i + 1,
      player_id: '',
      pname: '',
      pfn: '',
      pln: '',
      replaced_by: '0',
      rname: '',
      rfn: '',
      rln: '',
      tries: '0',
      assists: '0',
      conv: '0',
      penk: '0',
      dgoal: '0',
      yellow: '0',
      red: '0',
    })
  }

  //
  // Content form action
  //
  const { onSubmitAdd } = useSubmit()
  const onSubmit = async function (form_state) {
    await onSubmitAdd('game_player_stats', form_state)
    navigateTo(`/admin/game_player_stats`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add Game</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add Game" />
      </div>
      <game-form
        :players="players"
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
