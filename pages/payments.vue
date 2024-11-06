<template>
  <div id="payments">
    <Head>
      <Title>Buffalo Rugby Club Payments</Title>
    </Head>
    <div class="center-content">
      <common-header title="Payments" />
    </div>

    <div
      class="my-simple-card-style flex flex-column md:flex-row flex-wrap align-items-center md:align-items-start justify-content-center"
    >
      <nuxt-link
        to="https://www.paypal.com/donate/?hosted_button_id=A5QYZFLSHHK5E"
        >Paypal</nuxt-link
      >

      <Card
        v-for="item in payments"
        :key="item.id"
        style="width: 320px"
        class="flex justify-content-center"
      >
        <!-- <template #header> {{ item.title }}</template> -->
        <template #title>
          <h5 class="my-subheader-style">{{ item.title }}</h5>
          <p
            class="my-text-style"
            v-html="item.payment_description"
          ></p
        ></template>
        <template #content>
          <p v-html="item.payment_paypal_button"></p
        ></template>
      </Card>
    </div>
  </div>
</template>

<script setup>
  //
  // Get current news
  //
  const { data: payments } = await useFetch('/payments/getallcurrent', {
    method: 'get',
  })
</script>
