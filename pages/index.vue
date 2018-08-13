<template>
  <section>
    <h1>Contacts</h1>
    <!--<BasicInfo />-->
    <!--<Offices />-->
    <ContactForm />
  </section>
</template>

<script>
import BasicInfo from '~/components/BasicInfo.vue'
import Offices from '~/components/Offices.vue'
import ContactForm from '~/components/ContactForm.vue'

export default {
  components: {
    BasicInfo,
    Offices,
    ContactForm
  }
}
</script>

<style>

</style>

