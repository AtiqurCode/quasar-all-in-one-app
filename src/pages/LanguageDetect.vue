<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="q-gutter-md">
      <q-card class="q-mt-md bg-red-2" flat bordered>
        <q-card-section class="text-center">
          <q-item-label caption>
            Detect language of any given text, supporting over 50 different
            languages
          </q-item-label>
        </q-card-section>
      </q-card>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          filled
          v-model="text"
          use-input
          input-debounce="0"
          label="Type any text in your language"
          hint="supporting over 50 different languages"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'type any text in your language',
          ]"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-input>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm q-pa-md"
          />
        </div>
      </q-form>

      <q-card v-if="textlanguage" class="q-mt-md" flat bordered>
        <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->

        <q-card-section class="text-center">
          <div class="text-h6">
            Congratulations! we are detect your language
          </div>
          <div class="text-subtitle1"></div>
          <q-item-label caption>
            Note: We are not eligible to give you gaurantee that our information
            is 100% right.
          </q-item-label>
        </q-card-section>

        <q-list class="row flex-center">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="green" name="iso" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ textlanguage.iso }}</q-item-label>
              <q-item-label caption>Language ISO </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="blue" name="translate" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ textlanguage.language }}</q-item-label>
              <q-item-label caption>Language Name </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { apiNinjas } from "boot/axios";

const $q = useQuasar();
const text = ref("");
const textlanguage = ref(null);

const fetchDetectLanguage = async () => {
  try {
    apiNinjas
      .get(`/textlanguage?text=${text.value}`)
      .then((response) => {
        textlanguage.value = response.data;
        console.log(textlanguage.value);
      })
      .catch((e) => {
        console.log(e);
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
          timeout: 500,
        });
      });
  } catch (error) {
    console.error(error);
  }
};

function onSubmit() {
  $q.notify({
    color: "green",
    textColor: "white",
    icon: "cloud_done",
    message: "Please wait... we have recived your language detect request",
    timeout: 500,
  });

  fetchDetectLanguage();
}
function onReset() {
  text.value = null;
  textlanguage.value = null;
}
</script>
