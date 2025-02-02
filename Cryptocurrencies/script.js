// Function to fetch data from CoinGecko API
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to render crypto data in the table
function renderCryptoData(data) {
    const cryptoList = document.getElementById('crypto-list');
    cryptoList.innerHTML = '';

    data.forEach((coin, index) => {
        const row = document.createElement('tr');
        const priceChangeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <img src="${coin.image}" alt="${coin.name}" width="20" height="20">
                ${coin.name} (${coin.symbol.toUpperCase()})
            </td>
            <td>$${coin.current_price.toFixed(2)}</td>
            <td class="${priceChangeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
        `;

        cryptoList.appendChild(row);
    });
}

// Main function to fetch and render data
async function main() {
    const loadingElement = document.getElementById('loading');
    const tableElement = document.getElementById('crypto-table');

    loadingElement.style.display = 'block';
    tableElement.style.display = 'none';

    const data = await fetchCryptoData();

    if (data.length > 0) {
        renderCryptoData(data);
        loadingElement.style.display = 'none';
        tableElement.style.display = 'table';
    } else {
        loadingElement.textContent = 'Failed to load data. Please try again later.';
    }
}

// Run the main function when the page loads
window.addEventListener('load', main);