<template>
  <div>
    <Head>
      <Title>{{ app }} admin</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <display-admin-header :title="app" />
      </div>

      <div
        v-if="pending"
        class="topsectionitem"
      >
        Loading ...
      </div>
      <div v-else>
        <div class="topsectionitem">
          <select-year
            :startyear="startyear"
            :currentyear="year"
            class="mb-3"
            @submitted="onSubmit"
          />
        </div>
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
  import { usePlacemarkStore } from '~/stores/placemarkStore'
  definePageMeta({
    middleware: ['auth'],
  })
  const placemark = usePlacemarkStore()
  const { getAll, deleteOne, changeStatusOne } = useFetchAll()
  //
  // Initialize values for Renderlist and Select Year
  //
  const { getAccess } = useRenderListAccess()
  const app = 'archive'
  const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
  const page = ref(placemark.getPage)

  //
  // Initialize year select
  //
  const startyear = 1966
  const { $dayjs } = useNuxtApp()
  const year = ref(placemark.getYear)

  //
  // Get all archive
  //
  const { data: archive, pending } = await getAll(app)

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
  // Select archive by year
  //
  const filteredData = computed(() => {
    return archive.value.filter((d) => {
      return parseInt($dayjs(d.dt).format('YYYY')) === year.value
    })
  })

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
