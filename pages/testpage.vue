<template>
  <div>
    <displayDeleteconfirm @confirmedDelete="confirmedDelete" />
  </div>
</template>

<script setup>
  const id = ref(999)

  const confirmedDelete = () => {
    console.log('deleting ', id.value)
  }
</script>
