<template>
  <div
    v-if="state.newsletter_id"
    class="text-center font-semibold"
  >
    Newsletter opened count {{ opened.opened_cnt }}
    <br />
    Current recipient group size {{ state.newsletter_recp_cnt }}
  </div>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit Newsletter"
      @submit="submitForm"
    >
      <FormKit
        type="select"
        label="Recipient Group"
        placeholder="Select Recipient Group"
        name="newsletter_recipient_type_id"
        :options="newsletterRecipientTypeOptions"
        validation="required"
      />

      <FormKit
        label="Newsletter subject"
        name="newsletter_subject"
        type="text"
        validation="required"
      />
      <FormKit
        v-if="peek"
        label="Raw HTML newsletter_body_html"
        name="newsletter_body_html"
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
        app="newsletter"
        :field="state.newsletter_body_html"
        @changeState="changeState"
      ></input-body>
      <display-cancelform :destination="'/admin/newsletters'" />
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

  //
  // Incoming i
  //
  const props = defineProps({
    state: { type: Object, required: true },
  })

  const state = ref({ ...props.state })
  //
  // incoming from inputBody component
  //
  const changeState = (newsletter_body_html) => {
    state.value.newsletter_body_html = newsletter_body_html
  }

  //
  // Outgoing form data
  //
  const emit = defineEmits(['submitted'])

  //
  // raw html view
  const peek = ref(false)
  const toggle = () => {
    peek.value = !peek.value
  }

  //
  // get newsletter recipient types
  //
  const { data: newsletterRecipientTypes } = await useFetch(
    '/newsletters/newsletterrecipienttypes',
    {
      method: 'get',
      headers: {
        authorization: auth.user.token,
      },
    },
  )

  //
  // get newsletter openings
  //
  const { data: opened } = await useFetch(
    `/newsletters/getopenedcount/${state.value.newsletter_id}`,
    {
      method: 'get',
    },
  )

  //
  // get newsletter recipient types
  // Convert for Formkit "label" "value"
  //
  const setNewsletterRecipientTypeOptions = (nltypes) => {
    const result = []
    nltypes.map((old) => {
      const n = {}
      n.label = old.newsletter_recipient_type
      n.value = old.newsletter_recipient_type_id
      result.push(n)
    })
    return result
  }
  const newsletterRecipientTypeOptions = setNewsletterRecipientTypeOptions(
    newsletterRecipientTypes.value,
  )

  //
  // form handlers
  //
  const submitForm = (state) => {
    saving.value = true
    //
    // Insert to make images responsive
    //
    state.newsletter_body_html = state.newsletter_body_html.replace(
      /\<img/g,
      '<img width="100%"',
    )
    emit('submitted', state)
  }
</script>
