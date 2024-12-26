<template>
  <div>
    <p>Sending email to {{ email }}</p>
    <p>info = {{ info }}</p>
  </div>
</template>

<script setup>
  const email = 'ron.astridge@me.com'
  const { data } = await useFetch('/atesting/sendawait', {
    method: 'POST',
    body: { email },
  })
  const info = ref(data.value)
</script>
