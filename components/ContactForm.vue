<template>
  <div class="contact-form">
    <section class="contact-form__section">
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
        @keydown="handleKeydown"
        action="/"
        class="contact-form__data"
      >

      <FormInput
        v-model="name"
        name="name"
        id="name"
        label="Name"
        @blur="checkInput"
        :errors="errors.name.data"
      />

      <FormInput
        v-model="phone"
        name="phone"
        id="phone"
        label="Phone"
        @blur="checkInput"
        :errors="errors.phone.data"
        :placeholder="'+380673332211'"
      />

      <FormInput
        v-model="email"
        name="email"
        id="email"
        label="Email"
        @blur="checkInput"
        :errors="errors.email.data"
      />

      <input
        ref="agree"
        type="checkbox"
        name="agree"
        id="agree"
        checked
        @change="handleCheckbox"
        @blur="checkInput"
      />
      <label
        class="contact-form__checkbox"
        for="agree"
      >
        I agree the processing of personal data
      </label>

      <button
        type="submit"
        :class="{disabled: !isFormValid || !isAgreed || isFormSubmitted}"
      >
        Get in touch
      </button>

      </form>
    </section>
  </div>
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
          name: {
            data: [
              {
                message: 'Name is required',
                test: function(value) {
                  return value === ''
                },
              },
              {
                message: 'Name is too short',
                test: function(value) {
                  return value.length < 3 && value.length > 1
                },
              },
            ],
            found: true,
          },
          phone: {
            data: [
              {
                message: 'Phone number is required',
                test: function(value) {
                  return value === ''
                },
              },
              {
                message: 'You need to provide a valid phone number',
                test: function(value) {
                  return !/^\+\d{2}0\d{9}$/.test(value) && value.length > 1
                },
              },
            ],
            found: true,
          },
          email: {
            data: [
              {
                message: 'Email is required',
                test: function(value) {
                  return value === ''
                },
              },
              {
                message: 'You need to provide a valid email',
                test: function(value) {
                  return !/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(value) && value.length > 1
                },
              },
            ],
            found: true,
          },
        },
        isFormValid: false,
        isAgreed: true,
        isFormSubmitted: false,
      };
    },
    methods: {
      validate(e) {
        e.preventDefault();
        if (this.isFormValid && this.isAgreed) {
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
        if (this.errors[event.id]) {
          this.errors[event.id].found = event.found;
        }

        this.isFormValid = !Object.keys(this.errors).filter(key => {
          return this.errors[key].found
        }).length;
      },
      handleCheckbox(event) {
        this.isAgreed = event.target.checked;
      },
      handleKeydown(event) {
        if (event.which === 13) {
          // checkbox a11y logic
          if (event.target.getAttribute('id') === 'agree') {
            event.preventDefault();
            if (this.$refs.agree.checked) this.$refs.agree.checked = null;
            else this.$refs.agree.checked = 'checked';
            this.isAgreed = this.$refs.agree.checked;
            // prevent from submitting on Enter when in inputs as validation happens on blur
          } else if (event.target.getAttribute('type') !== 'submit') {
            event.preventDefault();
          }
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~/assets/styles/_mixins.sass'

  .contact-form
    padding-bottom: 50px
    background-image: url('~/static/img/pattern.png')
    background-size: 100px

    &__section
      @include maxWidth
      @include globalPadding
      padding-top: 50px

    &__title
      color: var(--white)

    &__summary
      margin-bottom: 20px
      font-size: 18px

    &__data
      position: relative
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
    bottom: 103px
    left: 20px
    opacity: 0

    &:focus + .contact-form__checkbox
      box-shadow: 0 0 10px 0 var(--blue-grey)

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
      &__section
        display: flex
        flex-wrap: wrap
        padding-top: 70px
        padding-bottom: 70px

      &__title
        flex: 1 0 100%

      &__data
        order: 1
        flex: 1 1 40%

      &__summary
        margin: 20px 0 0 50px
        order: 2
        flex: 1 0 40%

</style>
