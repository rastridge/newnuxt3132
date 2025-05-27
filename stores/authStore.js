// import { defineStore } from 'pinia'
import { useAlertStore } from '~/stores/alertStore'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    status: { loggedIn: false },
    user: {},
    // keep: { keeped: false },
  }),
  getters: {
    loggingIn: (state) => state.status.loggingIn,
    isLoggedIn: (state) => state.status.loggedIn,
    // isKeeped: (state) => state.keep.keeped,
    getUser: (state) => state.status.user,
  },

  actions: {
    navigate(p) {
      // const router = useRouter()
      return navigateTo({
        path: p,
      })
    },

    /* 		async login(username, password, keeploggedin) {
			this.loginRequest(username, password, keeploggedin)
		},
 */
    async login(username, password) {
      this.loginRequest(username, password)
    },

    async loginRequest(username, password) {
      console.log('loginRequest username = ', username)
      console.log('loginRequest password = ', password)
      const alert = useAlertStore()
      this.status = { loggedIn: false }
      alert.attempt('Logging in . . .')
      const user = await $fetch('/users/authenticate', {
        method: 'POST',
        body: { username, password },
      })
      console.log('loginRequest user = ', user)
      if (user.match) {
        this.user = user
        this.loginSuccess(user)
      } else {
        this.loginFailure()
      }
    },

    loginSuccess(user) {
      this.status = { loggedIn: true }
      this.user = user
      console.log('loginSuccess this.user.token = ', this.user.token)
      sessionStorage.removeItem('auth')
      sessionStorage.setItem('auth', JSON.stringify(this.user))

      const alert = useAlertStore()
      alert.success('Login successful')
      navigateTo('/admin')
    },

    logout() {
      const alert = useAlertStore()
      alert.clear()
      this.status = { loggedIn: false }
      this.user = {}
      sessionStorage.removeItem('auth')
      navigateTo('/')
    },

    /* 		loginFailure() {
			this.status = { loggedIn: false }
			this.keep = { keeped: false }
			this.user = {}
			const alert = useAlertStore()
			alert.error('Login failed - try again')
			navigateTo('/loginpage')
		}, */

    loginFailure() {
      this.status = { loggedIn: false }
      this.user = {}
      const alert = useAlertStore()
      alert.error('Login failed - try again')
      navigateTo('/loginpage')
    },

    /* 		loginAuto() {
			this.user = JSON.parse(localStorage.getItem('auth'))
			this.status = { loggedIn: true }
			this.keep = { keeped: true }
			sessionStorage.setItem('auth', JSON.stringify(this.user))
			navigateTo('/admin')
		}, */
  },
})
