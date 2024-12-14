<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      submit-label="Submit"
      @submit="submitForm(state)"
    >
      <FormKit
        type="text"
        label="Year"
        name="leaders_year"
        :disabled="edit_form"
        validation="required|number|between:1966,2050"
        validation-visibility="live"
      />
      <div
        v-if="year_exists && !edit_form"
        class="alert-danger"
      >
        Year {{ state.leaders_year }} already exists. Cancel and try again.
      </div>

      <FormKit
        label="President"
        name="president"
        type="text"
        value=""
      />
      <FormKit
        label="Vice President"
        name="vice_president"
        type="text"
        value=""
      />
      <FormKit
        label="Secretary"
        name="secretary"
        type="text"
        value=""
      />
      <FormKit
        label="Match Secretary"
        name="match_secretary"
        type="text"
        value=""
      />
      <FormKit
        label="Treasurer"
        name="treasurer"
        type="text"
        value=""
      />
      <FormKit
        label="Social Chair"
        name="social_chairman"
        type="text"
        value=""
      />
      <FormKit
        label="Spring Capt"
        name="spring_captain"
        type="text"
        value=""
      />
      <FormKit
        label="Fall Capt"
        name="fall_captain"
        type="text"
        value=""
      />
      <FormKit
        label="Coach"
        name="coach"
        type="text"
        value=""
      />
      <FormKit
        label="Asst Coach"
        name="assistant_coach"
        type="text"
        value=""
      />
      <FormKit
        label="Chair BOD"
        name="chair_bod"
        type="text"
        value=""
      />
      <display-cancelform :destination="'/admin/leaders'" />
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
  //
  // Initialize form
  //
  // Editing - year exists - can't be changed
  // null if adding
  //
  edit_form.value = state.value.leaders_year

  //
  // See if year already exists - cant add
  //
  const { data: years } = await useFetch(`/leaders/getyears`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  const year_exists = computed(() =>
    years.value.find((u) => u.leaders_year == state.value.leaders_year),
  )

  //
  // form handlers
  //

  const submitForm = (state) => {
    if (!(year_exists.value && !edit_form.value)) {
      saving.value = true
      emit('submitted', state)
    }
  }
</script>
