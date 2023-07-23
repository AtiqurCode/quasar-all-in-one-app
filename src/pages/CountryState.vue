<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="q-gutter-md">
      <q-card class="q-mt-md bg-green-3" flat bordered>
        <q-card-section class="text-center">
          <q-item-label> Please select your country </q-item-label>
        </q-card-section>
      </q-card>

      <q-form v-if="countries" @submit="onSubmit" @reset="onReset">
        <q-select
          filled
          v-model="countryName"
          use-input
          :options="countries"
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Type any text in your language"
          hint="supporting over 50 different languages"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section avatar>
                <q-item-label class="text-h5">{{
                  scope.opt.unicodeFlag
                }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
                <q-item-label>{{ scope.opt.iso3 }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

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

      <q-form v-if="states" @submit="onStateSubmit" @reset="onStateReset">
        <q-select
          filled
          v-model="stateName"
          use-input
          :options="states.data.states"
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Type any text in your language"
          hint="supporting over 50 different languages"
        >
          <template v-slot:option="state">
            <q-item v-bind="state.itemProps">
              <q-item-section>
                <q-item-label>{{ state.opt.name }}</q-item-label>
                <q-item-label caption>{{ state.opt.state_code }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

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

      <q-form v-if="cities">
        <q-select
          filled
          v-model="cityName"
          use-input
          :options="cities.data"
          input-debounce="0"
          label="Type any text in your language"
        >
        </q-select>
      </q-form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { countriesnow } from "boot/axios";
import axios from "axios";

const $q = useQuasar();

const countryName = ref("");
const stateName = ref("");
const cityName = ref("");
const countries = ref(null);
const states = ref(null);
const cities = ref(null);

const fetchCountry = async () => {
  try {
    countriesnow
      .get(`/countries/flag/unicode`)
      .then((response) => {
        countries.value = response.data.data;
        console.log(countries.value);
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

const fetchCountryStates = async (countryName) => {
  try {
    let selectCountryName = {
      country: countryName,
    };

    countriesnow
      .post(`/countries/states`, selectCountryName)
      .then((response) => {
        states.value = response.data;
        console.log(states.value);
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

const fetchCountryStatesCity = async (countryName, stateName) => {
  try {
    let selectCountryStateName = {
      country: countryName,
      state: stateName,
    };

    countriesnow
      .post(`/countries/state/cities`, selectCountryStateName)
      .then((response) => {
        cities.value = response.data;
        console.log(cities.value);
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

onMounted(() => {
  fetchCountry();
});

function onSubmit() {
  $q.notify({
    color: "green",
    textColor: "white",
    icon: "cloud_done",
    message: "Please wait... we have recived your country & economies request",
    timeout: 500,
  });

  fetchCountryStates(countryName.value.name);
}

function onStateSubmit() {
  $q.notify({
    color: "green",
    textColor: "white",
    icon: "cloud_done",
    message: "Please wait... we have recived your country & economies request",
    timeout: 500,
  });

  fetchCountryStatesCity(countryName.value.name, stateName.value.name);
}

function onReset() {
  countryName.value = null;
  countryInfo.value = null;
  countries.value = null;
}

function onStateReset() {
  stateName.value = null;
  countryInfo.states = null;
}
</script>
