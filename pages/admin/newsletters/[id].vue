<script setup>
  import Swal from 'sweetalert2'
  definePageMeta({
    middleware: ['auth'],
  })

  const { editNewsletter } = useNewsletter()

  //
  // Get news item id
  //
  const route = useRoute()
  const id = route.params.id

  //
  // assign existing data to Edit form
  //
  const { data: state } = await useFetch(`/newsletters/${id}`, {
    method: 'get',
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
        editNewsletter(state, 'sendNow')
        // Swal.fire('Saved and Sent', '', 'success')
        // navigateTo('/admin/newsletters')
      } else if (result.isDenied) {
        editNewsletter(state, 'sendLater')
        // Swal.fire('Saved', '', 'success')
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
      <Title>Edit Newsletter</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Newsletter" />
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
