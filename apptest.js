new Vue({
  el: '#app',
  data: {
    countries: [],
    filteredCountries: [],
    countrySearchTerm: '',
    sortOptionCountry: 'default',

    companies: [],
    filteredCompanies: [],
    companySearchTerm: '',
    sortOptionCompany: 'default',

    isRtlLanguage: false
  },
  mounted() {
    this.fetchCountryData();
    this.fetchCompanyData();
    this.detectRtlLanguage();
  },
  methods: {
    fetchCountryData() {
      // Fetch and populate countries data
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
    fetchCompanyData() {
      // Fetch and populate companies data
      fetch('companies.json')
      .then(response => response.json())
      .then(data => {
        this.companies = data.companies;
        this.filteredCompanies = data.companies;
      })
      .catch(error => {
        console.error('Fehler beim Laden der Daten:', error);
      });
    },
    detectRtlLanguage() {
      // Detect RTL language
      const lang = window.navigator.language || window.navigator.userLanguage;
      this.isRtlLanguage = ["ar", "he", "fa", "ur"].includes(lang.substr(0, 2));
    },
    filterCountries() {
      // Filtering countries
      const searchTerm = this.countrySearchTerm.toLowerCase();
      this.filteredCountries = this.countries.filter(country => country.Land.toLowerCase().includes(searchTerm));
    },
    sortTableCountry() {
      // Sorting countries table
      const rows = this.filteredCountries.slice(0); // Kopie der gefilterten Länder

      if (this.sortOptionCountry === 'alphabetical') {
        rows.sort((a, b) => a.Land.localeCompare(b.Land));
      } else if (this.sortOptionCountry === 'emissions_asc') {
        rows.sort((a, b) => a['tCO2/Kopf'] - b['tCO2/Kopf']);
      } else if (this.sortOptionCountry === 'emissions_desc') {
        rows.sort((a, b) => b['tCO2/Kopf'] - a['tCO2/Kopf']);
      }

      this.filteredCountries = rows;
    },
    filterCompanies() {
      // Filtering companies
      const searchTerm = this.companySearchTerm.toLowerCase();
      this.filteredCompanies = this.companies.filter(company => company.name.toLowerCase().includes(searchTerm));
    },
    sortTableCompany() {
      // Sorting companies table
      const rows = this.filteredCompanies.slice(0); // Kopie der gefilterten Unternehmen
  
      if (this.sortOptionCompany === 'alphabetical') {
        rows.sort((a, b) => a.name.localeCompare(b.name));
      } else if (this.sortOptionCompany === 'emissions_asc') {
        rows.sort((a, b) => a.co2_ausstoß - b.co2_ausstoß);
      } else if (this.sortOptionCompany === 'emissions_desc') {
        rows.sort((a, b) => b.co2_ausstoß - a.co2_ausstoß);
      }

      this.filteredCompanies = rows;
    }
  },
  watch: {
    // Watchers for countrySearchTerm, sortOptionCountry, companySearchTerm, and sortOptionCompany
    countrySearchTerm() {
      this.filterCountries();
    },
    sortOptionCountry() {
      this.sortTableCountry();
    },
    companySearchTerm() {
      this.filterCompanies();
    },
    sortOptionCompany() {
      this.sortTableCompany();
    }
  }
});
