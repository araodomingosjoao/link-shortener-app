<script setup>
import { reactive, onMounted } from "vue";
import axios from "../helpers/axios";

const statistics = reactive({
  links: [],
  views: []
});

const getStatistic = async () => {
  Promise.all([
    await axios.get("/links").then((response) => {
      console.log(response);
      statistics.links = Object.assign(statistics.links, response?.data?.data);
    }),
    await axios.get("/access").then((response) => {
      console.log(response);
      statistics.views = Object.assign(statistics.views, response?.data?.data);
    }),
  ])
};

onMounted(async () => {
  await getStatistic()
});
</script>

<template>
  <section class="statistic statistic2">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-6">
          <div class="statistic__item statistic__item--green">
            <h2 class="number">{{ statistics.links.length }}</h2>
            <span class="desc">Links</span>
            <div class="icon">
              <i class="zmdi zmdi-link"></i>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-6">
          <div class="statistic__item statistic__item--orange">
            <h2 class="number">{{ statistics.views.length }}</h2>
            <span class="desc">Clicks</span>
            <div class="icon">
              <i class="zmdi zmdi-eye"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>