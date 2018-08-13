<template>
  <section class="offices">
    <div class="offices__wrapper">
      <div class="offices__content">
        <h2>Our offices</h2>
        <ul class="offices__list">
          <li class="offices__city"
              v-for="office in offices"
              :key="office.id"
              :class="{ 'green': office.id === activeOfficeId }"
              @click="activateView(office.id)"
          >
            {{ office.city }}
          </li>
        </ul>
        <article class="offices__details">
          <h3 class="offices__office-title">{{ activeOfficeObj.title }}</h3>
          <p class="offices__address">{{ activeOfficeObj.address }}
            <br v-if="activeOfficeObj.zip">{{ activeOfficeObj.zip }}
            <br>{{ activeOfficeObj.country }}
          </p>
        </article>
      </div>
      <Map
        :lat="activeOfficeObj.lat"
        :lng="activeOfficeObj.lng"
      />
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  import { mapGetters, mapActions } from 'vuex';
  import Map from '~/components/Map';

  export default {
    components: {
      Map,
    },
    computed: {
      ...mapGetters({
        offices: 'getOffices',
        activeOffice: 'getActiveOffice',
        activeOfficeId: 'getActiveOfficeId',
      }),
      activeOfficeObj() {
        return this.activeOffice(this.activeOfficeId);
      },
    },
    methods: {
      ...mapActions({
        activateView: 'setActive'
      }),
    },
  }
</script>

<style lang="sass">
  @import '~/assets/styles/_mixins.sass'

  .offices
    background-color: var(--black)

    &__wrapper
      @include maxWidth

    &__content
      @include globalPadding
      padding-top: 50px
      padding-bottom: 50px
      color: var(--white)

    &__list
      display: flex
      padding-left: 0
      list-style-type: none

    &__city
      margin: 0 20px
      text-transform: uppercase
      @include SuisseIntl
      font-weight: 300
      font-size: 12px
      cursor: pointer
      transition: color .2s

      &:first-child
        margin-left: 0

    &__office-title
      margin-top: 40px

    &__address
      margin-top: 30px
      font-size: 12px
      line-height: 20px

  @include desktop
    .offices
      &__wrapper
        display: flex
        align-items: stretch
        height: 400px

      &__content
        padding-top: 70px
        padding-bottom: 0
        flex-basis: 50%

</style>
