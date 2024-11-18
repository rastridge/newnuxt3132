export const usePlacemarkStore = defineStore('placemark', {
  state: () => ({
    page: 0,
    alpha: '1',
    year: 0,
    season_year: 0,
    membertypeid: 2,
    gametypeid: 1,
  }),

  getters: {
    getPage: (state) => state.page,
    getAlpha: (state) => state.alpha,
    getMemberTypeId: (state) => state.membertypeid,
    getGameTypeId: (state) => state.gametypeid,
    getYear: (state) => state.year,
    getSeasonYear: (state) => state.season_year,
  },

  actions: {
    initYear() {
      const { $dayjs } = useNuxtApp()
      this.year = parseInt($dayjs().format('YYYY'))
    },
    initSeason() {
      const { $dayjs } = useNuxtApp()
      const SEASON_DIVIDE_DT = useRuntimeConfig().public.SEASON_DIVIDE_DT

      this.season_year =
        $dayjs().format() <
        $dayjs($dayjs().format('YYYY') + SEASON_DIVIDE_DT).format()
          ? parseInt($dayjs().format('YYYY')) - 1
          : parseInt($dayjs().format('YYYY'))
    },
    setPage(p) {
      this.page = p
    },
    setAlpha(a) {
      this.alpha = a
    },
    setYear(y) {
      this.year = y
    },
    setSeasonYear(s) {
      this.season_year = s
    },
    setMemberTypeId(id) {
      this.membertypeid = id
    },
    setGameTypeId(id) {
      this.gametypeid = id
    },
  },
})
