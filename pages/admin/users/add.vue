<template>
  <div>
    <Head>
      <Title>Add User</Title>
    </Head>

    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Add User" />
      </div>
      <div class="w-full">
        <user-form
          :state="state"
          @submitted="onSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useAuthStore } from '~/stores/authStore'
  import { useAlertStore } from '~/stores/alertStore'
  const auth = useAuthStore()

  definePageMeta({
    middleware: ['auth'],
  })
  const alert = useAlertStore()
  const { onSubmitAdd } = useSubmit()

  //
  // get app names for access perms
  //
  const { data: apps_data } = await useFetch(
    `https://nuxt3.buffalorugby.org/users/getapps`,
    {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  // Init perms for add
  //
  const permsArray = ref([])

  apps_data.value.forEach((i) => {
    permsArray.value.push({
      admin_perm_id: 0,
      admin_app_id: i.admin_app_id,
      admin_app_name: i.admin_app_name,
      admin_perm: 0,
      admin_user_id: 0,
    })
  })

  //
  // Initialize state for add
  //
  const state = ref({
    admin_user_id: '0',
    admin_user_name: '',
    admin_user_email: '',
    password: '',
    perms: permsArray.value,
  })

  //
  // Users form action
  //
  const onSubmit = async function (form_state) {
    alert.clear()
    await onSubmitAdd('users', form_state)
    if (alert.message === null) {
      navigateTo('/admin/users')
    }
  }
</script>
