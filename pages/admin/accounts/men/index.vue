<template>
  <div>
    <Head>
      <Title>Accounts List</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>

      <div class="topsectionitem">
        <lookup-by-email />
      </div>

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
      <div class="topsectionitem">
        <FormKit
          v-model="alpha"
          type="select"
          label="Last name begins with"
          :options="alphas"
        />
      </div>
    </div>

    <div>
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
    </div>

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
  const app = 'accounts/men'
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

  //
  // Get all accounts
  //
  const { data: accounts } = await getAll('accounts')

  //
  // Filter accounts by member type
  //
  const filteredData = computed(() => {
    let temp = []
    // filter by member type
    temp = accounts.value.filter(function (d) {
      return (
        d.member_type_id === member_type_id.value ||
        d.member_type2_id === member_type_id.value
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
  // Get alpha options for alpha selector
  //
  const alphas = {
    1: 'All',
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    G: 'G',
    H: 'H',
    I: 'I',
    J: 'J',
    K: 'K',
    L: 'L',
    M: 'M',
    N: 'N',
    O: 'O',
    P: 'P',
    Q: 'Q',
    R: 'R',
    S: 'S',
    T: 'T',
    U: 'U',
    V: 'V',
    W: 'W',
    X: 'X',
    Y: 'Y',
    Z: 'Z',
  }

  //
  // Renderlist actions - including roster check
  //
  // default warning dialog visibility
  const visible = ref(false)
  //
  // default message for found on roster
  const message = ref('')

  const deleteItem = async (id) => {
    const msg = await deleteOne('accounts', id)
    // will not deleteOne if msg is not null
    if (msg.value) {
      message.value = msg.value
      visible.value = true
    }
    /* else {
      // remove from accounts
      // will trigger change in filteredData passed to renderlist
      accounts.value = accounts.value.filter((u) => u.id !== id)
    } */
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne('accounts', { id, status })
  }
</script>
