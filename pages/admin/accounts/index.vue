<template>
  <div>
    <Head>
      <Title>Accounts List</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>

      <!--Select by email -->
      <div class="topsectionitem">
        <lookup-by-email />
      </div>

      <!--Select member type -->
      <div class="topsectionitem">
        <p class="my-header-style">Member type</p>
        <Dropdown
          v-model="member_type_id"
          :options="memberTypeOptions"
          optionLabel="label"
          optionValue="value"
          placeholder="Select a member type"
        />
      </div>

      <!--Select by alpha -->
      <div class="topsectionitem">
        <p>Last name begins with</p>
        <Dropdown
          v-model="alpha"
          optionLabel="label"
          optionValue="value"
          :options="alphas"
        />
      </div>
      <!--     csv download button -->
      <create-cvs
        filename="accounts.csv"
        :filteredData="filteredData"
      />
    </div>

    <render-list
      :data="filteredData"
      :page="page"
      :app="app"
      :statusable="statusable"
      :editable="editable"
      :deleteable="deleteable"
      :addable="addable"
      :viewable="viewable"
      @changeStatus="changeStatus"
      @deleteItem="deleteItem"
    />

    <!-- player on game roster -->
    <Dialog
      v-model:visible="visible"
      modal
      header="Can't do that"
      :style="{ width: '25rem' }"
    >
      <span class="p-text-secondary block mb-5">{{ message }}</span>

      <template #footer>
        <Button
          label="Continue"
          autofocus
          @click="visible = false"
        />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  definePageMeta({
    middleware: ['auth'],
  })
  const { getAll, deleteOne, changeStatusOne } = useFetchAll()
  const { getMemberTypeOptions } = useMembertypes()

  //
  // get initial values
  //
  const placemark = usePlacemarkStore()

  const alpha = ref(placemark.getAlpha)
  const member_type_id = ref(placemark.getMemberTypeId)
  const page = ref(placemark.getPage)

  //
  // Initialize values for Renderlist
  //
  const { getAccess } = useRenderListAccess()
  const app = 'accounts'
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

  //
  // Get all accounts
  //
  const { data: accounts } = await getAll(app)

  //
  // Filter accounts by member type
  //
  const filteredData = computed(() => {
    let temp = []
    // filter by member type
    temp = accounts.value.filter(function (d) {
      return (
        /*         d.member_type_id === member_type_id.value ||
        d.member_type2_id === member_type_id.value */
        d.member_type_id === member_type_id.value
      )
    })

    // filter by initial letter
    if (alpha.value !== '1') {
      return temp.filter(function (d) {
        return d.member_lastname[0].toUpperCase() === alpha.value
      })
    }
    return temp
  })

  //
  // Set placemarks after changing member type
  //
  watch(member_type_id, (newid) => {
    placemark.setMemberTypeId(newid)
    placemark.setAlpha('1')
    alpha.value = '1'
    placemark.setPage(0)
    page.value = 0
  })

  //
  // Set placemarks after changing Alpha
  //
  watch(alpha, (newalpha) => {
    placemark.setAlpha(newalpha)
    placemark.setPage(0)
    page.value = 0
  })

  //
  // Get membertype options for member type selector
  //
  const memberTypeOptions = await getMemberTypeOptions()

  //
  // Set alpha options for alpha selector
  //
  const alphas = [
    { label: 'Any', value: '1' },
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'E', value: 'E' },
    { label: 'F', value: 'F' },
    { label: 'G', value: 'G' },
    { label: 'H', value: 'H' },
    { label: 'I', value: 'I' },
    { label: 'J', value: 'J' },
    { label: 'K', value: 'K' },
    { label: 'L', value: 'L' },
    { label: 'M', value: 'M' },
    { label: 'N', value: 'N' },
    { label: 'O', value: 'O' },
    { label: 'P', value: 'P' },
    { label: 'Q', value: 'Q' },
    { label: 'S', value: 'S' },
    { label: 'T', value: 'T' },
    { label: 'U', value: 'U' },
    { label: 'V', value: 'V' },
    { label: 'W', value: 'W' },
    { label: 'X', value: 'X' },
    { label: 'Y', value: 'Y' },
    { label: 'Z', value: 'Z' },
  ]
  //
  /*   const tableToCSV = async (filename) => {
    function jsonToCsv(data) {
      console.log('data = ', data)
      if (!Array.isArray(data) || data.length === 0) {
        return ''
      }

      const headers = Object.keys(data[0])
      const csvRows = []

      csvRows.push(headers.join(','))

      for (const row of data) {
        const values = headers.map((header) => {
          const value = row[header]
          return `"${value === null || value === undefined ? '' : value}"`
        })
        csvRows.push(values.join(','))
      }
      return csvRows.join('\n')
    }

    function downloadCsv(csvString, filename) {
      const blob = new Blob([csvString], {
        type: 'text/csv;charset=utf-8;',
      })
      const downloadLink = document.createElement('a')
      downloadLink.href = URL.createObjectURL(blob)
      downloadLink.download = filename
      document.body.appendChild(downloadLink)
      downloadLink.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      )
      document.body.removeChild(downloadLink)
    }
    const csvString = jsonToCsv(filteredData.value)
    downloadCsv(csvString, filename)
  } */
  //

  //
  // Renderlist actions - including roster check
  //
  // default warning dialog visibility
  const visible = ref(false)

  //
  // default message for found on roster
  const message = ref('')

  const deleteItem = async (id) => {
    const msg = await deleteOne(app, id)
    // will not deleteOne if msg is not null
    if (msg.value) {
      message.value = msg.value
      visible.value = true
    }
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne('accounts', { id, status })
  }
</script>
