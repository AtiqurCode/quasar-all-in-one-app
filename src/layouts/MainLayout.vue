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
          <q-list>
            <q-item
              to="/world-time"
              :active="link === 'world-time'"
              @click="link = 'world-time'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="timer" />
              </q-item-section>

              <q-item-section> World Time </q-item-section>
            </q-item>

            <q-item
              to="/datetime"
              :active="link === 'datetime'"
              @click="link = 'datetime'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="calendar_month" />
              </q-item-section>

              <q-item-section> DateTime </q-item-section>
            </q-item>

            <q-item
              to="/prayer-time"
              :active="link === 'prayer-time'"
              @click="link = 'prayer-time'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="brightness_4" />
              </q-item-section>

              <q-item-section> PrayerTime </q-item-section>
            </q-item>

            <q-item
              to="/weather"
              :active="link === 'weather'"
              @click="link = 'weather'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="thunderstorm" />
              </q-item-section>

              <q-item-section>weather</q-item-section>
            </q-item>

            <q-item
              to="/exchange-rate"
              :active="link === 'exchange-rate'"
              @click="link = 'exchange-rate'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="currency_exchange" />
              </q-item-section>

              <q-item-section>Exchnage Rate</q-item-section>
            </q-item>

            <q-item
              to="/language-detect"
              :active="link === 'language-detect'"
              @click="link = 'language-detect'"
              active-class="my-menu-link"
            >
              <q-item-section avatar>
                <q-icon name="language" />
              </q-item-section>

              <q-item-section>Language Detect</q-item-section>
            </q-item>

            <q-item
              :active="link === 'country-economies'"
              @click="link = 'country-economies'"
              active-class="my-menu-link"
              to="/country-economies"
            >
              <q-item-section avatar>
                <q-icon name="flag_circle" />
              </q-item-section>

              <q-item-section>Countries & Economies</q-item-section>
            </q-item>

            <q-item
              :active="link === 'settings'"
              @click="link = 'settings'"
              active-class="my-menu-link"
              to="/settings"
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section>Settings</q-item-section>
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
      link: ref("world-time"),
    };
  },
};
</script>

<style lang="sass">
.my-menu-link
  color: white
  background: #0097A7
</style>
