<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      submit-label="Submit"
      @submit="submitForm(state)"
    >
      <!--     disable if editing
 -->
      <FormKit
        type="text"
        label="Year"
        name="history_year"
        :disabled="edit_form"
        validation="required|number|between:1966,2050"
        validation-visibility="live"
      />
      <!--       // prevent add using existing history_year
 -->
      <div
        v-if="year_exists && !edit_form"
        class="alert-danger"
      >
        Year {{ state.history_year }} already exists. Cancel and try again.
      </div>

      <FormKit
        label="Playoffs"
        name="playoffs"
        type="textarea"
        value=""
      />

      <FormKit
        label="Outbound Tours"
        name="outbound_tours"
        type="textarea"
        value=""
      />
      <FormKit
        label="Inbound Tours"
        name="inbound_tours"
        type="textarea"
        value=""
      />
      <FormKit
        label="Other"
        name="other"
        type="textarea"
        value=""
      />
      <FormKit
        label="Upstate Tourney Location	"
        name="upstate_tourney_location"
        type="text"
        value=""
      />
      <FormKit
        label="Upstate Tourney Winner	"
        name="upstate_tourney_winner"
        type="text"
        value=""
      />

      <display-cancelform :destination="'/admin/history'" />
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
  const saving = ref(false)
  const edit_form = ref(null)

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

  // Editing - year exists - can't be changed
  // null if adding
  //
  edit_form.value = state.value.history_year

  //
  // See if year already exists - cant add
  //
  const { data: years } = await useFetch(
    `https://nuxt3.buffalorugby.org/history/getyears`,
    {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  const year_exists = computed(() =>
    years.value.find((u) => u.history_year == state.value.history_year),
  )

  //
  // form handlers
  //
  const submitForm = (state) => {
    if (!(year_exists.value && !edit_form.value)) {
      // prevent add using existing history_year
      saving.value = true
      emit('submitted', state)
    }
  }
</script>
