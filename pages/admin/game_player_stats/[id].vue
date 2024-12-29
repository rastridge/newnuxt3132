<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })

  //
  // Get content item id
  //
  const route = useRoute()
  const id = route.params.id

  //
  // Initialize Edit form game info area
  //
  const { data: state } = await useFetch(`/game_player_stats/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  // convert date and time from unix time for FormKit inputs
  // for a day when date / time fields are dropped from the DB
  const { convertToFormkitDate, convertToFormkitTime } = useUnixtime()

  state.value.date = convertToFormkitDate(state.value.date_ut)
  state.value.time = convertToFormkitTime(state.value.date_ut)

  //
  // Initialize Edit form Players area
  //
  const { data: players } = await useFetch(`/game_player_stats/players/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // content form action
  //
  const { onSubmitEdit } = useSubmit()

  const onSubmit = async function (form_state) {
    await onSubmitEdit('game_player_stats', form_state)
    navigateTo(`/admin/game_player_stats`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit game</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Game" />
      </div>
    </div>
    <game-form
      :players="players"
      :state="state"
      @submitted="onSubmit"
    />
  </div>
</template>
