<template>
  <div id="videos">
    <Head>
      <Title>Buffalo Rugby Club Videos </Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <common-header title="Videos Archive" />
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
      <div v-if="filteredData.length">
        <ul class="list-none my-text-style">
          <li
            v-for="itm in filteredData"
            :key="itm.video_id"
            class="cursor-pointer bg-white border-round-lg border-1 p-3 m-2"
            href="#"
            @click.prevent="selectItem(itm.video_id)"
          >
            <span class="font-italic">
              {{ $dayjs(itm.dt).format('YYYY MMM') }}
            </span>
            -
            <span class="font-semibold">
              {{ itm.video_title }}
            </span>
            -
            <span class="text-lg">
              {{ itm.video_synop }}
            </span>
            -
            <span class="text-sm">
              {{ itm.video_id }}
            </span>
            <span class="text-xs md:text-sm text-blue-600 cursor-pointer">
              - Open</span
            >
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="my-text-style text-center">No videos for this year</p>
      </div>
    </div>

    <!-- Modal -->
    <Dialog v-model:visible="displayModal">
      <template #header>
        <div>
          <h4>{{ item.video_title }}</h4>
        </div></template
      >
      <div>
        <!-- <div class="embed-responsive embed-responsive-16by9"> -->
        <iframe
          width="560"
          height="315"
          :src="item.video_url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
        <!-- </div> -->
      </div>
      <template #footer>
        <div>
          <Button
            class="p-button-sm"
            autofocus
            label="Return"
            @click="closeModal"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
  import { getIdFromURL } from 'vue-youtube-embed'
  const { $dayjs } = useNuxtApp()

  //
  // year select
  // initial values
  //
  const year = ref(parseInt($dayjs().format('YYYY')))
  const startyear = 1985
  const onSubmit = (value) => {
    year.value = value
  }

  //
  // filter videos by year
  //
  const filteredData = computed(() => {
    return data.value.filter((d) => {
      return parseInt($dayjs(d.dt).format('YYYY')) === year.value
    })
  })

  const item = ref({})
  //
  // Get all current videos
  //
  const { data } = await useFetch('/videos/getallcurrent', {
    method: 'get',
  })

  //
  // get selected video
  //
  const selectItem = async (id) => {
    item.value = await getOne(id)
    //
    // open modal or open window depeding on video source?
    //
    if (item.value.video_url.includes('yout')) {
      item.value.video_url =
        'https://www.youtube.com/embed/' + getIdFromURL(item.value.video_url)
      openModal()
    } else {
      window.open(item.value.video_url)
    }
  }

  const getOne = async (id) => {
    const { data } = await useFetch('/videos/' + id, {
      method: 'get',
    })
    return data.value
  }

  //
  // video modal
  //
  const displayModal = ref(false)
  const openModal = () => {
    displayModal.value = true
  }
  const closeModal = () => {
    displayModal.value = false
  }
</script>
