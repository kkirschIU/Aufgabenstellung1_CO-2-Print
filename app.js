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
      el: '#companies_CO2',
      data: {
        companies: [],
        filteredCompanies: [],
        companySearchTerm: '',
        sortOption: 'default'
      },
      mounted() {
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
      methods: {
        filterCompanies() {
          const searchTerm = this.companySearchTerm.toLowerCase();
          this.filteredCompanies = this.companies.filter(company => company.name.toLowerCase().includes(searchTerm));
        },
        sortTableCompany() {
          const rows = this.filteredCompanies.slice(0); // Kopie der gefilterten Unternehmen
    
          if (this.sortOption === 'alphabetical') {
            rows.sort((a, b) => a.name.localeCompare(b.name));
          } else if (this.sortOption === 'emissions_asc') {
            rows.sort((a, b) => a.co2_ausstoß - b.co2_ausstoß);
          } else if (this.sortOption === 'emissions_desc') {
            rows.sort((a, b) => b.co2_ausstoß - a.co2_ausstoß);
          }
    
          this.filteredCompanies = rows;
        }
      },
      watch: {
        companySearchTerm() {
          this.filterCompanies();
        },
        sortOption() {
          this.sortTableCompany();
        }
      }
    });

 