export default {
  methods: {
    withComma(value) {
      return parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
