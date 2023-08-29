new Vue({
    el: '#app',
    data: {
      isRtlLanguage: false,
      lang: navigator.language || navigator.userLanguage,
      rtlLanguages: ["ar", "he", "fa", "ur"]
    },
    methods: {
      setContainerOrder() {
        this.isRtlLanguage = this.rtlLanguages.includes(this.lang.substr(0, 2));
        console.log("Erkannte Browsersprache:", this.lang);
      }
    },
    mounted() {
      this.setContainerOrder();
    }
  });