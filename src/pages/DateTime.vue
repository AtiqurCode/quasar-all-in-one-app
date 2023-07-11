<template>
  <div>
    <h1>Hello welcome to the time</h1>
    <p>{{ formattedString }}</p>
  </div>
</template>

<script setup>
import { date } from "quasar";
// destructuring to keep only what is needed
const { addToDate } = date;

const timeStamp = Date.now();
const formattedString = date.formatDate(
  "2023-07-06T09:58:31.000000Z",
  "DD MMM, YYYY hh:mm A"
);

const newDate = addToDate(new Date(), { days: 7, months: 1 });
</script>
