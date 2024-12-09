<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm(state)"
    >
      <FormKit
        label="Event Name"
        name="event_title"
        type="text"
        autofocus
        validation="required"
      />
      <FormKit
        label="Description"
        name="event_description"
        type="textarea"
        validation="required"
      />
      <FormKit
        label="Location"
        name="event_location"
        type="textarea"
        validation="required"
      />
      <FormKit
        type="date"
        label="Event Date"
        name="event_dt"
        validation="required"
      />
      <FormKit
        type="date"
        label="Release Date"
        name="release_dt"
        validation="required"
      />
      <FormKit
        type="date"
        label="Expire Date"
        name="expire_dt"
        validation="required"
      />
      <display-cancelform :destination="'/admin/events'" />
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

  //
  // form handlers
  //
  const submitForm = (state) => {
    saving.value = true
    emit('submitted', state)
  }
</script>
