
const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  export default (value) => {
    return currencyFormatter.format(Number(value))
  }