<template>
  <div class="my-form-style">
    <!-- Edit -->
    <h6
      v-if="id"
      class="text-left my-text-style font-semibold"
    >
      Contributor {{ state.contribution_name }}
    </h6>
    <!-- add -->
    <div
      v-else
      class="mb-2"
    >
      <p class="font-semibold">Contributor name</p>
      <AutoComplete
        v-model="selectedItem"
        optionLabel="title"
        :suggestions="filteredNames"
        @complete="search"
        @item-select="getPrevious"
      />
    </div>
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm"
    >
      <FormKit
        type="date"
        label="Contribution Date"
        name="contribution_date"
        validation="required"
      />

      <FormKit
        label="Amount"
        name="contribution_amount"
        type="text"
        validation="required"
      />

      <FormKit
        type="checkbox"
        label="Show Name"
        name="contribution_showName"
        value="1"
      />

      <FormKit
        type="checkbox"
        label="Show Amount"
        name="contribution_showAmount"
        value="1"
      />
      <div v-if="previous">
        <h3>Previous Donations</h3>
        <table>
          <tbody>
            <tr
              v-for="items in previous"
              :key="items.contribution_id"
            >
              <td>{{ items.name }}</td>
              <td>{{ items.contribution_amount }}</td>
              <td>
                {{ $dayjs(items.dt).format('MMM DD YYYY') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FormKit
        type="textarea"
        label="Comment"
        name="contribution_comment"
        validation="required"
      />
      <display-cancelform :destination="'/admin/contributions'" />
    </FormKit>
    <p v-if="saving">
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      ></ProgressBar>
      Saving ...
    </p>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  const { $dayjs } = useNuxtApp()
  const saving = ref(false)

  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])
  //
  // Incoming
  //
  const props = defineProps({
    state: { type: Object, required: true },
  })

  const state = ref({ ...props.state })
  const id = state.value.contribution_id
  // Add form
  //
  // autocomplete
  //
  const selectedItem = ref('')
  const filteredNames = ref([])
  const suggestions = ref([])
  const previous = ref(null)

  const search = (event) => {
    if (!event.query.trim().length) {
      filteredNames.value = [...suggestions.value]
    } else {
      filteredNames.value = suggestions.value.filter((suggestion) => {
        return (
          suggestion.title
            .toLowerCase()
            // .startsWith(event.query.toLowerCase())
            .includes(event.query.toLowerCase())
        )
      })
    }
  }

  const getPrevious = async () => {
    const { data } = await useFetch(
      `/contributions/previous/${selectedItem.value.account_id}`,
      {
        method: 'get',
        headers: {
          authorization: auth.user.token,
        },
      },
    )
    previous.value = data.value
  }

  state.value.contribution_showName =
    state.value.contribution_showName === 1 ? true : false
  state.value.contribution_showAmount =
    state.value.contribution_showAmount === 1 ? true : false
  //

  // if add get suggestions
  if (!id) {
    const { data } = await useFetch(`/accounts/suggestions`, {
      method: 'get',
    })
    suggestions.value = data.value
  }
  //
  // form handlers
  //
  const submitForm = async (state) => {
    state.account_id = selectedItem.value.account_id
    saving.value = true
    emit('submitted', state)
  }
</script>
