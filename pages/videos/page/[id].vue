<template>
  <div class="topsectioncenter">
    <div class="topsectionitem">
      <Common-header :title="data.video_title" />
    </div>
    <div class="text-center">
      <iframe
        width="568"
        height="315"
        :src="data.video_url"
        title="YouTube videoplayr"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  </div>
</template>

<script setup>
  import { getIdFromURL } from 'vue-youtube-embed'

  //
  // Get content id parameter
  //
  const route = useRoute()
  const id = route.params.id
  //
  // Get video
  //
  const { data } = await useFetch('/videos/' + id, {
    method: 'get',
  })

  if (data.value.video_url.includes('yout')) {
    data.value.video_url =
      'https://www.youtube.com/embed/' + getIdFromURL(data.value.video_url)
  } else {
    window.open(data.value.video_url)
  }
</script>
