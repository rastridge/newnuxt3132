<template>
  <div id="sponsorad">
    <div class="my-simple-card-style w-full">
      <div v-if="item">
        <a
          :href="item.ad_client_website"
          target="_blank"
        >
          <img
            :src="item.ad_image_path"
            style="width: 100%"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
  const route = useRoute()

  const item = ref({})

  watch(
    () => route.fullPath,
    async () => {
      showRandomSponsor()
    },
  )

  onMounted(async () => {
    showRandomSponsor()
  })

  const showRandomSponsor = async () => {
    const { data } = await useFetch(`/sponsors/getrandom/`, {
      method: 'get',
    })
    item.value = data.value
  }
</script>
