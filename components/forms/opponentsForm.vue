<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit Opponent"
      @submit="submitForm(state)"
    >
      <FormKit
        label="Opponent Name"
        name="opponent_name"
        type="text"
        validation="required"
      />
      <FormKit
        label="Opponent Location"
        name="opponent_location"
        type="text"
        validation="required"
      />

      <FormKit
        type="select"
        label="Opponent Type"
        name="opponent_type"
        :options="[
          { label: 'Men', value: 'men' },
          { label: 'College', value: 'college' },
          { label: 'Old Boys', value: 'oldboys' },
        ]"
        validation="required"
      />

      <FormKit
        type="select"
        label="Opponent level"
        name="opponent_level"
        :options="[
          { label: 'First Side', value: 'A' },
          { label: 'Second Side', value: 'B' },
          { label: 'Third  Side', value: 'C' },
        ]"
        validation="required"
      />

      <FormKit
        label="Opponent Description"
        name="opponent_description"
        type="textarea"
        validation="required"
      />
      <display-cancelform :destination="'/admin/opponents'" />
    </FormKit>
    <p v-if="saving">
      <ProgressBar
        mode="indeterminate"
        style="height: 6px"
      ></ProgressBar>
      Saving ...
    </p>
  </div>
  <!-- </div> -->
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
  // Initialize form
  //
  const state = ref({ ...props.state })

  //
  // form handlers
  //
  const submitForm = (state) => {
    saving.value = true
    emit('submitted', state)
  }
</script>
