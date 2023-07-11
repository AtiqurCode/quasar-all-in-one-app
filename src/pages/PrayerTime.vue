<template>
  <div class="q-pa-md" style="max-width: 100%">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md q-pa-lg">
      <q-input filled v-model="todaydate" mask="date" :rules="['date']">
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
        label="Insert your Country name"
        hint="Country name"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Please type Country name',
        ]"
      />
      <q-input
        filled
        v-model="city"
        label="Insert your city name"
        hint="City name"
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

    <q-card class="my-card" v-if="prayerTimes">
      <q-card-section horizontal>
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Prayer Time searching date: {{ todaydate }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Fajr:
            {{ date.formatDate(prayerTimes.data.timings.Fajr, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Sunrise:
            {{ date.formatDate(prayerTimes.data.timings.Sunrise, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Dhuhr:
            {{ date.formatDate(prayerTimes.data.timings.Dhuhr, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Asr: {{ date.formatDate(prayerTimes.data.timings.Asr, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Sunset:
            {{ date.formatDate(prayerTimes.data.timings.Sunset, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Maghrib:
            {{ date.formatDate(prayerTimes.data.timings.Maghrib, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Isha:
            {{ date.formatDate(prayerTimes.data.timings.Isha, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Imsak:
            {{ date.formatDate(prayerTimes.data.timings.Imsak, "hh:mm A") }}
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">
            Midnight:
            {{ date.formatDate(prayerTimes.data.timings.Midnight, "hh:mm A") }}
          </div>
        </q-card-section>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat> Hello </q-btn>
        <q-btn flat> Hi UTC </q-btn>
        <q-btn flat color="primary"> Reserve </q-btn>
      </q-card-actions>
    </q-card>
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
        console.log(prayerTimes.value);
      })
      .catch(() => {
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
