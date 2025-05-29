<template>
  <div>
    <Head>
      <Title>Edit Leader</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit leaders" />
      </div>
      <leaders-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Get leader id
  //
  const route = useRoute()
  const id = route.params.id

  // get leaders with id
  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/leaders/${id}`,
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
  // leaders form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('leaders', state)
    navigateTo(`/admin/leaders`)
  }
</script>
