<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm"
    >
      <FormKit
        label="Page Title"
        name="content_name"
        type="text"
        validation="required"
      />
      <FormKit
        v-if="peek"
        label="Raw HTML Article"
        name="content_body"
        type="textarea"
        disabled="true"
      />
      <Button
        label="Toggle raw HTML view"
        class="p-button-secondary mb-1"
        @click="toggle"
      />
      <h6>Content</h6>
      <div>
        <input-body
          app="content"
          :field="state.content_body"
          @changeState="changeState"
        ></input-body>
      </div>
      <!-- </FormKit> -->
      <FormKit
        label="Order in Menu"
        name="content_order"
        type="number"
        min="0"
        validation="required"
      />

      <FormKit
        type="date"
        label="Release Date"
        name="content_release_dt"
        validation="required"
      />
      <FormKit
        type="date"
        label="Expire Date"
        name="content_expire_dt"
        validation="required"
      />
      <display-cancelform :destination="'/admin/content'" />
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
  // raw html view
  //
  const peek = ref(false)
  const toggle = () => {
    peek.value = !peek.value
  }

  //
  // incoming from inputBody component
  //
  const changeState = (field) => {
    state.value.content_body = field
  }
  //
  // Update html from InputBody component to make images responsive
  //
  state.value.content_body = state.value.content_body.replace(
    /\<img/g,
    '<img width="100%"',
  )

  //
  // form handlers
  //
  const submitForm = (state) => {
    saving.value = true
    emit('submitted', state)
  }
</script>
