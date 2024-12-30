<template>
  <div id="documents">
    <Head>
      <Title>Buffalo Rugby Club Document Archive </Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <common-header title="Document Archive" />
      </div>
      <div class="topsectionitem">
        <select-year
          :startyear="startyear"
          :currentyear="year"
          class="mb-3"
          @submitted="onSubmit"
        />
      </div>
    </div>
    <div class="my-simple-card-style">
      <div>
        <ul class="list-none my-text-style">
          <li
            v-for="itm in filteredData"
            :key="itm.id"
            class="text-600 bg-white border-0 border-round-lg p-3 m-2"
          >
            <div>
              <span class="text-sm md:text-lg text-600">
                {{ $dayjs(itm.archive_date).format('YYYY MMMM') }}
              </span>
              -
              <span class="text-sm md:text-lg text-600 font-semibold">
                {{ itm.archive_title }}
              </span>
              <br />
              <span class="text-xs md:text-sm text-600">
                {{ itm.archive_description }}
              </span>
              <Button
                label="Open"
                text
                size="small"
                class="cursor-pointer"
                @click.prevent="showDocument(itm)"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <Dialog
      v-model:visible="displayModal"
      :pt="{
        root: {
          style: {
            padding: '0',
            minWidth: '10rem',
            width: '95%',
            'border-radius': '20px',
          },
        },
        header: {
          style: {
            'background-color': '#CCC',
          },
        },
        content: {
          style: {
            padding: '1rem',
            'background-color': '#EEE',
          },
        },
        footer: {
          style: {
            'background-color': '#CCC',
            padding: '1rem',
          },
        },
      }"
    >
      <template #header>
        <div class="font-semibold text-md lg:text-lg">
          {{ selectedItem.archive_title }}
        </div></template
      >
      <!-- content -->
      <div>
        <iframe
          :src="selectedItem.archive_filepath"
          width="100%"
          height="700"
          style="border: none; overflow: hidden"
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        />
      </div>

      <template #footer>
        <div>
          <Button
            label="Return to Document Archive"
            class="p-button-sm"
            autofocus
            @click="closeModal"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  const { $dayjs } = useNuxtApp()

  // initial values
  const year = ref(parseInt($dayjs().format('YYYY')))
  const startyear = 1966

  const filteredData = computed(() => {
    return archives.value.filter((d) => {
      return parseInt($dayjs(d.dt).format('YYYY')) === year.value
    })
  })
  const onSubmit = (value) => {
    year.value = value
  }

  const displayModal = ref(false)

  const openModal = () => {
    displayModal.value = true
  }
  const closeModal = () => {
    displayModal.value = false
  }
  const selectedItem = ref(null)

  const showDocument = async (item) => {
    selectedItem.value = item
    openModal()
  }

  //
  // Get current archives
  //
  const { data: archives } = await useFetch('/archive/getallcurrent', {
    method: 'get',
  })
</script>
