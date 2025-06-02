<template>
  <div>
    <Head>
      <Title>Stats Admin</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>
      <div>
        <!--Select season -->
        <div class="topsectionitem">
          <select-season
            :startyear="startyear"
            :currentyear="season"
            class="mb-3"
            @submitted="onSubmitSeasonYear"
          />

          <!--Select gsme type -->
          <select-game-type
            :currenttype="gametype"
            @submitted="onSubmitGameType"
          />
        </div>
      </div>

      <render-list
        :data="filteredData"
        :page="page"
        :app="app"
        :statusable="statusable"
        :editable="editable"
        :deleteable="deleteable"
        :addable="addable"
        :viewable="viewable"
        @changeStatus="changeStatus"
        @deleteItem="deleteItem"
      />
    </div>

    <!-- player on game roster -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Can't do that"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">{{ message }}</span>

      <template #footer>
        <Button
          label="Continue"
          autofocus
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  definePageMeta({
    middleware: ['auth'],
  })

  // initialize renderlist
  //
  const app = 'game_player_stats'
  const { getAccess } = useRenderListAccess()
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

  //
  // get initial values
  //
  const placemark = usePlacemarkStore()

  const page = ref(placemark.getPage)
  const season = ref(placemark.getSeasonYear)
  const gametype = ref(placemark.getGameTypeId)
  // Initialize year select
  const startyear = 1966

  // console.log('placemark.getSeasonYear = ', placemark.getSeasonYear)
  // console.log('season = ', season)

  //
  // filter season gams by Game type
  //
  const filteredData = computed(() => {
    return stats.value.filter((d) => {
      if (gametype.value === 7) {
        return d.game_type_id === 7
      } else {
        return d.game_type_id !== 7
      }
    })
  })

  //
  // get season data
  //
  const stats = ref([])
  const getSeasonGames = async (season) => {
    const url = `https://nuxt3.buffalorugby.org/game_player_stats/season/${season}`
    const { data, error } = await useFetch(url, {
      method: 'get',
    })
    if (error.value) {
      throw createError({
        ...error.value,
        statusMessage: `Could not get data from ${url}`,
      })
    } else {
      // date and time from unix time
      data.value.dt = '0000'
      stats.value = data.value
    }
  }

  // get current season on initial load
  //
  await getSeasonGames(season.value)

  //
  // set season after drop down choice
  // get games by season
  //
  const onSubmitSeasonYear = async function (season) {
    placemark.setSeasonYear(season)
    placemark.setPage(0)
    page.value = 0
    await getSeasonGames(season)
  }
  //
  // set gametype after drop down choice
  //
  const onSubmitGameType = async function (value) {
    gametype.value = value
    placemark.setGameTypeId(gametype.value)
  }

  // Renderlist actions
  //
  const { deleteOne, changeStatusOne } = useFetchAll()
  const message = ref('')
  const visible = ref(false)

  const deleteItem = async (id) => {
    const msg = await deleteOne(app, id)
    if (msg.value) {
      message.value = msg.value
      visible.value = true
    } else {
      navigateTo(`/admin/${app}`)
    }
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne(app, { id, status })
  }
</script>
