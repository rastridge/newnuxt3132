<template>
  <div class="historystreaks">
    <p class="my-text-style mt-1">Streaks</p>
    <table class="nowrap">
      <tbody>
        <tr
          v-for="item in historystreaks"
          :key="item.StartDate"
        >
          <td>{{ item.result }}</td>
          <td>{{ item.Games }}</td>
          <td>
            {{ formatUnixDate(item.StartDate) }} ->
            {{ formatUnixDate(item.EndDate) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  const historystreaks = ref({})

  const { formatUnixDate } = useUnixtime()

  const props = defineProps({
    opponent_id: { type: Number, required: true },
  })
  const url = `https://nuxt3.buffalorugby.org/game_player_stats/streaks/${props.opponent_id}`
  const { data, error } = await useFetch(url, {
    method: 'get',
  })
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not get data from ${url}`,
    })
  } else {
    historystreaks.value = data.value
  }
</script>
