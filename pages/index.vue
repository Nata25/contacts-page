<template>
  <main>
    <h1>Contacts</h1>
    <BasicInfo />
    <Map />
    <Form />
  </main>
</template>

<script>
import BasicInfo from '~/components/BasicInfo.vue'
import Map from '~/components/Map.vue'
import Form from '~/components/Form.vue'

export default {
  components: {
    BasicInfo,
    Map,
    Form
  }
}
</script>

<style>

</style>

