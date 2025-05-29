<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Get opponent id
  //
  const route = useRoute()
  const id = route.params.id

  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/opponents/${id}`,
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
  // Opponents form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('opponents', state)
    navigateTo(`/admin/opponents`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Opponent</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit opponent" />
      </div>
      <opponents-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
