<script setup>
  import { useAuthStore } from '~/stores/authStore'
  // import { useAlertStore } from '~/stores/alertStore'

  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })

  const alert = useAlertStore()
  const { onSubmitEdit } = useSubmit()

  //
  // Get sponsor id
  //
  const route = useRoute()
  const id = route.params.id

  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/sponsors/${id}`,
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
  // sponsors form action
  //
  const onSubmit = async function (state) {
    alert.clear()
    await onSubmitEdit('sponsors', state)
    if (alert.message === null) {
      navigateTo(`/admin/sponsors`)
    }
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Sponsor</Title>
    </Head>
    <display-admin-header title="Sponsor" />

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit sponsor" />
      </div>
      <sponsors-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
