<template>
  <div v-if="edit_form">
    <div class="topsectioncenter">
      <div class="topsectionitem">
        <div
          class="text-left my-text-style border-round-md md:border-round-lg shadow-6 mb-3 m-2 p-4"
        >
          <p class="font-semibold">
            Can not edit choices after voting has begun!
          </p>
          <p class="font-semibold">
            To change choices, Cancel, then Delete the question and Add a new
            question with new choices
          </p>
        </div>
      </div>
      <div class="topsectionitem">
        <p class="font-semibold text-center">
          Voted on {{ question.vote_vote_cnt }} times
        </p>
        <p v-if="saving">
          <ProgressBar
            mode="indeterminate"
            style="height: 6px"
          ></ProgressBar>
          Saving ...
        </p>
      </div>
    </div>
  </div>

  <div class="my-form-style">
    <FormKit
      v-model="question"
      type="form"
      :config="{ validationVisibility: 'live' }"
      submit-label="Submit"
      @submit="submitForm"
    >
      <FormKit
        type="text"
        label="Question"
        name="vote_question"
        validation="required"
      />
    </FormKit>
    <display-cancelform :destination="'/admin/votes'" />

    <!-- FormKit list input Voodoo -->
    <div>
      <h6 v-if="!edit_form">Add Choices - When finished choose Submit</h6>
    </div>
    <div>
      <h6
        v-if="!choice_values.length"
        class="alert-danger w-full"
      >
        Choices required
      </h6>
    </div>
    <FormKit
      #default="{ items, node, value }"
      v-model="choice_values"
      type="list"
      dynamic
    >
      <div v-if="edit_form">
        <FormKit
          v-for="(item, index) in items"
          :key="item"
          :index="index"
          :label="
            choices[index].vote_picked_cnt !== undefined
              ? 'Picked ' + choices[index].vote_picked_cnt + ' times'
              : ''
          "
          disabled
        />
      </div>
      <div v-else>
        <FormKit
          v-for="(item, index) in items"
          :key="item"
          :index="index"
          :label="`# ${index + 1}`"
          suffix-icon="trash"
          :sections-schema="{
            suffixIcon: {
              // change wrapper to a button for accessibility
              $el: 'button',
            },
          }"
          @suffix-icon-click="
            () => node.input(value.filter((_, i) => i !== index))
          "
        />

        <Button
          type="button"
          label="Add choice"
          @click="() => node.input(value.concat(''))"
        >
        </Button>
      </div>
    </FormKit>
  </div>
</template>

<script setup>
  // control Prgress Bar
  const saving = ref(false)

  // Outgoing
  //
  const emit = defineEmits(['submitted'])

  // Incoming
  //
  const props = defineProps({
    state: { type: Object, required: true },
  })

  const question = ref({ ...props.state })
  const choices = ref([...props.state.choices])

  // edit if there is an id - add if not
  const edit_form = question.value.vote_question_id !== '0' ? true : false

  const choice_values = ref([])
  const updated_choices = ref([])

  // create list of choice_values for Formkit (only contains choice value)
  choices.value.forEach((choice) => {
    if (choice.vote_choice !== '') {
      choice_values.value.push(choice.vote_choice)
    }
  })

  // form handlers
  //
  const submitForm = (question) => {
    saving.value = true
    // insert updated choice values back into choices

    // problem in add
    choice_values.value.forEach((item, index) => {
      if (edit_form) {
        updated_choices.value.push({
          vote_choice: item,
          vote_picked_cnt: choices.value[index].vote_picked_cnt,
          vote_choice_id: choices.value[index].vote_choice_id,
        })
      } else {
        updated_choices.value.push({
          vote_choice: item,
          vote_picked_cnt: 0,
        })
      }
    })
    // delete old choices and replace with new
    question.choices = []
    question.choices = updated_choices.value

    emit('submitted', question)
  }
</script>

<style>
  .formkit-suffix-icon {
    appearance: none;
    background: none;
    border: none;
    font-size: 1em;
  }
</style>
