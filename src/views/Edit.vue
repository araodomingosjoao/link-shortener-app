<script setup>
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import swal from 'sweetalert';
import axios from "../helpers/axios";
import BaseLayout from "../layouts/BaseLayout.vue";
import Loader from "../components/Loader.vue";

const router = useRouter();
const route = useRoute();

let slug = reactive({});

const status = reactive({
  isLoading: false,
});

var data = reactive({});

const errors = reactive({
  originalURL: "",
});

const getLinkID = async () => {
  status.isLoading = true
  await axios
    .get(`/links/${route.params.id}`)
    .then(response => {
      console.log(response);
      data = Object.assign(data, response?.data)
      status.isLoading = false
    });
};

const isUrlValid = () => {
  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlPattern.test(data.original_url);
};

const update = async () => {
  if (data.original_url && isUrlValid()) {
    status.isLoading = true;
    await axios
      .put(`/links/${route.params.id}`, data)
      .then((response) => {
        console.log(response);
        slug = Object.assign(slug, response?.data?.data);
        status.isLoading = false;
        swal("Link atualizado!", "Seu link foi atualizado com sucesso!", "success")
        .then((resSwal) => {
          if (resSwal) {
            router.push( {name: 'home'} );
          }
        });
      }).catch(error => {
        status.isLoading = false
        swal( "Erro ao actualizar" ,  "A slug informada já existe!" ,  "error" )
      });
  } else {
    errors.originalURL = "Formato invalido, precisa informar uma URL";
  }
};

onMounted(async () => {
  await getLinkID()
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
              <router-link :to="{ name: 'home' }" class="btn btn-info"
                >Voltar</router-link
              >
            </div>
            <Loader style="margin: 0 auto;" v-if="status.isLoading"/>

            <div class="col-md-12" v-else>
              <form
                method="post"
                novalidate="novalidate"
                @submit.prevent.stop="update"
              >
                <div class="card">
                  <div class="card-header">ShorLink</div>
                  <div class="card-body">
                    <div class="form-group">
                      <label for="original_url" class="control-label mb-1"
                        >Original URL</label
                      >
                      <input
                        id="original_url"
                        v-model="data.original_url"
                        type="text"
                        class="form-control"
                        placeholder="https://example.com"
                        :class="{ 'is-invalid': errors.originalURL }"
                      />
                      <div class="invalid-feedback">
                        {{ errors.originalURL }}
                        </div>
                    </div>
                    <div class="form-group has-success">
                      <label for="slug" class="control-label mb-1">Slug</label>
                      <input
                        id="slug"
                        type="text"
                        class="form-control disabled"
                        placeholder=""
                        v-model="data.slug"
                        disabled
                      />
                    </div>
                  </div>
                  <div class="card-footer">
                    <div>
                      <button
                        id="payment-button"
                        type="submit"
                        class="btn btn-info mx-2"
                        v-if="!status.isLoading"
                      >
                        <i class="fa fa-save"></i>&nbsp;
                        <span id="payment-button-amount">Editar</span>
                      </button>
                      <button
                        id="payment-button"
                        type="submit"
                        class="btn btn-info mx-2 disabled"
                        v-else
                      >
                        <i class="fa fa-save"></i>&nbsp;
                        <span id="payment-button-sending">Editando...</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </template>
  </BaseLayout>
</template>