<script setup>
  import { useAuthStore } from '~/stores/authStore'
  import Swal from 'sweetalert2'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const { addSMS } = useSMS()

  //
  // Initial Add state
  //
  const state = ref({
    sms_id: '',
    sms_recipient_type_id: 13,
    admin_user_id: auth.user.admin_user_id,
  })

  //
  // SMS form action
  //
  const onSubmit = async function (state) {
    Swal.fire({
      title: 'What to do?',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: `Send now`,
      denyButtonText: `Send later`,
    }).then((result) => {
      if (result.isConfirmed) {
        addSMS(state, 'sendNow')
        Swal.fire('Saved and Sent', '', 'success')
      } else if (result.isDenied) {
        addSMS(state, 'sendLater')
        Swal.fire('Saved', '', 'success')
      } else if (result.isDismissed) {
        // this.submitStatus = ''
      }
    })
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add SMS</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add SMS" />
      </div>
      <sms-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'sweetalert2/src/sweetalert2.scss';
</style>
