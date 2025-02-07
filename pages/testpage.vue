<template>
  <div>
    <!-- <displayDeleteconfirm @confirmedDelete="confirmedDelete" /> -->
    <button @click="test">test</button>
  </div>
</template>

<script setup>
  const { getStatusEmailEE } = useEmailEE()

  const test = async () => {
    getStatusEmailEE('dsfsf')
  }
  // const id = ref(999)

  // const confirmedDelete = () => {
  //   console.log('deleting ', id.value)
  // }
</script>
