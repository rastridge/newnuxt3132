<template>
  <div>
    <Head>
      <Title>Buffalo Rugby Club Welcomes New Players</Title>
    </Head>
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <common-header title="Buffalo Rugby Club Welcomes New Players" />
      </div>
    </div>

    <div class="card mb-1">
      <Fieldset legend="GIVE IT A TRY">
        <p class="m-0">
          Just like any sport, rugby players come in all sizes, depending on the
          position you play. Skills from soccer, football, basketball,
          wrestling, all transfer well to positions in rugby. Rugby is a two way
          sport so good tackling is essential. The one characteristic essential
          rugby is running.<br /><br />
          Signing up is an expression of interest in being informed of the club
          activities and does not imply any commitment financially or
          otherwise.<br />
          Just come to practice / try out and see if we're right for you.<br />

          Now its time to come to a practice ( see the News page for times and
          locations)<br />

          Wear shorts, cleats and a t-shirt ( or warmer if necessary)<br />

          When you arrive, ask someone to point out a coach, introduce yourself.
          <br />
          Watch a drill or activity and join in when comfortable.<br />
        </p>
      </Fieldset>
    </div>

    <div class="card mb-1">
      <Fieldset legend="LATER IF YOU DECIDE TO JOIN">
        <div class="m-0">
          <ul>
            <li>You'll need to become a member of USA Rugby $</li>
            <li>Pay Buffalo Rugby Club dues $</li>
            <li>Practice 2 hours twice a week</li>
            <li>
              Have the ability to travel on weekends to away games as far as NYC
              $
            </li>
          </ul>
        </div>
      </Fieldset>
    </div>
    <div class="card mb-1">
      <Fieldset legend="SIGN UP FOR TRYOUTS HERE">
        <div class="m-0">
          <nuxt-link
            to="/register2"
            class="p-3 bg-primary border-round-lg"
            >SIGN UP</nuxt-link
          >
        </div>
      </Fieldset>
    </div>

    <div class="card">
      <Fieldset legend="THE RUGBY FAMILY">
        <div class="m-0">
          <img
            :src="team"
            width="100%"
          />
        </div>
      </Fieldset>
    </div>
  </div>
</template>

<script setup>
  import team from '~/assets/imgs/carousel/team.png'
</script>

<style>
  .my-button {
    /* Style your button here */

    background-color: blue;

    padding: 10px 20px;

    border: none;

    cursor: pointer;
  }
</style>
