<template>
  <div>
    <p>Sending email to {{ email }}</p>
    <p>messageid = {{ messageid }}</p>
  </div>
</template>

<script setup>
  const email = 'ron.astridge@me.com'
  const { data } = await useFetch('/atesting/sendawait', {
    method: 'POST',
    body: { email },
  })
  const messageid = ref(data.value)
</script>
