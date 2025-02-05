<template>
  <div>
    <ConfirmDialog></ConfirmDialog>
    <Button
      label="Delete"
      severity="danger"
      outlined
      @click="confirm2()"
    ></Button>
    {{ result }}
  </div>
</template>

<script setup>
  import { useConfirm } from 'primevue/useconfirm'
  const result = ref('')

  const confirm = useConfirm()
  const confirm2 = () => {
    confirm.require({
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      acceptLabel: 'Delete',
      rejectClass: 'p-button-secondary p-button-outlined',
      acceptClass: 'p-button-danger',
      accept: () => {
        result.value = 'deleting'
      },
      reject: () => {
        result.value = 'cancel'
      },
    })
  }
</script>
