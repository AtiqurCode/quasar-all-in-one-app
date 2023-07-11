<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        v-model="cityname"
        color="primary"
        label="City name"
        filled
        clearable
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'City name is required']"
      />

      <q-input
        v-model="countryname"
        color="primary"
        label="Country name"
        filled
        clearable
        lazy-rules
        :rules="[]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>

    <!-- <q-card
      v-if="submitResult.length > 0"
      flat
      bordered
      class="q-mt-md"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
    >
      <q-card-section
        >Submitted form contains the following formData (key =
        value):</q-card-section
      >
      <q-separator />
      <q-card-section class="row q-gutter-sm items-center">
        <div
          v-for="(item, index) in submitResult"
          :key="index"
          class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
        >
          {{ item.name }} = {{ item.value }}
        </div>
      </q-card-section>
    </q-card> -->

    <q-card v-if="weather" class="q-mt-md" flat bordered>
      <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->

      <q-card-section>
        <div class="text-h6">Weather</div>
        <div class="text-subtitle1">
          {{ date.formatDate(Date.now(), "dddd hh:mm A") }}
        </div>
        <q-item-label caption> {{ cityname }}, {{ countryname }} </q-item-label>
      </q-card-section>

      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="primary" name="thunderstorm" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ weather.temp }} °C | °F</q-item-label>
            <q-item-label caption>Temperature </q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="green" name="thermostat" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ weather.min_temp }}°</q-item-label>
            <q-item-label caption>Min Temp</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="thermostat_auto" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ weather.max_temp }}°</q-item-label>
            <q-item-label caption>Max Temp</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="amber" name="wb_sunny" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{
              moment.unix(weather.sunrise).format("hh:mm A")
            }}</q-item-label>
            <q-item-label caption>Sunrise At</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="black" name="wb_twilight" />
          </q-item-section>

          <q-item-section>
            <q-item-label>{{
              moment.unix(weather.sunset).format("hh:mm A")
            }}</q-item-label>
            <q-item-label caption>Sunset At</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar, date } from "quasar";
import { apiNinjas } from "boot/axios";
import moment from "moment";

const $q = useQuasar();

const cityname = ref("Dhaka");
const countryname = ref("bangladesh");
const weather = ref(null);

const fetchCityWeather = async () => {
  try {
    apiNinjas
      .get(`/weather?city=${cityname.value}&country=${countryname.value}`)
      .then((response) => {
        weather.value = response.data;
        // console.log(weather.value);
      })
      .catch((e) => {
        console.log(e);
        $q.notify({
          color: "negative",
          position: "top",
          message: "Loading failed",
          icon: "report_problem",
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
    message: "Please wait... .we have recived your request",
  });
  fetchCityWeather();
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
</style>
