<script setup>
  // const data = ref({ title: 'my novel' })
  const email = 'ron.astridge@me.com'
  const { data } = await useFetch('/votes/sendballot', {
    method: 'POST',
    body: { email },
  })
</script>

<template>
  <div>
    <!-- <p>title in parent = {{ data }}</p>
    <testvmodel
      :data="data"
      @submitted="($event) => (data = $event)"
    /> -->

    <p>Sending email to {{ email }}</p>
    <p>data = {{ data }}</p>
  </div>
</template>
