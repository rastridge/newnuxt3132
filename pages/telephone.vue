<template>
  <div>
    phonenumber = {{ phonenumber }}
    <input-telephone
      :tnumber="phonenumber"
      @update="(t) => (phonenumber = t.value)"
    />
  </div>
</template>

<script setup>
  const phonenumber = ref(null)
</script>
