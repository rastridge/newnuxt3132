<template>
  <div class="my-form-style">
    <display-alert />
    <FormKit
      v-model="state"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit member"
      @submit="submitForm"
    >
      <FormKit
        label="First Name"
        name="member_firstname"
        type="text"
        autofocus
        validation="required"
      />
      <FormKit
        label="Last Name"
        name="member_lastname"
        type="text"
        validation="required"
      />
      <FormKit
        type="email"
        label="Email address"
        name="account_email"
        validation="required|email"
        :errors="errors"
      />
      <FormKit
        type="date"
        label="DOB"
        name="member_dob"
        validation="required"
      />
      <FormKit
        type="select"
        label="Gender"
        name="member_gender"
        :options="[
          { label: 'Male', value: 1 },
          { label: 'Female', value: 0 },
        ]"
        validation="required"
      />
      <FormKit
        type="text"
        label="Guardian"
        name="member_guardian"
        validation="required"
      />
      <FormKit
        type="select"
        label="Permission to participate"
        name="flag_legal"
        :options="[
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 },
        ]"
        validation="required"
      />
      <FormKit
        type="select"
        label="Photo permission"
        name="flag_photo"
        :options="[
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 },
        ]"
        validation="required"
      />
      <FormKit
        type="text"
        label="Street"
        name="account_addr_street"
        validation="required"
      />
      <FormKit
        type="text"
        label="Street Ext"
        name="account_addr_street_ext"
      />
      <FormKit
        type="text"
        label="City"
        name="account_addr_city"
        validation="required"
      />
      <FormKit
        id="account_addr_country"
        type="select"
        label="Country"
        name="account_addr_country"
        :options="justCountries"
        validation="required"
      />
      <FormKit
        id="account_addr_state"
        type="select"
        label="Region"
        name="account_addr_state"
        :options="justRegions"
        validation="required"
      />
      <FormKit
        type="text"
        label="Postal Code"
        name="account_addr_postal"
        validation="required"
      />

      <input-telephone
        :tnumber="state.account_addr_phone"
        @update="(t) => (state.account_addr_phone = t.value)"
      />

      <FormKit
        type="select"
        label="Member type"
        placeholder="Select member type"
        name="member_type_id"
        :options="[
          { label: 'Active', value: 11 },
          { label: 'Alumni', value: 15 },
          { label: 'Pending', value: 12 },
        ]"
        validation="required"
      />
      <FormKit
        type="select"
        label="Receive newsletter?"
        name="newsletter_recipient"
        :options="[
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 },
        ]"
      />
      <FormKit
        type="select"
        label="Receive US Mail?"
        name="mail_recipient"
        :options="[
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 },
        ]"
      />
      <FormKit
        type="select"
        label="Receive SMS messages?"
        name="sms_recipient"
        :options="[
          { label: 'Yes', value: 1 },
          { label: 'No', value: 0 },
        ]"
      />
      <display-alert />
      <display-cancelform :destination="'/admin/accounts_flag'" />
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
  import { getNode } from '@formkit/core'
  import { useAlertStore } from '~/stores/alertStore'
  const alert = useAlertStore()
  const { getCountries, setRegions } = useLocations()
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

  // errors
  const errors = computed(() => {
    return alert.message !== null ? [alert.message] : ['']
  })

  // Formkit preparations
  //
  // create coutry and region options formatted for Formkit
  const justCountries = ref(getCountries())
  const justRegions = ref(setRegions(state.value.account_addr_country))

  // Region depends on country
  onMounted(() => {
    // Use the IDs of the inputs you want to get
    const countryNode = getNode('account_addr_country')

    // Here we are listening for the 'commit' event
    countryNode.on('commit', ({ payload }) => {
      // We update the value of the regions
      justRegions.value = setRegions(payload)
    })
  })

  // form handlers
  //
  const submitForm = (local_state) => {
    saving.value = true
    emit('submitted', { ...local_state })
  }
</script>
