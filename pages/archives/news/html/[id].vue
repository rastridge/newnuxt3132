<template>
  <p>{{ data.news_article }}</p>
</template>

<script setup>
  setPageLayout('')
  useSeoMeta({
    title: 'The Buffalo Rugby Club',
    url: 'https://experimental--buffalorugbyorg.netlify.app/archives/news/html/1067',

    ogTitle: 'The Buffalo Rugby Club',
    description: 'Welcome to the Buffalo Rugby Club',
    ogDescription: 'News',
    ogUrl:
      'https://experimental--buffalorugbyorg.netlify.app/archives/news/html/1067',
    ogImage: 'https://experimental--buffalorugbyorg.netlify.app//bflo_blue.png',
  })
  //
  // Get content id parameter
  //
  const route = useRoute()
  const id = route.params.id
  //
  // Get custom page content
  //
  const { data } = await useFetch(`https://nuxt3.buffalorugby.org/news/${id}`, {
    method: 'get',
  })
</script>
