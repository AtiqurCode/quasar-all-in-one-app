<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="q-gutter-md q-pb-md">
      <q-form @submit="onSubmit" @reset="onReset">
        <q-input
          filled
          v-model="todaydate"
          mask="date"
          :rules="['date']"
          label="Date"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="todaydate">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="country"
          label="Country name"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type Country name',
          ]"
        />
        <q-input
          filled
          v-model="city"
          label="City name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type city name']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>

      <q-card v-if="prayerTimes" class="q-mt-md" flat bordered>
        <q-card-section class="text-center">
          <div class="text-h4">
            {{ moment(todaydate).format("MMMM Do YYYY") }}
          </div>
          <div class="text-subtitle1">
            {{ city }}, {{ country }} prayer all times
          </div>
          <q-item-label caption>
            It's can be change in your location time to vary your area timezone
            utc offset
          </q-item-label>
        </q-card-section>

        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="blue-4" name="nights_stay" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{
                date.formatDate(prayerTimes.data.timings.Fajr, "hh:mm A")
              }}</q-item-label>
              <q-item-label>Fajr </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="wb_twilight" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{
                date.formatDate(prayerTimes.data.timings.Sunrise, "hh:mm A")
              }}</q-item-label>
              <q-item-label>Sunrise </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="wb_sunny" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Dhuhr, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Dhuhr </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="orange-4" name="brightness_medium" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Asr, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Asr </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="green" name="light_mode" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Sunset, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Sunset </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="blue-grey-7" name="brightness_4" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Maghrib, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Maghrib </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="black" name="bedtime" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Isha, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Isha </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="bedtime_off" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Imsak, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Imsak </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="blue-grey-14" name="star_rate" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{
                  date.formatDate(prayerTimes.data.timings.Midnight, "hh:mm A")
                }}</q-item-label
              >
              <q-item-label>Midnight </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { useQuasar, date } from "quasar";
import { ref } from "vue";
import { aladhanApi } from "boot/axios";

const $q = useQuasar();

const defaultDate = date.formatDate(Date.now(), "YYYY/MM/DD");
const todaydate = ref(defaultDate);
const city = ref("Dhaka");
const country = ref("Bangladesh");
const accept = ref(false);
const prayerTimes = ref(null);
import moment from "moment";

const fetchPrayerTimes = async () => {
  try {
    aladhanApi
      .get(
        `/timingsByCity/${date.formatDate(
          todaydate.value,
          "DD-MM-YYYY"
        )}?city=${city.value}&country=${country.value}&iso8601=true`
      )
      .then((response) => {
        prayerTimes.value = response.data;
        // console.log(prayerTimes.value);
      })
      .catch(() => {
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
    message: "Please wait... we have recived your request",
    timeout: 500,
  });
  fetchPrayerTimes();
}

function onReset() {
  city.value = null;
  country.value = null;
  accept.value = false;
  todaydate.value = defaultDate;
  prayerTimes.value = null;
}
</script>
