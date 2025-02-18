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
    <div class="">
      <p>
        Registering is an expression of interest in being informed of the club
        activities and does not imply any commitment financially or otherwise.
      </p>
      <p>Just come to practice and see if we're right for you.</p>
      <u>
        <li>Become a member of USA Rugby $</li>
        <li>Pay Buffalo Rugby Club dues $</li>
        <li>Practice 2 hours twice a week</li>
        <li>
          Have the ability to travel on weekends to away games as far as NYC $
        </li>
      </u>
      <p>We love our sport. We take our preparation seriously and play hard.</p>
      <p>Join us.</p>
      <p>
        Now its time to come to a practice ( see the News page for times and
        locations)
      </p>

      <p>Wear shorts, cleats and a t-shirt ( or warmer if necessary)</p>
      <p>
        When youu arrive, ask someone to point out a coach, introduce yourself.
      </p>
      <p>Do the warmup</p>
      <p>Watch a drill or activity and join in when comfortable</p>
      <p>
        If you enjoy the challenge, ask the coach to change your membership
        status to "Active"
      </p>
      <p>Ask what you need to do to become a full member.</p>

      <p>Register</p>
      <register-form2 @submitted="onSubmit" />

      <img :src="team" />
    </div>
  </div>
</template>

<script setup>
  import team from '~/assets/imgs/carousel/team.png'
</script>
