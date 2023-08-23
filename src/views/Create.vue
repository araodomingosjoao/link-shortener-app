<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import swal from 'sweetalert';
import axios from "../helpers/axios";
import BaseLayout from "../layouts/BaseLayout.vue";

const router = useRouter();

let slug = reactive({});

const status = reactive({
  isLoading: false,
});

const data = reactive({
  originalURL: "",
  slug: "",
});

const errors = reactive({
  originalURL: "",
});

const isUrlValid = () => {
  const urlPattern =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlPattern.test(data.originalURL);
};

const create = async () => {
  if (data.originalURL && isUrlValid()) {
    status.isLoading = true;
    await axios
      .post("/links", { original_url: data.originalURL, slug: data.slug })
      .then((response) => {
        console.log(response);
        slug = Object.assign(slug, response?.data?.data);
        status.isLoading = false;
        swal("Link cadastrado!", "Seu link foi cadastrado com sucesso!", "success")
        .then((resSwal) => {
          if (resSwal) {
            router.push( {name: 'home'} );
          }
        });
      }).catch(error => {
        status.isLoading = false
        swal( "Erro ao cadastrar" ,  "A slug informada já existe!" ,  "error" )
      });
  } else {
    errors.originalURL = "Formato invalido, precisa informar uma url";
  }
};
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
            <div class="col-md-12">
              <form
                method="post"
                novalidate="novalidate"
                @submit.prevent.stop="create"
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
                        v-model="data.originalURL"
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
                        class="form-control"
                        placeholder=""
                        v-model="data.slug"
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
                        <span id="payment-button-amount">Criar</span>
                      </button>
                      <button
                        id="payment-button"
                        type="submit"
                        class="btn btn-info mx-2 disabled"
                        v-else
                      >
                        <i class="fa fa-save"></i>&nbsp;
                        <span id="payment-button-sending">Sending…</span>
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