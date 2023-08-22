<script setup>
import { onMounted, reactive } from "vue";
import axios from "../helpers/axios";
import BaseLayout from "../layouts/BaseLayout.vue";

let links = reactive([]);

let optionSelect = reactive([
    {
        name: 'Original URL',
        value: 'original_url'
    },
    {
        name: 'Slug',
        value: 'slug'
    }
]);

const status = reactive({
  isLoading: false,
});

const filter = reactive({
  search: '',
  option: '',
});

const getLinks = async () => {
  status.isLoading = true;
  await axios.get("/links").then((response) => {
    links = Object.assign(links, response?.data?.data);
    status.isLoading = false;
  });
};

const search = async () => {
  status.isLoading = true;
  const url = `/links?${filter.option}=${filter.search}`;
  links.length = 0
  await axios.get(url).then((response) => {
    links = Object.assign(links, response?.data?.data);
    status.isLoading = false;
  });
};

onMounted(async () => {
  await getLinks();
});
</script>

<template>
  <BaseLayout>
    <template #default>
      <section class="p-t-20">
        <div class="container">
          <div class="row">
            <div class="col-md-12 row">
              <div class="col col-md-8">
                <form class="row" @submit.prevent.stop="search()" novalidate>
                    <div class="col-md-4">
                        <select class="form-control" v-model="filter.option">
                            <option :value="item.value" v-for="(item, index) in optionSelect" :key="index">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="col-md-6 input-group">
                        <input type="text" id="input2-group2" name="input2-group2" placeholder="Pesquisar" class="form-control" v-model="filter.search">
                        <div class="input-group-btn">
                            <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                        </div>
                    </div>
                </form>
              </div>
              <div class="col col-md-4 text-right mb-5">
                  <RouterLink
                    :to="{ name: 'create' }"
                    class="au-btn au-btn-icon au-btn--green au-btn--small"
                  >
                    <i class="zmdi zmdi-plus"></i>Adicionar
                  </RouterLink>
              </div>
              <div class="table-responsive table-responsive-data2">
                <table class="table table-data2">
                  <thead>
                    <tr>
                      <th>Original URL</th>
                      <th>ShortLink</th>
                      <th>Acessos</th>
                      <th>Criado</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(link, index) in links" :key="index">
                      <tr class="tr-shadow">
                        <td> <a :href="link.original_url"> {{ link.original_url }} </a></td>
                        <td>
                          <a :href="`http://localhost:8000/${link.slug}`" target="_blanc"><span class="block-email">{{ link.slug }}</span></a>
                        </td>
                        <td><span class="badge badge-warning">{{ link.access_count }}</span></td>
                        <td>{{ link.created_at }}</td>
                        <td>
                          <div class="table-data-feature">
                            <button
                              class="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Edit"
                            >
                              <i class="zmdi zmdi-edit"></i>
                            </button>
                            <button
                              class="item"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Delete"
                            >
                              <i class="zmdi zmdi-delete"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr class="spacer"></tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>