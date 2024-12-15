<script setup>
  import { useAuthStore } from '~/stores/authStore'
  import Swal from 'sweetalert2'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })

  const { addNewsletter } = useNewsletter()
  //
  // Formkit initial state
  //
  const state = ref({
    newsletter_id: '',
    newsletter_recipient_type_id: 9,
    newsletter_body_text: '',
    admin_user_id: auth.user.admin_user_id,
  })

  //
  // Newsletters form action
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
        addNewsletter(state, 'sendNow')
        Swal.fire('Saved and Sent', '', 'success')
        // navigateTo('/admin/newsletters')
      } else if (result.isDenied) {
        addNewsletter(state, 'sendLater')
        Swal.fire('Saved', '', 'success')
        // navigateTo('/admin/newsletters')
      } else if (result.isDismissed) {
        // navigateTo('/admin/newsletters')
      }
      navigateTo('/admin/newsletters')
    })
  }
</script>

<template>
  <div>
    <Head>
      <Title>Add Newsletter</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add Newsletter" />
      </div>
      <newsletters-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import 'sweetalert2/src/sweetalert2.scss';
</style>
