<script setup>
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { format } from 'date-fns';
import swal from 'sweetalert';
import axios from "../helpers/axios";
import Loader from "../components/Loader.vue";
import BaseLayout from "../layouts/BaseLayout.vue";

const router = useRouter();
const route = useRoute();

const status = reactive({
  isLoading: false,
});

var data = reactive({});

const getLinkAccess = async () => {
  status.isLoading = true
  await axios
    .get(`/links/${route.params.id}`)
    .then(response => {
      console.log(response);
      data = Object.assign(data, response?.data)
      status.isLoading = false
    });
};

onMounted(() => {
  getLinkAccess()
});
</script>

<template>
  <BaseLayout>
    <template #default>
      <section class="p-t-20">
        <div class="container">
          <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6 mb-3 text-right">
              <router-link :to="{ name: 'home' }" class="btn btn-info">Voltar</router-link>
            </div>
            <Loader style="margin: 0 auto;" v-if="status.isLoading" />
            <div class="col-md-12" v-else>
              <table class="table table-borderless table-data3">
                <thead>
                  <tr>
                    <th>Original URL</th>
                    <th>ShortLink</th>
                    <th>IP</th>
                    <th>User Agent</th>
                    <th>Data de Acesso</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data.link_access" :key="index">
                    <td>
                      <a :href="`http://localhost:8000/${data.original_url}`" target="_blanc">
                        <span class="block-email">{{ data.original_url }}</span>
                      </a>
                    </td>
                    <td>
                      <a :href="`http://localhost:8000/${data.slug}`" target="_blanc">
                        <span class="block-email">{{ data.slug }}</span>
                      </a>
                    </td>
                    <td>{{ item.ip }}</td>
                    <td>{{ item.user_agent }}</td>
                    <td>{{ format(new Date(item.created_at), 'dd/MM/yyyy HH:mm:ss') }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>