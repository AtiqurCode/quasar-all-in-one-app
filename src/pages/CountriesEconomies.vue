<template>
  <div class="q-pa-md" style="max-width: 100%">
    <div class="q-gutter-md">
      <q-card class="q-mt-md bg-green-3" flat bordered>
        <q-card-section class="text-center">
          <q-item-label> Please select your country </q-item-label>
        </q-card-section>
      </q-card>

      <q-form @submit="onSubmit" @reset="onReset">
        <q-select
          filled
          v-model="countryName"
          use-input
          :options="countryList"
          input-debounce="0"
          label="Type any text in your language"
          hint="supporting over 50 different languages"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 0) || 'type any text in your language',
          ]"
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
      <div v-if="countryInfo">
        <q-splitter v-model="splitterModel" style="height: 100%">
          <template v-slot:before>
            <q-tabs v-model="tab" vertical class="text-primary">
              <q-tab name="info" icon="info" label="Info" />
              <q-tab name="economies" icon="poll" label="Econom" />
              <q-tab name="population" icon="reduce_capacity" label="Popul" />
              <q-tab name="others" icon="more" label="Others" />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="info">
                <div class="text-h4 q-mb-md">Info</div>
                <q-list class="rounded-borders text-primary">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].name }}</q-item-label
                      >
                      <q-item-label caption>Country name </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].capital }}</q-item-label
                      >
                      <q-item-label caption>Capital </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">{{
                        countryInfo[0].region
                      }}</q-item-label>
                      <q-item-label caption>Region </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].surface_area }} km</q-item-label
                      >
                      <q-item-label caption>Surface area </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">{{
                        countryInfo[0].iso2
                      }}</q-item-label>
                      <q-item-label caption>ISO </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">{{
                        countryInfo[0].currency.code
                      }}</q-item-label>
                      <q-item-label caption>Currency Code </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">{{
                        countryInfo[0].currency.name
                      }}</q-item-label>
                      <q-item-label caption>Currency Name </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].forested_area }} %</q-item-label
                      >
                      <q-item-label caption>Forested Area </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="economies">
                <div class="text-h4 q-mb-md">Economies</div>
                <q-list class="rounded-borders text-primary">
                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">{{
                        countryInfo[0].gdp
                      }}</q-item-label>
                      <q-item-label caption>GDP</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].gdp_growth }} %</q-item-label
                      >
                      <q-item-label caption>GDP growth</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold">{{
                        countryInfo[0].gdp_per_capita
                      }}</q-item-label>
                      <q-item-label caption>GDP per capita</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].unemployment }} %</q-item-label
                      >
                      <q-item-label caption>unemployment </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].employment_services
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption>Employment services </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].employment_agriculture
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Employment agriculture
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].employment_industry
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption>Employment industry </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="population">
                <div class="text-h4 q-mb-md">Population</div>
                <q-list class="rounded-borders text-primary">
                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].population }}
                      </q-item-label>
                      <q-item-label caption>Population </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].urban_population }}
                      </q-item-label>
                      <q-item-label caption>Urban population </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].urban_population_growth
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Urban population growth
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{ countryInfo[0].sex_ratio }} %</q-item-label
                      >
                      <q-item-label caption>Sex ratio </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].life_expectancy_male
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption>Life expectancy male </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].life_expectancy_female
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Life expectancy female
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].primary_school_enrollment_male
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Primary school enrollment male
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].primary_school_enrollment_female
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Primary school enrollment female
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].secondary_school_enrollment_male
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Secondary school enrollment male
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].secondary_school_enrollment_female
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Secondary school enrollment female
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].post_secondary_enrollment_male
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Post secondary school enrollment male
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>
                      <q-item-label class="text-bold"
                        >{{
                          countryInfo[0].post_secondary_enrollment_female
                        }}
                        %</q-item-label
                      >
                      <q-item-label caption
                        >Post secondary school enrollment female
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="others">
                <div class="text-h4 q-mb-md">Others information</div>
                <q-list class="rounded-borders text-primary">
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].imports }}</q-item-label
                      >
                      <q-item-label caption>Imports </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].homicide_rate }}%</q-item-label
                      >
                      <q-item-label caption>Homicide rate </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].co2_emissions }}</q-item-label
                      >
                      <q-item-label caption>Co2 emissions </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].tourists }}</q-item-label
                      >
                      <q-item-label caption>Tourists </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].exports }}</q-item-label
                      >
                      <q-item-label caption>Exports </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].infant_mortality }}</q-item-label
                      >
                      <q-item-label caption>Infant mortality </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].threatened_species }}%</q-item-label
                      >
                      <q-item-label caption>Threatened species </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].pop_growth }}%</q-item-label
                      >
                      <q-item-label caption>Pop growth </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].pop_density }}%</q-item-label
                      >
                      <q-item-label caption>Pop density </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].internet_users }}%</q-item-label
                      >
                      <q-item-label caption>Internet users </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].fertility }}%</q-item-label
                      >
                      <q-item-label caption>Fertility </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label class="text-bold">
                        {{ countryInfo[0].refugees }}</q-item-label
                      >
                      <q-item-label caption>Refugees </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { apiNinjas } from "boot/axios";

const $q = useQuasar();

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Côte d'Ivoire",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini (fmr. 'Swaziland')",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const countryName = ref("");
const countryInfo = ref(null);
const tab = ref("info");
const splitterModel = ref(20);

const fetchCountryInformation = async () => {
  try {
    apiNinjas
      .get(`/country?name=${countryName.value}`)
      .then((response) => {
        countryInfo.value = response.data;
        console.log(countryInfo.value);
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
    message: "Please wait... we have recived your country & economies request",
    timeout: 500,
  });

  fetchCountryInformation();
}
function onReset() {
  countryName.value = null;
  countryInfo.value = null;
}
</script>
