<template>
  <ConfirmDialog></ConfirmDialog>
  <Button
    label="Delete"
    severity="danger"
    outlined
    @click="confirm1()"
  ></Button>
</template>

<script setup>
  import { useConfirm } from 'primevue/useconfirm'
  const confirm = useConfirm()
  const emit = defineEmits(['confirmedDelete'])

  const confirm1 = () => {
    confirm.require({
      message: 'Are you sure you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
      acceptClass: 'p-button-sm',
      rejectLabel: 'Cancel',
      acceptLabel: 'Delete',
      accept: () => {
        emit('confirmedDelete')
      },
      reject: () => {},
    })
  }
</script>
