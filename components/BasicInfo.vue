<template>
  <div class="basic-info">
    <article class="subsection">
      <h2>
        <span class="green">GMS</span>
        Headquarters
      </h2>
      <div class="content">
        <p>Global message services Ukraine LLC</p>
        <p>Bundesstrasse 5 | 3rd Floor</p>
        <p>6300 Zug</p>
        <p>Switzerland</p>
        <a class="phone"
           href="tel:+41415446200">+41 41 544 62 00
        </a>

        <p>Email</p>
        <a href="mailto:info@gms-worldwide.com"
           target="_blank"
           title="email"
           class="semibold"
        >
          info@gms-worldwide.com
        </a>
        <p>Send message</p>
        <a v-if="isMobile"
           title="Viber"
           href="viber://add?number=41415446200"
           class="semibold"
        >
          Viber us
        </a>
        <a v-else
           title="Viber"
           href="viber://chat?number=+41415446200"
           class="semibold"
        >
          Viber us
        </a>

        <p>Send form</p>
        <a
          href="#contactUs"
          class="semibold"
        >
          Contact us</a>
      </div>
    </article>

    <article class="subsection">
      <h2>Technical support <span class="green">24/7</span></h2>
      <div class="content">
        <p>GMS understands that it can be hard to follow all new technologies.
          We regularly provide for all our clients educational trainings to make
          your operator`s business earn more and better through our best practices.
        </p>

        <a class="phone"
           href="tel:+41415446200"
        >
          +41 41 544 62 00
        </a>
      </div>
    </article>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        isMobile: false
      }
    },
    mounted() {
      this.isMobile = window.innerWidth < 560
    },
  }
</script>

<style lang="sass">
  @import '~/assets/styles/_mixins.sass'

  .basic-info
    margin: 0 auto
    max-width: 1200px

  .phone
    display: inline-block
    margin-top: 30px
    margin-bottom: 20px
    font-size: 25px

  .semibold
    font-weight: 300

  @include mobile
    .basic-info
      display: flex
      flex-wrap: wrap

    .subsection
      flex-basis: 100%

    .content
      display: flex
      flex-direction: column
      flex-wrap: wrap
      height: 200px

      p
        margin-right: 20px

  @include tabletLandscape
    p
      font-size: 16px

    .content
      display: flex
      flex-direction: column
      flex-wrap: wrap

  @include desktop
    .subsection
      flex-basis: 45%

    .basic-info
      justify-content: space-between

</style>

