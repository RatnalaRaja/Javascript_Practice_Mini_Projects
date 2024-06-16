const button = document.querySelector("#butu");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");

let apiQuote = {};

async function getQuotes() {
    try {
        const response = await fetch("https://type.fit/api/quotes");
        const quotes = await response.json();
        apiQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.innerText = apiQuote.text;
        let author = apiQuote.author;
        if (author.includes(", type.fit")) {
            author = author.replace(", type.fit", "");
        }
        quoteAuthor.innerText = author;
    } catch (error) {
        console.error('Error fetching the quotes:', error);
    }
}

button.addEventListener("click", getQuotes);
