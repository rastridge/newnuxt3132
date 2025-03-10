<template>
  <div id="contributions">
    <Head>
      <Title>Buffalo Rugby Club Contributions</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <common-header title="Contributions" />
      </div>
      <!-- Paypal-->
      <div class="topsectionitem mb-2">
        <Card>
          <template #content>
            <h5>Buffalo Rugby Alumni Fund Paypal</h5>
            <form
              action="https://www.paypal.com/donate"
              method="post"
              target="_top"
            >
              <input
                type="hidden"
                name="hosted_button_id"
                value="EH2TSRTGPZVPY"
              />
              <input
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                border="0"
                name="submit"
                title="PayPal - The safer, easier way to pay online!"
                alt="Donate with PayPal button"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </template>
        </Card>
      </div>
      <!-- check-->
      <div class="topsectionitem mb-2">
        <Card>
          <template #content>
            <p>
              Mail check payable to <br />Buffalo Rugby Alumni Fund<br />
              <br />
              Buffalo Rugby Club<br />
              293 Washington Hwy<br />
              Amherst, NY 14226
            </p></template
          >
        </Card>
      </div>

      <!-- venmo-->
      <div class="topsectionitem mb-2">
        <Card>
          <template #content
            ><p>
              <img
                width="100%"
                src="https://media.buffalorugby.org/_img/_news_newsletters/1737562879969-newsletter640-alumnifundvenmo.png"
              /></p
          ></template>
        </Card>
      </div>

      <!-- ------------ yearly contributions --------------------------->
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
      <div class="my-datatable-wrapper-style">
        <h6 class="my-header-style">Number {{ number }} Total ${{ total }}</h6>
        <DataTable
          :value="contributions"
          class="p-datatable-sm my-text-style"
          tableStyle="width: 400px"
          scrollable
          scrollHeight="400px"
          dataKey="contribution_id"
        >
          <template #empty> No contributions found for this year </template>

          <Column
            field="contribution_date"
            header="Date"
            style="white-space: nowrap"
          >
            <template #body="slotProps">
              <div>
                {{
                  $dayjs(slotProps.data.contribution_date).format('MMM YYYY')
                }}
              </div>
            </template>
          </Column>
          <Column
            field="member_lastname"
            header="Contributor"
            frozen
            style="white-space: nowrap"
          >
            <template #body="slotProps">
              <div>
                {{
                  slotProps.data.contribution_showName
                    ? slotProps.data.member_firstname +
                      ' ' +
                      slotProps.data.member_lastname
                    : 'Anonymous'
                }}
              </div>
            </template>
          </Column>
          <Column
            field="year_joined"
            header="Joined"
          >
            <template #body="slotProps">
              <div>
                {{
                  slotProps.data.year_joined != 0
                    ? slotProps.data.year_joined
                    : ''
                }}
              </div>
            </template>
          </Column>
          <Column
            field="contribution_amount"
            header="Amount"
          >
            <template #body="slotProps">
              <div>
                {{
                  slotProps.data.contribution_showAmount
                    ? slotProps.data.contribution_amount
                    : ''
                }}
              </div>
            </template>
          </Column>
          <Column
            field="contribution_comment"
            header="Comment"
            style="white-space: nowrap"
            >{{ slotProps.data.contribution_comment }}</Column
          >
        </DataTable>
      </div>
      <div class="card w-full my-text-style">
        <h4 class="my-header-style">The Need</h4>
        <p>
          We need a committed active playing membership of about 50 to be
          successful. The Club is actively welcoming players from local
          colleges, from the local high school programs as well as walk-ons.
          Most of the new recruits are younger, seeking jobs or under-employed.
          Paying the $300 annual dues and travel expenses to away games is a
          difficult prospect for many of the kids.
        </p>
        <p>
          Over the last two years the Alumni Scholarship Program has helped
          about 8 players per year with the expenses of playing top level rugby.
          Under-employed and unemployed players were invited to sign contracts
          which promise they will pay half their annual dues up front, work as
          needed at club functions and attend practices regularly. At the end of
          the season, if the conditions are met the club submits a bill to the
          alumni fund for amount of the second dues installment and a percentage
          of the travel expenses (van rental, room, gas, etc). Approximately
          $6000 alumni dollars have be spent supporting this Program over the
          last three years.
        </p>
        <hr />
        <p>
          Buffalo Rugby Club Old Boys Alumni Fund<br />
          The Buffalo Rugby Club is a Tax Exempt 501c3 Organization. Your
          contributions are tax deductible.<br />
          &nbsp;
        </p>
      </div>
      <div style="width: 480px">
        <div class="my-datatable-wrapper-style">
          <h3 class="my-header-style">Top Contributors</h3>
          <DataTable
            :value="topcontributors"
            class="p-datatable-sm my-text-style"
            tableStyle="width: 100%"
            scrollable
            scrollHeight="400px"
            dataKey="contribution_id"
          >
            <template #empty> No contributions found for this year </template>

            <Column
              field="Name"
              header="Contributor"
              frozen
            >
              <template #body="slotProps">
                <div>
                  {{
                    slotProps.data.showName ? slotProps.data.Name : 'Anonymous'
                  }}
                </div>
              </template>
            </Column>
            <Column
              field="Total"
              header=""
              frozen
            >
              <template #body="slotProps">
                <div>${{ slotProps.data.Total }}</div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const { $dayjs } = useNuxtApp()
  const number = ref(0)
  const total = ref(0)
  //
  // Get year contributions
  //
  const getYearContributiions = async (year) => {
    const { data } = await useFetch(`/contributions/year/${year}`, {
      method: 'get',
    })
    let sum = 0
    for (let i = 0; i < data.value.length; i++) {
      sum += data.value[i].contribution_amount
    }
    number.value = data.value.length
    total.value = sum
    contributions.value = data.value
  }

  //
  // Get top contributions all time
  //
  /*   const getTopContributors = async () => {
    const { data } = await useFetch(`/contributions/top`, {
      method: 'get',
    })
    topcontributors.value = data.value
  } */

  // topcontributors values
  const { data: topcontributors } = await useFetch(`/contributions/top`, {
    method: 'get',
  })

  // initial values
  const year = parseInt($dayjs().format('YYYY'))
  const contributions = ref([])
  getYearContributiions(year)

  //
  // Select year start year
  //
  const startyear = 2012
  //
  // get year contributions
  //
  const onSubmit = (year) => {
    getYearContributiions(year)
  }
</script>
