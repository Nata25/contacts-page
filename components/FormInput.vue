<template>
  <div>
    <div class="input-container">
      <input
        @change="handleChange"
        @blur="handleBlur"
        @focus="handleFocus"
        :value="value"
        :name="name"
        :id="id"
        :placeholder="placeholder"
        :class="{ invalid: showedErrors.length }"
      />
      <label :for="id">
        {{ label }}
      </label>
    </div>
    <p
      v-for="(error, ind) in showedErrors"
      :key="ind"
      class="error"
    >
      {{ error.message }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showedErrors: [],
      }
    },
    props: {
      value: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true
      },
      placeholder: {
        type: String,
        required: false,
      },
      errors: {
        type: Array,
        required: true,
      },
    },
    methods: {
      // hide errors when invalid field is focused
      handleFocus() {
        this.showedErrors = [];
      },
      // for v-model
      handleChange(event) {
        this.$emit('input', event.target.value);
      },
      // update error messages and emit event with info about input validity
      handleBlur(event) {
        this.showedErrors = this.errors.filter(error => error.test(event.target.value));
        this.$emit('blur', {id: this.name, found: !!this.showedErrors.length});
      },
    },
  }
</script>

<style lang="sass">
  .input-container
    display: flex
    flex-flow: row-reverse
    max-width: 500px

    label
      padding-right: 10px
      border-bottom: 1px solid

    input
      flex-basis: 100%
      margin-bottom: 10px
      padding-left: 20px
      font-size: 16px
      border-bottom: 1px solid var(--black)
      outline: none

    ::placeholder
      color: var(--white)
      opacity: .4
      font-weight: 100

    input:focus,
    input:focus + label
      color: var(--white)
      border-color: var(--white)

    input.invalid,
    input.invalid + label
      color: var(--red)
      border-color: var(--red)

  .error
    margin-left: 20px
    flex-basis: 100%
    align-self: center
    color: var(--red)
    line-height: 35px

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus
    border: 1px solid green
    -webkit-text-fill-color: var(--white)
    -webkit-box-shadow: 0 0 0 1000px var(--green) inset

</style>
