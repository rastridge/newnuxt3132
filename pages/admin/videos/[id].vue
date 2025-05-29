<script setup>
  import { useAuthStore } from '~/stores/authStore'
  const auth = useAuthStore()
  const { $dayjs } = useNuxtApp()

  definePageMeta({
    middleware: ['auth'],
  })

  const { onSubmitEdit } = useSubmit()

  //
  // Get video id
  //
  const route = useRoute()
  const id = route.params.id

  const { data: state } = await useFetch(
    `https://nuxt3.buffalorugby.org/videos/${id}`,
    {
      method: 'get',
      headers: {
        authorization: 'Bearer ' + auth.user.token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  )

  // Format for Primevue calendar
  /*   state.value.video_event_dt = $dayjs(data.value.video_event_dt).format(
    'YYYY-MM-DD',
  )
  state.value.video_release_dt = $dayjs(data.value.video_release_dt).format(
    'YYYY-MM-DD',
  )
  state.value.video_expire_dt = $dayjs(data.value.video_expire_dt).format(
    'YYYY-MM-DD',
  ) */

  //
  // Videos form action
  //
  const onSubmit = async function (state) {
    await onSubmitEdit('videos', state)
    navigateTo(`/admin/videos`)
  }
</script>

<template>
  <div>
    <Head>
      <Title>Edit Video</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header title="Edit Video" />
      </div>
      <videos-form
        :state="state"
        @submitted="onSubmit"
      />
    </div>
  </div>
</template>
