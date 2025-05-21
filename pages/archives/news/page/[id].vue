<template>
  <div>
    <Head>
      <Title>Buffalo Rugby Club {{ data.news_title }}</Title>
    </Head>
    <Common-header :title="data.news_title" />
    <div class="my-simple-card-style">
      <div
        class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3"
      >
        <span v-html="data.news_article"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
  //
  // Get content id parameter
  //
  const route = useRoute()
  const id = route.params.id
  //
  // Get custom page content
  //
  const { data } = await useFetch(`/news/${id}`, {
    method: 'get',
  })
</script>

<!-- <style lang="css">
  @import '@/assets/css/_myquill.css';
</style> -->
