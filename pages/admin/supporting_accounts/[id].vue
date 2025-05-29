<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  definePageMeta({
    middleware: ['auth'],
  })
  const { onSubmitEdit } = useSubmit()

  //
  // Get supporting accts id
  //
  const route = useRoute()
  const id = route.params.id

  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/supporting_accounts/${id}`,
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
    await onSubmitEdit('supporting_accounts', state)
    navigateTo(`/admin/supporting_accounts`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Supporting Accounts</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Supporting Accounts" />
      </div>
      <supportingaccounts-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
