<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit Game"
      @submit="submitForm(state)"
    >
      <!-- opponent input-->
      <div v-if="(reset_opponent && !addForm) || addForm">
        <Card style="width: 25em; margin-bottom: 1rem">
          <template #title> Find opponent</template>
          <template #content>
            <AutoComplete
              v-model="selectedOpponent"
              optionLabel="opponent_name"
              :suggestions="filteredOpponents"
              @complete="search_opponents"
              @item-select="setOpponent"
            />
            <p class="m-2">
              If the opponent for this game can not be found in the existing
              opponents list, you must first create the opponent<br />
              <Button
                class="p-button-sm mt-1"
                label="Create Opponent"
                @click="navigateTo('/admin/opponents/add')"
              >
              </Button>
            </p>
          </template>
        </Card>
      </div>
      <div
        v-if="!addForm"
        class="block text-900 font-medium mb-2"
      >
        <label
          class="mr-2"
          for="reset_opponent"
          >Change opponent</label
        >
        <Checkbox
          id="reset_opponent"
          v-model="reset_opponent"
          :binary="true"
        />
      </div>
      <FormKit
        label="Opponent"
        name="opponent_name"
        type="text"
        disabled="true"
      />

      <!-- referee input-->
      <FormKit
        label="Referee"
        name="referee"
        type="text"
      />

      <!-- venue input-->
      <FormKit
        label="Venue"
        name="venue"
        type="text"
        validation="required"
      />
      <!-- Date input-->
      <FormKit
        type="date"
        label="Date"
        name="date"
        validation="required"
      />

      <!-- Time input-->
      <FormKit
        type="time"
        label="Time"
        name="time"
        validation="required"
      />
      <!-- Game Type input-->
      <FormKit
        type="select"
        label="Game type"
        placeholder="Select game type"
        name="game_type_id"
        :options="gametypes"
        validation="required"
      />
      <!-- Game Level input-->
      <FormKit
        type="select"
        label="Game level"
        placeholder="Select game level"
        name="game_level"
        :options="[
          { label: 'A', value: 'A' },
          { label: 'B', value: 'B' },
          { label: 'C', value: 'C' },
          { label: 'D', value: 'D' },
        ]"
        validation="required"
      />
      <!-- Comment input-->
      <FormKit
        label="Comment"
        name="comment"
        type="textarea"
      />
      <!-- occasion input-->
      <FormKit
        label="Occasion"
        name="occasion"
        type="text"
      />
      <!-- points for input-->
      <FormKit
        label="Pts For"
        name="ptsFor"
        type="text"
      />
      <!-- points against input-->
      <FormKit
        label="Pts against"
        name="ptsAgn"
        type="text"
      />
      <display-cancelform :destination="'/admin/game_player_stats'" />
    </FormKit>
    <p v-if="saving">
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      ></ProgressBar>
      Saving ...
    </p>
  </div>
  <!-- if add OR game current date is before game date -->
  <div class="my-form-style">
    <div
      v-if="
        addForm || (!addForm && $dayjs().isBefore($dayjs.unix(state.date_ut)))
      "
    >
      <!-- Select previous game for autofill -->
      <label for="reset">
        <div class="p-2">
          Do you want to select roster from a previous game? All current game
          info will be replaced.
          <p
            v-if="!state.date_ut"
            style="color: red; padding: 1rem"
          >
            To do so you must first set a date for this game
          </p>
        </div>
      </label>
      <div v-if="state.date_ut">
        Check here <br />
        Uncheck to Cancel
        <input
          id="reset"
          v-model="reset"
          type="checkbox"
          @input="resetPlayers()"
        />
        <p style="color: red; padding: 2rem">
          Selecting another roster will replace existing players on this roster!
        </p>
        <div v-if="reset">
          <FormKit
            v-model="previous_game_id"
            type="select"
            label="Select another roster"
            placeholder="Select another roster"
            :options="previousgames"
          />
        </div>
      </div>
    </div>

    <!-- ------------ players table ------------------------- -- -->
    <div class="xs:w-full mt-4 my-text-style">
      <table
        style="
          border-collapse: collapse;
          border-spacing: 0;
          white-space: nowrap;
          overflow-x: auto;
        "
      >
        <tbody>
          <tr>
            <th>Pos</th>
            <th>Player</th>
            <th>Tries</th>
            <th>Assts</th>
            <th>Conv</th>
            <th>PenK</th>
            <th>DrpG</th>
            <th>Yello</th>
            <th>Red</th>
            <th>Replaced by</th>
          </tr>
          <tr
            v-for="(item, index) in players"
            :key="item.position_id"
          >
            <td>
              {{ players[index].position_id }}
            </td>
            <td>
              <AutoComplete
                v-model="selectedPlayers[index]"
                :pt="{
                  input: {
                    class:
                      'w-6rem md:w-8rem lg:w-10rem text-xs md:text-sm h-1rem md:h-2rem',
                  },
                }"
                optionLabel="title"
                :suggestions="filteredNames"
                @complete="search_players"
              />
            </td>
            <td>
              <input
                v-model="players[index].tries"
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                v-model="players[index].assists"
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                v-model="players[index].conv"
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                v-model="players[index].penk"
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                v-model="players[index].dgoal"
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                v-model="players[index].yellow"
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                v-model="players[index].red"
                size="1"
                type="text"
              />
            </td>
            <td>
              <AutoComplete
                v-model="selectedReplacements[index]"
                optionLabel="title"
                :pt="{
                  input: {
                    class:
                      'w-6rem md:w-8rem lg:w-10rem text-xs md:text-sm h-1rem md:h-2rem',
                  },
                }"
                :suggestions="filteredNames"
                @complete="search_players"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Confirm deletion -->
  <Dialog
    v-model:visible="showReplaceDialog"
    :style="{ width: '450px' }"
    header="Confirm replacement"
    :modal="true"
  >
    <div class="confirmation-content">
      <i
        class="pi pi-exclamation-triangle mr-3"
        style="font-size: 2rem"
      />
      <span class="text-red-600"
        >Are you sure you want to replace this roster?</span
      >
    </div>

    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="showReplaceDialog = false"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        class="p-button-text"
        @click="confirmedReplace(previous_game_id)"
      />
    </template>
  </Dialog>
