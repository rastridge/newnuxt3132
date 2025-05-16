<template>
  <div>
    <h6 class="font-semibol">Select Member Type</h6>

    <Dropdown
      v-model="member_type_id"
      :options="memberTypeOptions"
      optionLabel="label"
      optionValue="value"
    />
  </div>
</template>

<script setup>
  //
  // Incoming
  //
  const props = defineProps({
    currenttype: {
      type: Number,
      required: true,
    },
  })
  const member_type_id = ref(props.currenttype)
  // console.log(member_type_id.value)
  // console.log(props.currenttype)

  //
  // Outgoing
  //
  const emit = defineEmits(['submitted'])

  //
  // Info for dropdown
  //
  const { getMemberTypeOptions } = useMembertypes()
  const memberTypeOptions = await getMemberTypeOptions()

  //
  // Watch for dropdown value change
  //
  watch(member_type_id, () => emit('submitted', member_type_id.value))
</script>
