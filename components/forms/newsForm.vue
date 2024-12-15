<template>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm(state)"
    >
      state = {{ state }}
      <FormKit
        label="News Title"
        name="news_title"
        type="text"
        validation="required"
      />
      <FormKit
        label="Synopsis"
        name="news_synop"
        type="textarea"
        validation="required"
      />
      <FormKit
        v-if="peek"
        label="Raw HTML Article"
        name="news_article"
        type="textarea"
        disabled="true"
      />
      <Button
        label="Toggle raw HTML view"
        class="p-button-secondary mb-1"
        @click="toggle"
      />

      <h4>Content</h4>
      <input-body
        app="news"
        :field="state.news_article"
        @changeState="changeState"
      ></input-body>

      <FormKit
        type="date"
        label="Event Date"
        name="news_event_dt"
        validation="required"
      />
      <FormKit
        type="date"
        label="Release Date"
        name="news_release_dt"
        validation="required"
      />

      <FormKit
        type="date"
        label="Expire Date"
        name="news_expire_dt"
        validation="required"
      />
      <display-cancelform :destination="'/admin/news'" />
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

  //
  // incoming from inputBody component
  //
  const changeState = (news_article) => {
    state.value.news_article = news_article
  }

  //
  // raw html view
  //
  const peek = ref(false)
  const toggle = () => {
    peek.value = !peek.value
  }

  //
  // Format for Primevue calendar
  //
  /*   state.value.news_event_dt = $dayjs(state.value.news_event_dt).format(
    'YYYY-MM-DD',
  )
  state.value.news_release_dt = $dayjs(state.value.news_release_dt).format(
    'YYYY-MM-DD',
  )
  state.value.news_expire_dt = $dayjs(state.value.news_expire_dt).format(
    'YYYY-MM-DD',
  ) */

  //
  // form handlers
  //

  const submitForm = async (state) => {
    saving.value = true
    //
    // Insert into quill html to make images responsive
    //
    state.news_article = state.news_article.replace(
      /\<img/g,
      '<img width="100%"',
    )
    /*     state.news_event_dt = $dayjs(state.news_event_dt).format('YYYY-MM-DD')
    state.news_release_dt = $dayjs(state.news_release_dt).format('YYYY-MM-DD')
    state.news_expire_dt = $dayjs(state.news_expire_dt).format('YYYY-MM-DD') */
    emit('submitted', state)
  }
</script>
