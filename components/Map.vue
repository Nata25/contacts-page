<template>
  <div id="map" class="map"></div>
</template>

<script>
  import axios from 'axios';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      }
    },
    mounted() {
      this.renderMap();
    },
    watch: {
      lat: function() {
        this.renderMap();
      },
    },
    computed: {
      ...mapGetters({
        offices: 'getOffices',
        activeOffice: 'getActiveOffice',
        activeOfficeId: 'getActiveOfficeId',
      })
    },
    methods: {
      ...mapActions({
        activateView: 'setActive'
      }),
      renderMap() {
        axios.get('/googleMapStyle.json')
          .then(data => {
            const position = { lat: this.lat, lng: this.lng };
            const map = new this.$google.maps.Map(
              document.getElementById('map'),
              {
                zoom: 15,
                center: position,
                styles: data.data
              });
            const circle = this.$google.maps.SymbolPath.CIRCLE;
            const marker = new this.$google.maps.Marker({
              position,
              map,
              icon: {
                path: circle,
                scale: 15,
                fillColor: '#3ea962',
                fillOpacity: 1,
                strokeWeight: 0.4
              },
            });
          });
      },
    },
  }
</script>

<style lang="sass">
  @import '~/assets/styles/_mixins.sass'

  .map
    height: 300px
    background-color: var(--black)

  @include desktop
    .map
      flex: 1 0 50%
      height: auto

</style>
