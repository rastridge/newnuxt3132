<template>
  <div>
    <AutoComplete
      v-model="selectedItem"
      optionLabel="title"
      :suggestions="filteredNames"
      @complete="search"
      @item-select="submitAccountId"
    />
  </div>
</template>

<script setup>
  //
  // Outgoing
  //
  const emit = defineEmits(['setaccountid'])
  // out

  const submitAccountId = async () => {
    emit('setaccountid', selectedItem.value.account_id)
  }
  //
  // autocomplete values
  //
  const selectedItem = ref('')
  const filteredNames = ref([])
  //
  // helper for autocomplete
  const search = (event) => {
    if (!event.query.trim().length) {
      filteredNames.value = [...suggestions.value]
    } else {
      filteredNames.value = suggestions.value.filter((suggestion) => {
        return (
          suggestion.title
            .toLowerCase()
            // .startsWith(event.query.toLowerCase())
            .includes(event.query.toLowerCase())
        )
      })
    }
  }

  // get suggestions
  const { data: suggestions } = await useFetch(`/accounts/suggestions`, {
    method: 'get',
  })
</script>
