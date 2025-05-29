<template>
  <div>
    <Head>
      <Title>Buffalo Rugby Club {{ data.newsletter_subject }}</Title>
    </Head>
    <Common-header :title="data.newsletter_subject" />
    <div class="my-simple-card-style">
      <div
        class="my-text-style border-round-xl md:shadow-6 m-1 p-2 md:m-2 md:p-3"
      >
        <span v-html="data.newsletter_body_html"></span>
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
  const { data } = await useFetch(
    `https://nuxt3.buffalorugby.org/newsletters/${id}`,
    {
      method: 'get',
    },
  )
</script>
