<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>World Time</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 150px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <q-item to="/world-time" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="timer" />
              </q-item-section>

              <q-item-section> World Time </q-item-section>
            </q-item>

            <q-item to="/datetime" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="calendar_month" />
              </q-item-section>

              <q-item-section> DateTime </q-item-section>
            </q-item>

            <q-item
              to="/prayer-time"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="brightness_4" />
              </q-item-section>

              <q-item-section> PrayerTime </q-item-section>
            </q-item>

            <q-item to="/weather" active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="thunderstorm" />
              </q-item-section>

              <q-item-section>weather</q-item-section>
            </q-item>

            <q-item
              to="/exchange-rate"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="currency_exchange" />
              </q-item-section>

              <q-item-section>Exchnage Rate</q-item-section>
            </q-item>

            <q-item
              to="/language-detect"
              active-class="q-item-no-link-highlighting"
            >
              <q-item-section avatar>
                <q-icon name="language" />
              </q-item-section>

              <q-item-section>Language Detect</q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section> Send </q-item-section>
            </q-item>

            <q-item active-class="q-item-no-link-highlighting">
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section> Drafts </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img
          class="absolute-top"
          src="https://cdn.quasar.dev/img/material.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <div class="text-weight-bold">Md Atiqur Rahman</div>
            <div>@atiqur23</div>
          </div>
        </q-img>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from "vue";
import { openURL } from "quasar";

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>
