<script setup>
import Header from "../components/Header.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
import Statistic from "../components/Statistic.vue";
import Footer from "../components/Footer.vue";

</script>

<template>
  <div class="page-wrapper">
    <Header />
    <div class="page-content--bgf7">
      <Breadcrumb />
      <Statistic />
      <!-- CONTENT-->
      <slot class="mb-3"></slot>
      <!-- END CONTENT-->
      <Footer />
    </div>
  </div>
</template>