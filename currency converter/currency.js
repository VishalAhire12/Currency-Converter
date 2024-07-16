document.addEventListener('DOMContentLoaded', () => {
    const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'];

    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');

    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.text = currency;
        fromCurrency.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.text = currency;
        toCurrency.appendChild(optionTo);
    });

    const form = document.getElementById('converter-form');
    form.addEventListener('submit', async (e) => {
       e.preventDefault();
        
        const amount = document.getElementById('amount').value;
        const fromCurrencyValue = fromCurrency.value;
        const toCurrencyValue = toCurrency.value;
        const resultDiv = document.getElementById('result');

        try {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
            const data = await response.json();
            const rate = data.rates[toCurrencyValue];
            const convertedAmount = (amount * rate).toFixed(2);
            resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
        } catch (error) {
            resultDiv.textContent = 'Error fetching conversion rate.';
            
        }
    });
});