<template>
  <div>
    <div class="my-header-style">{{ direction }} Matches</div>
    <Card style="width: 320px">
      <!-- <template #header> </template> -->
      <template #content>
        <table class="nowrap">
          <tbody>
            <tr v-if="stats1">
              <td>
                {{ formatUnixDate(stats1.date_ut) }}
                &nbsp;&nbsp;&nbsp;{{ stats1.venue }}
              </td>

              <td v-if="direction !== 'Last'">
                {{ formatUnixTime(stats1.date_ut) }}
              </td>
            </tr>

            <tr v-if="stats1">
              <td>
                <strong
                  >{{ stats1.opponent_name }} vs our
                  {{ stats1.game_level }}</strong
                >
              </td>
              <td v-if="direction === 'Last'">
                {{ stats1.ptsFor }} - {{ stats1.ptsAgn }}
              </td>
            </tr>

            <tr v-if="stats2">
              <td>
                {{ formatUnixDate(stats2.date_ut) }}

                &nbsp;&nbsp;&nbsp;{{ stats2.venue }}
              </td>

              <td v-if="direction !== 'Last'">
                {{ formatUnixTime(stats2.date_ut) }}
              </td>
            </tr>

            <tr v-if="stats2">
              <td>
                <strong
                  >{{ stats2.opponent_name }} vs our
                  {{ stats2.game_level }}</strong
                >
              </td>
              <td v-if="direction === 'Last'">
                {{ stats2.ptsFor }} - {{ stats2.ptsAgn }}
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Card>
  </div>
</template>

<script setup>
  // const { $dayjs } = useNuxtApp()
  const { formatUnixDate, formatUnixTime } = useUnixtime()

  const props = defineProps({
    direction: { type: String, default: 'next', required: true },
  })
  //
  // Get adjacent games
  //
  const stats1 = ref(null)
  const stats2 = ref(null)

  const url = `https://nuxt3.buffalorugby.org/game_player_stats/getadjacent/${props.direction}`

  const { data } = await useFetch(url, {
    method: 'get',
  })
  stats1.value = data.value[0]
  stats2.value = data.value[1]
</script>

<style scoped>
  td {
    font-size: 0.8rem;
  }
</style>
