  new Vue({
    el: '#countries_CO2',
    data: {
      countries: [],
      filteredCountries: [],
      countrySearchTerm: '',
      sortOption: 'default'
    },
    mounted() {
      fetch('countries.json')
        .then(response => response.json())
        .then(data => {
          this.countries = data.countries;
          this.filteredCountries = data.countries;
        })
        .catch(error => {
          console.error('Fehler beim Laden der Daten:', error);
        });
    },
    methods: {
      filterCountries() {
        const searchTerm = this.countrySearchTerm.toLowerCase();
        this.filteredCountries = this.countries.filter(country => country.Land.toLowerCase().includes(searchTerm));
      },
      sortTableCountry() {
        const rows = this.filteredCountries.slice(0); // Kopie der gefilterten Länder
  
        if (this.sortOption === 'alphabetical') {
          rows.sort((a, b) => a.Land.localeCompare(b.Land));
        } else if (this.sortOption === 'emissions_asc') {
          rows.sort((a, b) => a['tCO2/Kopf'] - b['tCO2/Kopf']);
        } else if (this.sortOption === 'emissions_desc') {
          rows.sort((a, b) => b['tCO2/Kopf'] - a['tCO2/Kopf']);
        }
  
        this.filteredCountries = rows;
      }
    },
    watch: {
      countrySearchTerm() {
        this.filterCountries();
      },
      sortOption() {
        this.sortTableCountry();
      }
    }
  });


  
  new Vue({
    el: '#rtl',
    data: {
      isRtlLanguage: false
    },
    mounted() {
      const lang = window.navigator.language || window.navigator.userLanguage;
      this.isRtlLanguage = ["ar", "he", "fa", "ur"].includes(lang.substr(0, 2));
    }
  });
  