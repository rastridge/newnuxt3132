<template>
  <div class="history">
    <div v-if="history">
      <h6 class="m-2 text-xl">
        {{ history[0].opponent_name }}
      </h6>

      <table>
        <tbody class="my-text-style">
          <tr
            v-for="item in history"
            :key="item.date_ut"
          >
            <td>
              {{ formatUnixDate(item.date_ut) }}
            </td>
            <td>
              {{ getGameLevelCode(item) }}
            </td>
            <td>
              {{ getResultCode(item) }}
              {{ item.ptsFor }} -
              {{ item.ptsAgn }}
            </td>
            <td>{{ item.comment }}</td>
            <td>{{ item.venue }}</td>
            <td>{{ item.occasion }} {{ item.game_type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  // const { $dayjs } = useNuxtApp()
  const { getGameLevelCode, getResultCode } = useGames()
  const history = ref([])
  const { formatUnixDate } = useUnixtime()

  const props = defineProps({
    opponent_id: { type: Number, required: true },
  })

  const url = `https://nuxt3.buffalorugby.org/game_player_stats/history/${props.opponent_id}`
  const { data, error } = await useFetch(url, {
    method: 'get',
  })
  if (error.value) {
    throw createError({
      ...error.value,
      statusMessage: `Could not get data from ${url}`,
    })
  } else {
    history.value = data.value
  }
</script>

<style scoped>
  th,
  td {
    white-space: nowrap;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
  }
</style>
