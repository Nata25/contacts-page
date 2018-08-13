<template>
  <section class="contact-form">
    <h2 class="contact-form__title"
        id="contactUs"
    >
      Contact us
    </h2>
    <p class="contact-form__summary">
      Please tell us more about your request and give us info about your company and country.
    </p>
    <form
      method="post"
      @submit="validate"
      action="/"
      class="contact-form__wrapper"
    >

      <FormInput
        v-model="name"
        name="name"
        id="name"
        label="Name"
        @blur="checkInput"
        :errors="errors.name"
      />

      <FormInput
        v-model="phone"
        name="phone"
        id="phone"
        label="Phone"
        @blur="checkInput"
        :errors="errors.phone"
        :placeholder="'+380673332211'"
      />

      <FormInput
        v-model="email"
        name="phone"
        id="email"
        label="Email"
        @blur="checkInput"
        :errors="errors.email"
      />

      <input
        type="checkbox"
        name="agree"
        id="agree"
        checked
        @change="handleCheckbox"
      />
      <label
        class="contact-form__checkbox"
        for="agree"
      >
        I agree the processing of personal data
      </label>

      <button
        :class="{disabled: !isFormValid || isFormSubmitted }"
      >Get in touch</button>

    </form>
  </section>
</template>

<script>

  import axios from 'axios';
  import FormInput from '~/components/FormInput.vue';

  export default {
    components: {
      FormInput,
    },
    data() {
      return {
        name: '',
        phone: '',
        email: '',
        errors: {
          name: [
            {
              message: 'Name is required',
              test: function(value) {
                return value === ''
              }
            },
            {
              message: 'Name is too short',
              test: function(value) {
                return value.length < 5 && value.length > 1
              }
            },
          ],
          phone: [
            {
              message: 'Phone number is required',
              test: function(value) {
                return value === ''
              }
            },
            {
              message: 'You need to provide a valid phone number',
              test: function(value) {
                return !/^\+\d{2}0\d{9}$/.test(value) && value.length > 1
              }
            },
          ],
          email: [
            {
              message: 'Email is required',
              test: function(value) {
                return value === ''
              }
            },
            {
              message: 'You need to provide a valid email',
              test: function(value) {
                return !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(value) && value.length > 1
              }
            },
          ]
        },
        isFormValid: false,
        isFormSubmitted: false,
      };
    },
    methods: {
      validate(e) {
        e.preventDefault();
        if (this.isFormValid) {
          const formData = new FormData();
          formData.set('name', this.name.toString());
          formData.set('phone', this.phone.toString());
          formData.set('email', this.email.toString());
          axios({
            method: 'post',
            url: 'http://httpbin.org/post',
            data: formData,
          })
            .then(data => {
              console.log('Form was successfully sent with these data:');
              console.log(data.data.form);
            });
          this.name = '';
          this.phone = '';
          this.email = '';
          this.isFormSubmitted = true;
        }
      },
      checkInput(event) {
        this.isFormValid = event;
      },
      handleCheckbox(event) {
        const currentValidityStatus = this.isFormValid;
        this.isFormValid = currentValidityStatus && event.target.checked;
      }
    }
  }
</script>

<style lang="sass">
  @import '~/assets/styles/_mixins.sass'

  .contact-form
    @include globalPadding
    padding-top: 50px
    padding-bottom: 50px
    background-image: url('~/static/img/pattern.png')
    background-size: 100px

    &__title
      color: var(--white)

    &__summary
      font-size: 18px

    &__wrapper
      display: flex
      flex-direction: column

      label
        margin-bottom: 10px
        padding: 15px 0
        font-size: 16px

      input
        background: transparent
        border: 0

    &__checkbox
      position: relative
      border-bottom: 0

    &__checkbox::before
      display: inline-block
      width: 15px
      height: 15px
      margin-right: 20px
      border: 1px solid var(--black)
      content: ''
      background-color: var(--white)

  input[type=checkbox]
    position: absolute
    bottom: 23px
    opacity: 0

    &:checked + .contact-form__checkbox
      color: var(--white)

    &:checked + .contact-form__checkbox::after
      position: absolute
      top: 20px
      left: 4px
      display: inline-block
      transform: rotate(310deg)
      width: 7px
      height: 5px
      border-bottom: 1px solid var(--black)
      border-left: 1px solid var(--black)
      content: ''

  button
    max-width: 300px
    padding: 30px 60px
    border: 0
    color: var(--white)
    background-color: var(--black)
    text-transform: uppercase
    cursor: pointer

    &.disabled
      opacity: .7

  @include desktop
    .contact-form
      display: flex
      flex-wrap: wrap
      padding-top: 70px
      padding-bottom: 70px

      &__title
        flex: 1 0 100%

      &__wrapper
        order: 1
        flex: 1 1 40%

      &__summary
        margin: 20px 0 0 50px
        order: 2
        flex: 1 0 50%

</style>
