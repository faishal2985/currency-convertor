const currencyList = [
    "USD", "EUR", "GBP", "INR", "AUD", "CAD", "SGD", "JPY", "CNY", "ZAR",
    "RUB", "BRL", "KRW", "MXN", "IDR", "CHF", "SEK", "TRY", "AED", "MYR"
  ];
  
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");
  const resultDiv = document.getElementById("result");
  
  currencyList.forEach(currency => {
    const option1 = new Option(currency, currency);
    const option2 = new Option(currency, currency);
    fromCurrency.add(option1);
    toCurrency.add(option2);
  });
  
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
  
  async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const from = fromCurrency.value;
    const to = toCurrency.value;
  
    if (!amount) {
      resultDiv.innerText = "Please enter an amount!";
      return;
    }
  
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/${from}`);
      const data = await response.json();
  
      if (data.result === "success") {
        const rate = data.conversion_rates[to];
        const converted = (amount * rate).toFixed(2);
        resultDiv.innerText = `${amount} ${from} = ${converted} ${to}`;
      } else {
        resultDiv.innerText = "Error fetching rates.";
      }
    } catch (error) {
      resultDiv.innerText = "API error. Please try again.";
    }
  }
  