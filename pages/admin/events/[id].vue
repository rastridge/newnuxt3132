<script setup>
  definePageMeta({
    middleware: ['auth'],
  })
  const auth = useAuthStore()

  const { onSubmitEdit } = useSubmit()

  //
  // Get news item id
  //
  const route = useRoute()
  const id = route.params.id

  //
  // Initialize Edit form
  //
  const { data: state } = await useFetch(`/events/${id}`, {
    method: 'get',
    headers: {
      authorization: auth.user.token,
    },
  })

  //
  // News form action
  //
  const onSubmit = async function (form_state) {
    await onSubmitEdit('events', form_state)
    navigateTo(`/admin/events`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit event</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Events" />
      </div>
      <events-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
