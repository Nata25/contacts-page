<template>
  <section>
    <h2>Our Offices</h2>
      <ul>
        <li
          v-for="office in offices"
          :key="office.id"
          @click="activateView(office.id)"
        >
          {{ office.city }}
        </li>
      </ul>
      <article>
        <h3>City: {{ activeOfficeObj.city }}</h3>
        <p>Address: {{ activeOfficeObj.address }}</p>
        <Map
          :lat="activeOfficeObj.lat"
          :lng="activeOfficeObj.lng"
        />
      </article>
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
      })
    }
  }
</script>

<style lang="sass">
  .map
    width: 50vw
    height: 300px
</style>
