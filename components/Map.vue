<template>
  <section>
    <h2>Our Offices</h2>
    <ul>
      <li>Kyiv</li>
    </ul>
    <article>
      <h3>Global Message Services Ukraine LLC</h3>
      <p>Address</p>
      <div id="map" class="map"></div>
    </article>
  </section>
</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {
      axios.get('/googleMapStyle.json')
        .then(data => {
          // The location of Uluru
          const uluru = {lat: -25.344, lng: 131.036};
          // The map, centered at Uluru
          const map = new this.$google.maps.Map(
            document.getElementById('map'),
            {
              zoom: 4,
              center: uluru,
              styles: data.data
            });
          // The marker, positioned at Uluru
          const marker = new this.$google.maps.Marker({position: uluru, map: map});
        })
    }
  }
</script>

<style lang="sass">
  .map
    width: 50vw
    height: 300px
</style>
