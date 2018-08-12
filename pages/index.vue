<template>
  <main>
    <h1>Contacts</h1>
    <BasicInfo />
    <Offices />
    <Form />
  </main>
</template>

<script>
import BasicInfo from '~/components/BasicInfo.vue'
import Offices from '~/components/Offices.vue'
import Form from '~/components/Form.vue'

export default {
  components: {
    BasicInfo,
    Offices,
    Form
  }
}
</script>

<style>

</style>

