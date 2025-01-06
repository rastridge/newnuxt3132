<template>
  <div>
    <Head>
      <Title>Other EGU Results and Standingst</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <Common-header title="Empire Geographical Union Stats" />
      </div>
    </div>
    <div>
      <Card>
        <template #content>
          <h3 class="my-header-style">Empire D2 League</h3>
          <iframe
            src="https://xplorer.rugby/empire/fixtures-results?comp=7i8kPXDpmeAyzH2Mu&team=All&season=2025&tab=Fixtures"
            width="100%"
            height="480"
            style="border: 1px solid #eee; background: white"
            frameborder="0"
            scrolling="yes"
          ></iframe>
        </template>
      </Card>
      <div>
        <Card>
          <template #content>
            <h3 class="my-header-style">Empire D3 Upstate League</h3>
            <iframe
              src="https://xplorer.rugby/empire/fixtures-results?comp=9LmeCHHfxEnJCEmap&team=All&season=2025&tab=Fixtures"
              width="100%"
              height="480"
              style="border: 1px solid #eee; background: white"
              frameborder="0"
              scrolling="yes"
            ></iframe>
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>
