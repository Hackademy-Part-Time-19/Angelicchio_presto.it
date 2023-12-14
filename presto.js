function injectCard(imgSrc, nomeProdotto, prezzoProd){
    var card = document.createElement('div');
    card.className = 'card';

    var img = document.createElement('img');
    img.className = 'card-img'
    img.src = imgSrc;
    img.alt = 'Product Image';

    var cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    var prodotto = document.createElement('h2');
    prodotto.className = 'card-title';
    prodotto.textContent = nomeProdotto;

    var prezzo = document.createElement('p');
    prezzo.className = 'card-price';
    prezzo.textContent = prezzoProd+'€';

    var button = document.createElement('a');
    button.className = 'buy-button';
    button.textContent = 'Acquista ora';
    button.href = '#';

    cardContent.appendChild(prodotto);
    cardContent.appendChild(prezzo);
    cardContent.appendChild(button);

    card.appendChild(img);
    card.appendChild(cardContent);

    var divMain = document.getElementById('div-main');
    divMain.appendChild(card);
}

function aggiungiProdotti(filtroCategoria, filtroPrezzo, filtroArticolo){
    fetch("https://fakestoreapi.com/products")
        .then((response) =>{return response.json()})
        .then(data => {
            let immagine;
            let articolo;
            let prezzo;

            let limiteInferiore = filtroPrezzo?.split("-")[0];
            let limiteSuperiore = filtroPrezzo?.split("-")[1]; 

            data = data.filter(function (prodotto){
                return prodotto.category==filtroCategoria && prodotto.title.startsWith(filtroArticolo)
                && prodotto.price >= limiteInferiore && prodotto.price <= limiteSuperiore;   
            })

            for(let i = 0; i<data.length; i++){
                immagine = data[i].image;
                articolo = data[i].title;
                prezzo = data[i].price;
                injectCard(immagine, articolo, prezzo);
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

window.addEventListener("load", (event) =>{
    let url = new URL(window.location.href);

    let filtroCategoria = url.searchParams.get("filtroCategoria");
    let filtroPrezzo = url.searchParams.get("filtroPrezzo");
    let filtroArticolo = url.searchParams.get("filtroArticolo");

    aggiungiProdotti(filtroCategoria, filtroPrezzo, filtroArticolo);
})


