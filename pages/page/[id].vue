<template>
  <div>
    <Head>
      <Title>Buffalo Rugby Club {{ data.content_name }}</Title>
    </Head>
    <Common-header :title="data.content_name" />

    <div class="my-simple-card-style">
      <div
        class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3 bg-blue-600 text-white"
      >
        <span v-html="data.content_body"></span>
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
  const { data } = await useFetch(`/content/${id}`, {
    method: 'get',
  })
</script>
