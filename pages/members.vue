<template>
  <div>
    <Head>
      <Title>Buffalo Rugby Club Members</Title>
    </Head>
    <Common-header title="Members" />
    <div class="my-simple-card-style">
      <div class="my-datatable-wrapper-style">
        <DataTable
          v-model:expandedRows="expandedRows"
          v-model:filters="filters"
          :value="data"
          dataKey="account_id"
          :globalFilterFields="['member_type']"
          :class="'p-datatable-sm my-text-style'"
          striped-rows
          filterDisplay="row"
          paginator
          :rows="10"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          selectionMode="single"
        >
          <template #empty> No members found. </template>
          <template #loading> Loading Membership data. Please wait. </template>

          <Column
            header="Expand"
            expander
            style="width: 5rem"
          />
          <Column
            header="Name"
            field="NAME"
            :showFilterMenu="false"
            style="width: 20rem"
          >
            <template #body="{ data }">
              {{ data.member_firstname }} {{ data.member_lastname }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
                @input="filterCallback()"
              />
            </template>
          </Column>
          <Column
            field="member_year"
            header="Year Joined"
            :showFilterMenu="false"
            sortable
            style="width: 20rem"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by year"
                @input="filterCallback()"
              />
            </template>
          </Column>
          <Column
            field="member_type"
            header="Member Type"
            :showFilterMenu="false"
          >
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown
                v-model="filterModel.value"
                :options="member_types"
                placeholder="Search by member type"
                :showClear="true"
                style="width: 10rem"
                @change="filterCallback()"
              >
              </Dropdown>
            </template>
          </Column>
          <template #expansion="slotProps">
            <div class="p-3">
              <table>
                <tbody>
                  <tr>
                    <th>Email</th>
                    <th>Previous club</th>
                    <th>Position</th>
                    <th>15s Games</th>
                    <th>7s Games</th>
                    <th>WOF</th>
                  </tr>
                  <tr>
                    <td style="width: 25%">
                      <expose-email :email="slotProps.data.account_email" />
                    </td>
                    <td style="width: 25%">
                      {{ slotProps.data.member_prev_club }}
                    </td>
                    <td style="width: 20%">
                      {{ slotProps.data.member_position }}
                    </td>
                    <td style="width: 15%">
                      {{ slotProps.data.fifteensct }}
                    </td>
                    <td style="width: 15%">
                      {{ slotProps.data.sevensct }}
                    </td>
                    <td style="width: 5%">
                      {{ slotProps.data.member_wall_of_fame_year }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </DataTable>
      </div>
    </div>
    <div>
      <recent-updates />
    </div>
  </div>
</template>

<script setup>
  import { FilterMatchMode } from 'primevue/api'
  const expandedRows = ref([])

  //
  // Get current news
  //
  const { data } = await useFetch('/accounts/getshow', {
    method: 'get',
  })

  // const  checkAccountId = (id) => id === 1

  // const onRowExpand = async (event) => {}
  //
  // filter value criteria
  //
  const filters = ref({
    NAME: { value: null, matchMode: FilterMatchMode.CONTAINS },
    member_type: { value: null, matchMode: FilterMatchMode.EQUALS },
    member_year: { value: null, matchMode: FilterMatchMode.EQUALS },
  })

  const member_types = ref([
    'Alumni',
    'Active',
    'Pending',
    'Ad_Astra',
    'Development',
    'Other',
    'Special',
    'Sponsor',
    'Flag',
    'Flag Pending',
  ])
</script>
