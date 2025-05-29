<template>
  <p v-if="state.sms_id">
    Current version of this SMS was sent {{ sms_recp_cnt }} times
  </p>
  <div class="my-form-style">
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm"
    >
      <FormKit
        type="select"
        label="Recipient Group"
        name="sms_recipient_type_id"
        placeholder="Select Recipient Group"
        :options="newsletterRecipientTypeOptions"
        validation="required"
      />
      <FormKit
        label="SMS subject"
        name="sms_subject"
        type="text"
        validation="required"
      />
      <FormKit
        label="SMS message"
        name="sms_body_text"
        type="textarea"
        validation="required"
      />
      <display-cancelform :destination="'/admin/sms'" />
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
  // Incoming id
  //
  const props = defineProps({
    state: { type: Object, required: true },
  })
  const state = ref({ ...props.state })

  //
  // Outgoing form data
  //
  const emit = defineEmits(['submitted'])

  const sms_recp_cnt = ref(state.value.sms_recp_cnt)

  //
  // form handlers
  //
  const submitForm = (state) => {
    saving.value = true
    emit('submitted', state)
  }

  // get newletter recipient types
  //
  const { data: newsletterRecipientTypes } = await useFetch(
    '/newsletters/newsletterrecipienttypes',
    {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )
  //
  // convert for Formkit "label" "value"
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
</script>
