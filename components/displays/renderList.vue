<template>
  <div>
    <div
      v-if="addable"
      class="text-center m-5"
    >
      <Button
        class="p-button-sm"
        label="Add new"
        @click="navigateTo(`/admin/${app}/add`)"
      >
      </Button>
    </div>
    <!-- <ConfirmDialog></ConfirmDialog> -->

    <div
      v-if="viewable"
      class="renderlist-enclosure"
    >
      <div class="my-renderlist-styles">
        <DataTable
          ref="dataTableRef"
          :value="data_local"
          striped-rows
          class="p-datatable-sm p-datatable-generic my-text-style"
          responsiveLayout="scroll"
          :paginator="true"
          :rows="pagesize"
          paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :rows-per-page-options="[10, 20, 50]"
          :first="current"
          current-page-report-template="Showing {first} to {last} of {totalRecords}"
          @page="onPaginate"
        >
          <template #empty> No Data Found. </template>
          <Column
            v-if="statusable"
            field="status"
            header="Use"
            ><template #body="slotProps">
              <a
                href="#"
                @click="
                  changeStatus({
                    id: slotProps.data.id,
                    status: slotProps.data.status,
                  })
                "
                ><i
                  v-if="slotProps.data.status"
                  class="pi pi-thumbs-up"
                ></i
                ><i
                  v-else
                  class="pi pi-thumbs-down-fill"
                ></i
              ></a> </template
          ></Column>
          <Column
            field="title"
            header="Name"
          ></Column>
          <div v-if="data.length && typeof data[0].date_ut !== 'undefined'">
            <Column
              field="date_ut"
              header="Date"
            >
              <template #body="slotProps">
                {{ formatUnixDate(slotProps.data.date_ut) }}
              </template>
            </Column>
          </div>
          <div v-else>
            <Column
              field="dt"
              header="Modified"
            >
              <template #body="slotProps">
                {{ $dayjs(slotProps.data.dt).format('MMM D, YYYY') }}
              </template>
            </Column>
          </div>
          <Column
            v-if="editable || deleteable"
            field="id"
            header="Actions"
            :exportable="false"
            style="min-width: 8rem"
          >
            <template #body="slotProps">
              <nuxt-link
                v-if="editable"
                :to="`/admin/${app}/${slotProps.data.id}`"
                class="me-2"
                ><i class="pi pi-pencil"></i>
              </nuxt-link>
              &nbsp;

              <a
                v-if="deleteable"
                href="#"
                @click="deleteItem(slotProps.data.id)"
                ><i class="pi pi-trash"></i
              ></a>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <!-- Confirm deletion -->
    <Dialog
      v-model:visible="deleteDialog"
      :style="{ width: '450px' }"
      header="Confirm deletion"
      :modal="true"
    >
      <div class="confirmation-content">
        <i
          class="pi pi-exclamation-triangle mr-3"
          style="font-size: 2rem"
        />
        <span class="text-red-600"
          >Are you sure you want to delete this record?</span
        >
      </div>

      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          class="p-button-text"
          @click="deleteDialog = false"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          class="p-button-text"
          @click="confirmedDelete(itemId)"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  import { useConfirm } from 'primevue/useconfirm'
  import { navigateTo } from 'nuxt/app'
  const confirm = useConfirm()

  const placemark = usePlacemarkStore()
  const { $dayjs } = useNuxtApp()
  const { formatUnixDate } = useUnixtime()

  //
  // Incoming
  //
  const props = defineProps({
    data: { type: Array, required: true },
    page: { type: Number, default: 0, required: false },
    pagesize: { type: Number, default: 15, required: false },
    app: { type: String, default: '', required: true },
    statusable: { type: Boolean, default: false, required: false },
    addable: { type: Boolean, default: false, required: false },
    editable: { type: Boolean, default: false, required: false },
    deleteable: { type: Boolean, default: false, required: false },
    viewable: { type: Boolean, default: false, required: false },
  })
  //
  // outgoing
  //
  const emit = defineEmits(['changeStatus', 'deleteItem'])
  //
  // make local copy of input data
  //
  const current = ref(0)
  const data_local = ref([])

  watchEffect(() => {
    // console.log('watcheffect triggered')
    data_local.value = [...props.data]
    current.value = props.page
  })

  //
  // Initial settings for pagination
  //

  //
  // Watch = Save paginator page number
  const onPaginate = (e) => {
    // Only called on first load and when pagination value is clicked
    current.value = e.rows * e.page
    placemark.setPage(current.value)
  }
  //
  // Initial settings for dialog
  //
  const itemId = ref('')
  const deleteDialog = ref(false)

  //
  // Change status in local data and database
  //
  const changeStatus = ({ id, status }) => {
    status = status ? 0 : 1
    // in browser
    const pos = data_local.value.findIndex((u) => u.id === id)
    data_local.value[pos].status = status
    // in DB
    emit('changeStatus', { id, status })
  }
  //
  // Delete in local data and database
  //
  // const deleteItem = (id, event) => {
  const deleteItem = (id) => {
    // save item id
    itemId.value = id
    // open confirm dialog
    deleteDialog.value = true
  }

  /*   const confirm1 = () => {
    confirm.require({
      message: 'Are you sure you want to delete?',
      icon: 'pi pi-exclamation-triangle',
      rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
      acceptClass: 'p-button-sm',
      rejectLabel: 'Cancel',
      acceptLabel: 'Delete',
      accept: () => {},
      reject: navigateTo('/admin/${app}/'),
    })
  } */
  const confirmedDelete = (id) => {
    data_local.value = data_local.value.filter((u) => u.id !== id)
    //
    // confirm deletion
    // confirm1()
    // close confirm dialog
    deleteDialog.value = false
    // "exists in game" warning steps found in deleteItem
    emit('deleteItem', id)
  }
</script>
