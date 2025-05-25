<template>
  <div id="event">
    <Head>
      <Title>Buffalo Rugby Club Events</Title>
    </Head>
    <div class="center-content">
      <common-header title="Events" />
    </div>
    <div class="my-simple-card-style">
      <Card
        v-for="item in data"
        :key="item.id"
        class="flex justify-content-left"
      >
        <template #content>
          <p class="md:text-xl font-semibold">
            {{ $dayjs(item.event_dt).format('MMM D, YYYY') }}
          </p>
          <p class="md:text-xl font-semibold">{{ item.title }}</p>

          <p class="md:text-lg">
            {{ item.event_description }} LOCATION: {{ item.event_location }}
          </p></template
        >
      </Card>
    </div>
  </div>
</template>

<script setup>
  const { $dayjs } = useNuxtApp()

  //
  // Get current news
  //
  const { data } = await useFetch(
    'https://nuxt3.buffalorugby.org/events/current',
    {
      method: 'get',
    },
  )
</script>
