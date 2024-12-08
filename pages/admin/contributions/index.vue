<template>
  <div>
    <Head>
      <Title>Contributions Admin</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>

      <!--Select year -->
      <div class="topsectionitem">
        <select-year
          :startyear="startyear"
          :currentyear="year"
          class="mb-3"
          @submitted="onSubmit"
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
  </div>
</template>

<script setup>
  import { usePlacemarkStore } from '@/stores/placemarkStore'
  definePageMeta({
    middleware: ['auth'],
  })
  const placemark = usePlacemarkStore()
  const { getAll, deleteOne, changeStatusOne } = useFetchAll()
  const { $dayjs } = useNuxtApp()

  //
  // Initialize values for Renderlist
  //

  const { getAccess } = useRenderListAccess()
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
  const app = 'contributions'
  const page = ref(placemark.getPage)

  //
  // Initialize year select
  //
  const startyear = 2012
  const year = ref(placemark.getYear)

  //
  // Get all contributions
  //
  const { data: contributions } = await getAll(app)
  //
  // filter by year
  //
  const filteredData = computed(() => {
    return contributions.value.filter((d) => {
      return parseInt($dayjs(d.dt).format('YYYY')) === year.value
    })
  })

  //
  // Select year action
  //
  const onSubmit = function (value) {
    year.value = value
    placemark.setYear(year.value)
    // new year - set page to zero
    placemark.setPage(0)
    page.value = 0
  }

  //
  // Renderlist actions
  //
  const deleteItem = async (id) => {
    await deleteOne(app, id)
  }

  const changeStatus = async ({ id, status }) => {
    await changeStatusOne(app, { id, status })
  }
</script>
