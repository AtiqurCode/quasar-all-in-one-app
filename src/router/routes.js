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
