<template>
  <div id="schedule">
    import twilio from 'twilio' // ...existing code...
    <Head>
      <Title>Buffalo Rugby Club Schedule and Results</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <common-header title="Game Schedule and Results" />
      </div>

      <div class="topsectionitem">
        <select-season
          :startyear="startyear"
          :currentyear="season_year"
          class="mb-3"
          @submitted="onSubmit"
        />

        <select-game-type
          :currenttype="gametype"
          class="mb-3 w-10rem mx-auto"
          @submitted="onSubmitGameType"
        />
      </div>

      <div class="my-simple-card-style w-full md:w-10">
        <DataView :value="filteredData">
          <template #list="slotProps">
            <div
              v-for="item in slotProps.items"
              :key="item.game_id"
              class="col-12"
            >
              <div
                class="flex flex-column md:flex-row justify-content-between align-items-center xl:align-items-center gap-2 mb-2 p-3 border-round-md shadow-4 bg-blue-700 text-white font-semibold"
              >
                <!-- left -->
                <div
                  class="flex flex-row justify-content-center md:flex-column align-items-center md:align-items-start gap-3 border-soli w-full md:w-3"
                >
                  <div class="flex align-items-end border-soli">
                    <span
                      class="text-sm md:text-md lg:text-lg font-bold text-white"
                    >
                      {{ formatUnixDate(item.date_ut) }}
                      <br />
                      {{ formatUnixTime(item.date_ut) }}

                      ET
                    </span>
                    <br />
                  </div>

                  <div class="flex align-items-center border-soli">
                    <span class="font-semibold"
                      >{{ getGameLevelCode(item) }} Side
                    </span>
                  </div>

                  <div class="flex align-items-center border-soli">
                    <span class="font-semibold">{{ item.game_type }}</span>
                  </div>
                </div>

                <!-- center stuff-->
                <div
                  class="flex flex-column align-items-center gap-1 border-soli w-full md:w-6"
                >
                  <div class="flex align-items-center border-soli">
                    <Button
                      :label="item.title"
                      text
                      class="cursor-pointer text-2xl md:text-3xl text-gray-300 shadow-4 font-bold"
                      @click.prevent="showGame(item.game_id)"
                    />
                  </div>
                  <div class="flex align-items-center border-soli">
                    <span class="text-2xl font-semibold">
                      {{ getResultCode(item) }} &nbsp;&nbsp;&nbsp;
                      {{ item.ptsFor }} - {{ item.ptsAgn }}</span
                    >
                  </div>
                </div>

                <!-- right aligned stuff -->
                <div
                  class="flex flex-row justify-content-center md:flex-column align-items-center md:align-items-start gap-2 border-soli w-full md:w-3"
                >
                  <div class="flex align-items-center gap-3 border-soli">
                    <span class="text-sm md:text-md lg:text-lg font-bold"
                      >@ {{ item.venue }}</span
                    >
                  </div>
                  <div class="flex align-items-center border-soli">
                    <span>
                      {{ item.occasion }}
                    </span>
                  </div>
                  <div class="flex align-items-center border-soli">
                    <Button
                      label="Show history"
                      class="cursor-pointer font-semibold text-gray-300 shadow-4"
                      text
                      size="small"
                      @click="showHistory(item.opponent_id)"
                    />
                    <span class="text-sm text-700">
                      {{ item.game_id }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </DataView>
        <roster-chart />
      </div>
    </div>

    <!-- Game Modal -->

    <Dialog v-model:visible="displayGameModal">
      <template #header>
        <div>
          <span class="text-lg font-semibold"
            >{{ game_info.opponent_name }} -
            {{
              $dayjs
                .unix(game_info.date_ut)
                .format('MMMM DD, YYYY @ ddd h:mm A')
            }}</span
          >
          <h6 class="m-2 text-xl" />
        </div>
      </template>
      <div class="m-1 p-1 text-sm">
        <display-game-info :item="game_info" />
        <display-roster :players="players" />
      </div>
      <template #footer>
        <div>
          <Button
            label="Return"
            class="p-button-sm mt-2"
            autofocus
            @click="closeModal"
          />
        </div>
      </template>
    </Dialog>

    <!-- History Modal -->
    <Dialog v-model:visible="displayHistoryModal">
      <template #header>
        <div>
          <span class="text-lg font-semibold ml-5">History</span>
        </div>
      </template>
      <div class="m-1 p-1 text-sm">
        <display-history :opponent_id="opponent_id" />
        <display-records :opponent_id="opponent_id" />
        <display-streaks :opponent_id="opponent_id" />
      </div>
      <template #footer>
        <div>
          <Button
            label="Close"
            class="p-button-sm mt-2"
            autofocus
            @click="closeHistoryModal"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  const { $dayjs } = useNuxtApp()
  const placemark = usePlacemarkStore()
  const { getGameLevelCode, getResultCode } = useGames()
  const { formatUnixDate, formatUnixTime } = useUnixtime()

  // Initialize year select
  //
  const startyear = 1966

  // set to season_year determined by currrent date
  //
  placemark.initSeason()
  const season_year = ref(placemark.getSeasonYear)

  //
  // getSeasonGames
  //
  const games = ref([])
  const getSeasonGames = async (season_year) => {
    const url = `https://nuxt3.buffalorugby.org/game_player_stats/season/${season_year}`
    const { data, error } = await useFetch(url, {
      method: 'get',
    })
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not get data from ${url}`,
      })
    }
    return data.value
  }

  // initial games
  //
  games.value = await getSeasonGames(season_year.value)

  // get season_year from dropdown
  // get games for that season
  //
  const onSubmit = async (s) => {
    season_year.value = s
    games.value = await getSeasonGames(s)
  }

  // set gametype after drop down choice
  //
  const gametype = ref(1)
  const onSubmitGameType = (value) => {
    gametype.value = value
  }

  // filter season games by game type
  //
  const filteredData = computed(() => {
    return games.value.filter((d) => {
      if (gametype.value === 7) {
        return d.game_type_id === 7
      } else {
        return d.game_type_id !== 7
      }
    })
  })

  //
  //
  // game info Modal
  //

  const players = ref(null)

  const getThePlayers = async (game_id) => {
    const url = `https://nuxt3.buffalorugby.org/game_player_stats/players/${game_id}`
    const { data, error } = await useFetch(url, {
      method: 'get',
    })
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not get data from ${url}`,
      })
    } else {
      return data.value
    }
  }

  const game_info = ref(null)

  const getTheInfo = async (id) => {
    const url = `https://nuxt3.buffalorugby.org/game_player_stats/${id}`
    const { data } = await useFetch(url, {
      method: 'get',
    })

    // game_info.value = data.value
    return data.value
  }

  const displayGameModal = ref(false)

  const openModal = () => {
    displayGameModal.value = true
  }
  const closeModal = () => {
    displayGameModal.value = false
  }
  const showGame = async (id) => {
    game_info.value = await getTheInfo(id)
    players.value = await getThePlayers(id)
    openModal()
  }
  //
  //
  // history Modal
  //
  const opponent_id = ref('')
  const displayHistoryModal = ref(false)

  const openHistoryModal = () => {
    displayHistoryModal.value = true
  }
  const closeHistoryModal = () => {
    displayHistoryModal.value = false
  }
  const showHistory = (id) => {
    opponent_id.value = id
    openHistoryModal()
  }
</script>
