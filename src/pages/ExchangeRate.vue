<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="q-gutter-md">
      <q-card class="q-mt-md bg-red-2" flat bordered>
        <q-card-section class="text-center">
          <q-item-label caption>
            Please note that there may be up to a 1-hour delay in fetching the
            latest exchange rates, so we advise against using this results for
            any application that requires real-time exchange rates.
          </q-item-label>
        </q-card-section>
      </q-card>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-select
          filled
          v-model="curencyFrom"
          use-input
          input-debounce="0"
          label="Select your curency"
          :options="options"
          @filter="filterFn"
          hint="select convert from currency"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Curency must select']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          filled
          v-model="curencyTo"
          use-input
          input-debounce="0"
          label="Select converted curency"
          :options="options"
          @filter="filterFn"
          hint="select convert to currency"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Curency must select']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
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

      <q-card v-if="exchangeRate" class="q-mt-md" flat bordered>
        <!-- <img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->

        <q-card-section class="text-center">
          <div class="text-h6">Exchnage Rate conversion</div>
          <div class="text-subtitle1">{{ curencyFrom }} to {{ curencyTo }}</div>
          <q-item-label caption>
            Note: We are not eligible to give you this price. We are sharing
            information from another source.
          </q-item-label>
        </q-card-section>

        <q-list class="row flex-center">
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="price_change" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ exchangeRate.exchange_rate }}</q-item-label>
              <q-item-label caption>Exchnage rate </q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="blue" name="local_convenience_store" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ exchangeRate.currency_pair }}</q-item-label>
              <q-item-label caption>Currency pair </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-card-section class="text-center">
          <div class="text-h6">{{ exchangeRate.exchange_rate }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar, date } from "quasar";
import { apiNinjas } from "boot/axios";

const $q = useQuasar();

const stringOptions = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

const options = ref(stringOptions);
const curencyFrom = ref(null);
const curencyTo = ref(null);
const exchangeRate = ref(null);

const fetchExchangeRate = async () => {
  try {
    apiNinjas
      .get(`/exchangerate?pair=${curencyFrom.value}_${curencyTo.value}`)
      .then((response) => {
        exchangeRate.value = response.data;
        // console.log(exchangeRate.value);
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
    message: "Please wait... we have recived your exchange rate request",
    timeout: 500,
  });
  fetchExchangeRate();
}

function onReset() {
  curencyFrom.value = null;
  curencyTo.value = null;
  exchangeRate.value = null;
}

function filterFn(val, update) {
  if (val === "") {
    update(() => {
      options.value = stringOptions;

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
}
</script>
