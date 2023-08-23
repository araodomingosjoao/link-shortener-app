<script setup>
import { onMounted, reactive } from "vue";
import { format } from 'date-fns';
import swal from 'sweetalert';
import axios from "../helpers/axios";
import BaseLayout from "../layouts/BaseLayout.vue";
import Loader from "../components/Loader.vue";

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

let pagination = reactive({});
const current_page = reactive(1);

const status = reactive({
  isLoading: false,
});

const onClickHandler = async (page) => {
  status.isLoading = true;
  links.length = 0
  await axios.get(`links?page=${page}`).then((response) => {
    console.log(response);
    links = Object.assign(links, response?.data?.data);
    pagination = Object.assign(pagination, response?.data);
    status.isLoading = false;
  });
};

const filter = reactive({
  search: '',
  option: '',
});

const getLinks = async () => {
  status.isLoading = true;
  links.length = 0
  await axios.get("/links", {
    params: {
      sort_by: 'created_at',
      sort_direction: 'desc'
    }
  }).then((response) => {
    console.log(response);
    links = Object.assign(links, response?.data?.data);
    pagination = Object.assign(pagination, response?.data);
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

const destroy = async (id) => {
  await axios.delete(`/links/${id}`).then(async (response) => {
    swal("Link removido!", "Seu link foi removido com sucesso!", "success")
      .then(async (resSwal) => {
        if (resSwal) {
          await getLinks();
        }
      })

  });
};

const confirm = async (id) => {
  swal({
    title: "Tens Certeza?",
    text: "Você não será capaz de recuperar este link!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
    .then(async (resSwal) => {
      if (resSwal) {
        await destroy(id)
      }
    });
};

onMounted(async () => {
  await getLinks();
});
</script>
<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
<template>
  <BaseLayout>
    <template #default>
      <section class="p-t-20">
        <div class="container">
          <div class="row">
            <div class="col-md-12 row">
              <div class="col col-md-8">
                <form class="row" @submit.prevent.stop="search()" novalidate>
                  <div class="col-md-3">
                    <select class="form-control" v-model="filter.option">
                      <option :value="item.value" v-for="(item, index) in optionSelect" :key="index">{{ item.name }}
                      </option>
                    </select>
                  </div>
                  <div class="col-md-7 input-group">
                    <input type="text" id="input2-group2" name="input2-group2" placeholder="Pesquisar"
                      class="form-control" v-model="filter.search">
                    <div class="input-group-btn">
                      <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i></button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="col col-md-4 text-right mb-5">
                <RouterLink :to="{ name: 'create' }" class="au-btn au-btn-icon au-btn--green au-btn--small">
                  <i class="zmdi zmdi-plus"></i>Adicionar
                </RouterLink>
              </div>
              <Loader style="margin: 0 auto;" v-if="status.isLoading" />
              <template v-else>
                <div class="table-responsive table-responsive-data2" >
                  <table class="table table-data2 mb-5">
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
                          <td> <a :href="link.original_url" target="_blanc"><span class="block-email">{{ link.original_url
                          }}</span></a></td>
                          <td>
                            <a :href="`http://localhost:8000/${link.slug}`" target="_blanc"><span class="block-email">{{
                              link.slug }}</span></a>
                          </td>
                          <td><span class="badge badge-warning">{{ link.access_count }}</span></td>
                          <td>{{ format(new Date(link.created_at), 'dd/MM/yyyy HH:mm:ss') }}</td>
                          <td>
                            <div class="table-data-feature">
                              <router-link :to="{ name: 'show', params: { id: link.id } }" class="item"
                                data-toggle="tooltip" data-placement="top" title="Ver">
                                <i class="zmdi zmdi-eye"></i>
                              </router-link>
                              <router-link :to="{ name: 'edit', params: { id: link.id } }" class="item"
                                data-toggle="tooltip" data-placement="top" title="Editar">
                                <i class="zmdi zmdi-edit"></i>
                              </router-link>
                              <button class="item" data-toggle="tooltip" data-placement="top" title="Remover"
                                @click="confirm(link.id)">
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
                <vue-awesome-paginate
                  style="margin: 0 auto;"
                  :total-items="pagination.total" 
                  :items-per-page="pagination.per_page"
                  :max-pages-shown="pagination.per_page" 
                  v-model="current_page" 
                  :on-click="onClickHandler"
                  class="mb-3"
                />
              </template>
            </div>
          </div>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>