</template>

<script setup>
  const { $dayjs } = useNuxtApp()
  const saving = ref(false)
  const { convertToFormkitDate } = useUnixtime()

  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])
  //
  // Incoming
  //
  const props = defineProps({
    state: { type: Object, required: true },
    players: { type: Object, required: true },
  })
  const state = ref({ ...props.state })
  const players = ref([...props.players])

  // Reactive variables
  const showReplaceDialog = ref(false)
  const reset = ref('')
  const reset_opponent = ref(false)
  // which form?
  const addForm = ref(state.value.game_id === '0')

  //
  // Player name autocomplete
  //
  const selectedPlayers = ref([])
  const selectedReplacements = ref([])
  const filteredNames = ref([])
  const search_players = (event) => {
    if (!event.query.trim().length) {
      filteredNames.value = [...player_suggestions.value]
    } else {
      filteredNames.value = player_suggestions.value.filter((suggestion) => {
        return suggestion.title
          .toLowerCase()
          .includes(event.query.toLowerCase())
      })
    }
  }

  //
  // Opponent name autocomplete
  //
  // const opponent_suggstions = ref([])
  const filteredOpponents = ref([])
  const selectedOpponent = ref('')

  const setOpponent = () => {
    state.value.opponent_id = selectedOpponent.value.opponent_id
    state.value.opponent_name = selectedOpponent.value.opponent_name
  }
  const search_opponents = (event) => {
    if (!event.query.trim().length) {
      filteredOpponents.value = [...opponent_suggstions.value]
    } else {
      filteredOpponents.value = opponent_suggstions.value.filter(
        (suggestion) => {
          return (
            suggestion.opponent_name
              .toLowerCase()
              // .startsWith(event.query.toLowerCase())
              .includes(event.query.toLowerCase())
          )
        },
      )
    }
  }

  //
  // Get other options for form
  //
  // Game types
  //
  const { data: gametypes } = await useFetch(
    `/game_player_stats/getgametypes`,
    {
      method: 'get',
    },
  )
  //
  // convert game types for formkit
  //
  const result = []
  gametypes.value.map((old) => {
    const n = {}
    n.label = old.game_type
    n.value = old.game_type_id
    result.push(n)
  })
  gametypes.value = result

  // player names suggestions
  //
  const { data: player_suggestions } = await useFetch(`/accounts/suggestions`, {
    method: 'get',
  })

  // opponent names suggestions
  //
  const { data: opponent_suggstions } = await useFetch(
    `/opponents/suggestions`,
    {
      method: 'get',
    },
  )
  // opponent_suggstions.value = opps_sug.value

  /// add
  // for Primevue autocomplete
  if (addForm.value) {
    selectedPlayers.value.push({
      account_id: '',
      title: '',
      member_firstname: '',
      member_lastname: '',
    })
    selectedReplacements.value.push({
      account_id: '',
      title: '',
      member_firstname: '',
      member_lastname: '',
    })
  } else {
    // edit
    console.log('players= ', players)

    // Special for Primevue AutoComplete
    players.value.forEach((player) => {
      selectedPlayers.value.push({
        account_id: player.player_id ? player.player_id : '0',
        member_firstname: player.pfn ? player.pfn : '',
        member_lastname: player.pln ? player.pln : '',
        title: player.pname ? player.pname : '',
      })
      selectedReplacements.value.push({
        account_id: player.replaced_by,
        member_firstname: player.rfn,
        member_lastname: player.rln,
        title: player.rname ? player.rname : '',
      })
    })
  }
  //
  // Replace Players
  //
  const previousgames = ref([])
  const previous_game_id = ref(0)
  const getPreviousGames = async (date_ut) => {
    const { data } = await useFetch(
      `/game_player_stats/getprevious/${date_ut}`,
      {
        method: 'get',
      },
    )
    // convert for formkit select previous games
    const result = []
    data.value.map((old) => {
      const n = {}
      n.label =
        convertToFormkitDate(old.date_ut) +
        ' - ' +
        old.opponent_name +
        ' Game level ' +
        old.game_level

      n.value = old.game_id
      result.push(n)
    })
    previousgames.value = result
  }

  //
  // insert players from previous game
  //
  const resetPlayers = () => {
    reset.value = !reset.value
    if (reset.value) {
      getPreviousGames(state.value.date_ut)
    }
  }

  const confirmedReplace = (newid) => {
    showReplaceDialog.value = false
    getReplacePlayers(newid)
  }

  watch(previous_game_id, () => {
    showReplaceDialog.value = true
  })

  const getReplacePlayers = async (game_id) => {
    const { data: rp } = await useFetch(
      `/game_player_stats/players/${game_id}`,
      {
        method: 'get',
      },
    )

    // Needed to reset player stats
    const replacementPlayers = rp.value.map((item) => {
      const plr = {}
      plr.position_id = item.position_id
      plr.player_id = item.player_id
      plr.pname = item.pname
      plr.rname = ''
      plr.replaced_by = '0'
      plr.tries = '0'
      plr.assists = '0'
      plr.conv = '0'
      plr.penk = '0'
      plr.dgoal = '0'
      plr.yellow = '0'
      plr.red = '0'
      return plr
    })

    selectedPlayers.value = []
    selectedReplacements.value = []
    replacementPlayers.forEach((value) => {
      // adjustment for AutoCompletes
      selectedPlayers.value.push({
        account_id: value.player_id ? value.player_id : '0',
        member_firstname: value.pfn ? value.pfn : '',
        member_lastname: value.pln ? value.pln : '',
        title: value.pname ? value.pname : '',
      })
      selectedReplacements.value.push({
        account_id: value.replaced_by,
        member_firstname: value.rfn,
        member_lastname: value.rln,
        title: value.rname ? value.rname : '',
      })
    })
    players.value = replacementPlayers
  }

  //
  // form handlers
  //
  const submitForm = (state) => {
    selectedPlayers.value.forEach((value, index) => {
      players.value[index].player_id = value.account_id
      players.value[index].pfn = value.member_firstname
      players.value[index].pln = value.member_lastname
      players.value[index].pname = value.title
    })
    selectedReplacements.value.forEach((value, index) => {
      players.value[index].replaced_by = value.account_id
      players.value[index].rfn = value.member_firstname
      players.value[index].rln = value.member_lastname
      players.value[index].rname = value.title
    })
    state.players = players.value
    state.date_ut = $dayjs(state.date + ' ' + state.time).unix()
    saving.value = true

    emit('submitted', state)
  }
</script>
