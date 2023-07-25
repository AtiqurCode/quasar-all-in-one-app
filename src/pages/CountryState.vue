<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="q-gutter-md">
      <q-card class="q-mt-md bg-green-3" flat bordered>
        <q-card-section class="text-center">
          <q-item-label> Please select your country </q-item-label>
        </q-card-section>
      </q-card>

      <q-form v-if="countries">
        <q-select
          filled
          v-model="countryName"
          use-input
          :options="countries"
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Select an country for the states"
          hint="Supporting over 150+ different countries"
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
      </q-form>

      <q-form v-if="states">
        <q-select
          filled
          v-model="stateName"
          use-input
          :options="states.data.states"
          option-value="id"
          option-label="name"
          input-debounce="0"
          label="Select an states for the cities"
          hint="There can be more than one city"
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
      </q-form>

      <div v-if="cities">
        <q-card
          v-if="isEmpty(cities.data)"
          class="q-mt-md bg-red-3"
          flat
          bordered
        >
          <q-card-section class="text-center">
            <q-item-label>
              There is no cities for {{ stateName.name }}
            </q-item-label>
          </q-card-section>
        </q-card>

        <q-form v-else>
          <q-select
            filled
            v-model="cityName"
            use-input
            :options="cities.data"
            input-debounce="0"
            label="Click the see all cities"
          >
          </q-select>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { countriesnow } from "boot/axios";

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
        // console.log(countries.value);
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
        // console.log(states.value);
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
        // console.log(cities.value);
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

watch(countryName, () => {
  try {
    if (countryName.value !== null) {
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "cloud_done",
        message: "Please wait... we have recived your request",
        timeout: 500,
      });

      fetchCountryStates(countryName.value.name);
    }
  } catch (error) {
    console.error(error);
  }
});

watch(stateName, () => {
  try {
    if (countryName.value !== null && stateName.value !== null) {
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "cloud_done",
        message: "Please wait... we have recived your request",
        timeout: 500,
      });

      fetchCountryStatesCity(countryName.value.name, stateName.value.name);
    }
  } catch (error) {
    console.error(error);
  }
});

function isEmpty(data) {
  // You can define your own logic to check for emptiness
  // console.log(data.length === 0);
  return data.length === 0;
}

onMounted(() => {
  fetchCountry();
});
</script>
