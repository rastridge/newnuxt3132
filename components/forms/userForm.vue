<template>
  <div class="my-form-style">
    <div class="text-left">
      <p
        v-if="saving"
        class="text-2xl"
      >
        <ProgressBar
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        Saving ...
      </p>

      <Button
        class="mb-4 mr-4"
        label="Submit user"
        @click="submitForm(state)"
      >
      </Button>

      <display-alert />
      <display-cancelform :destination="'/admin/users'" />
    </div>
    <label
      for="admin_user_name"
      class="block text-900 font-medium mb-2"
      >Username</label
    >
    <InputText
      id="admin_user_name"
      v-model="state.admin_user_name"
      type="text"
      class="w-full mb-3"
      size="small"
    />
    <p
      v-if="username_required"
      class="alert-danger"
    >
      Required
    </p>

    <label
      for="admin_user_email"
      class="block text-900 font-medium mb-2"
      >Email</label
    >
    <InputText
      id="admin_user_email"
      v-model="state.admin_user_email"
      type="email"
      class="w-full mb-3"
      size="small"
    />
    <p
      v-if="email_required"
      class="alert-danger"
    >
      Required
    </p>

    <div v-if="!addForm">
      <label
        for="reset"
        class="block text-900 font-medium mb-2"
        >Change password</label
      >
      <Checkbox
        id="reset"
        v-model="reset"
        :binary="true"
      />
    </div>
    <!-- new password if reset or new user -->
    <div v-if="reset || addForm">
      <label
        for="password"
        class="block text-900 font-medium mb-2"
        >New Password:</label
      >
      <InputText
        id="password"
        v-model="state.password"
        type="password"
        class="w-full mb-3"
        size="small"
      />

      <p
        v-if="password_required"
        class="alert-danger"
      >
        Required
      </p>
      <label
        for="repeatPass"
        class="block text-900 font-medium mb-2"
        >Repeat Password:</label
      >
      <InputText
        id="repeatPass"
        v-model="repeatPass"
        type="password"
        class="w-full mb-3"
        size="small"
      />
      <p
        v-if="!match"
        class="alert-danger"
      >
        No match
      </p>
    </div>

    <!-- conflict - existing email or username  -->
    <display-alert />

    <div class="m-5 md:text-xl font-semibold text-center">
      Admin User Permissions
    </div>
    <div class="mb-3">
      <table
        style="margin-left: auto; margin-right: auto"
        class="my-text-style"
      >
        <thead>
          <tr>
            <th class="text-left">Application</th>
            <th>Manage</th>
            <th>Create</th>
            <th>View</th>
            <th style="white-space: nowrap">No access</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in apps_data"
            :key="item.admin_app_id"
          >
            <td class="text-end">{{ item.admin_app_name }}:</td>
            <td>
              <div>
                <input
                  v-model="state.perms[index].admin_perm"
                  type="radio"
                  value="3"
                />
              </div>
            </td>
            <td>
              <div>
                <input
                  v-model="state.perms[index].admin_perm"
                  type="radio"
                  value="2"
                />
              </div>
            </td>
            <td>
              <div>
                <input
                  v-model="state.perms[index].admin_perm"
                  type="radio"
                  value="1"
                />
              </div>
            </td>
            <td>
              <div>
                <input
                  v-model="state.perms[index].admin_perm"
                  type="radio"
                  value="0"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center">
      <p v-if="saving">
        <ProgressBar
          mode="indeterminate"
          style="height: 6px"
        ></ProgressBar>
        Saving ...
      </p>
      <display-cancelform :destination="'/admin/users'" />
      <Button
        class="p-button mb-4 mr-4"
        label="Submit user"
        @click="submitForm(state)"
      >
      </Button>
    </div>
  </div>
</template>

<script setup>
  import { useAlertStore } from '~/stores/alertStore'
  const alert = useAlertStore()
  const saving = ref(false)

  //
  // Incoming
  //
  const props = defineProps({
    state: { type: Object, required: true },
  })
  const state = ref({ ...props.state })
  const addForm = ref(state.value.admin_user_id === '0' ? true : false)

  const apps_data = ref(state.value.perms)
  //
  // outgoing
  //
  const emit = defineEmits(['submitted'])

  //
  //
  // password change input
  //
  const reset = ref(false)
  const repeatPass = ref('')
  /* 	const resetPassword = () => {
		reset.value = !reset.value
	} */

  //
  // Input validations
  //
  const match = computed(() => state.value.password === repeatPass.value)
  const password_required = computed(() => state.value.password === '')
  const username_required = computed(() => state.value.admin_user_name === '')
  const email_required = computed(() => state.value.admin_user_email === '')

  const submitForm = (state) => {
    let ok = false
    if (
      !reset.value &&
      !addForm.value &&
      !username_required.value &&
      !email_required.value
    ) {
      ok = true
    }

    if (
      (reset.value || addForm.value) &&
      !username_required.value &&
      !email_required.value &&
      !password_required.value &&
      match.value
    ) {
      ok = true
    }

    if (ok) {
      saving.value = true
      emit('submitted', state)
    } else {
      alert.error('Incomplete form')
    }
  }
</script>
