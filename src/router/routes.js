const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "world-time", component: () => import("pages/WorldTime.vue") },
      {
        path: "datetime",
        component: () => import("pages/DateTime.vue"),
      },
      {
        path: "prayer-time",
        component: () => import("pages/PrayerTime.vue"),
      },
      {
        path: "weather",
        component: () => import("src/pages/CityWeather.vue"),
      },
      {
        path: "exchange-rate",
        component: () => import("src/pages/ExchangeRate.vue"),
      },
      {
        path: "language-detect",
        component: () => import("src/pages/LanguageDetect.vue"),
      },
      {
        path: "country-state",
        component: () => import("src/pages/CountryState.vue"),
      },
      {
        path: "country-economies",
        component: () => import("src/pages/CountriesEconomies.vue"),
      },
      {
        path: "settings",
        component: () => import("src/pages/SettingPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
