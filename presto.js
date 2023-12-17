
function injectCard(imgSrc, nomeProdotto, prezzoProd, index){
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
    button.onclick = function(){
        dettaglioProdotto(imgSrc, nomeProdotto, prezzoProd);
    };

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
                return (filtroCategoria.length === 0 || prodotto.category === filtroCategoria) &&
                (filtroArticolo.length === 0 || prodotto.title.startsWith(filtroArticolo)) &&
                (filtroPrezzo.length === 0 || (prodotto.price >= limiteInferiore && prodotto.price <= limiteSuperiore));   
            })

            for(let i = 0; i<data.length; i++){
                immagine = data[i].image;
                articolo = data[i].title;
                prezzo = data[i].price;
                injectCard(immagine, articolo, prezzo, i);
            }
        })
        .catch(error =>{
            console.log(error);
        })
}

function cercaCatalogo(){
    let categoria = document.getElementById("inputCategoria").value;
    let prezzo = document.getElementById("inputPrezzo").value;
    let articolo = document.getElementById("inputArticolo").value;
    window.location.href = "./presto.html"+"?filtroCategoria="+categoria+"&filtroPrezzo="+prezzo+"&filtroArticolo="+articolo;
}

function dettaglioProdotto(img, nome, prezzo){
    window.location.href = "./prodotto.html"+"?articolo="+nome+"&prezzo="+prezzo+"&img="+img;
}

window.addEventListener("load", (event) =>{
   if(window.location.href.includes("presto.html")){
        let url = new URL(window.location.href);
        let filtroCategoria = url.searchParams.get("filtroCategoria");
        let filtroPrezzo = url.searchParams.get("filtroPrezzo");
        let filtroArticolo = url.searchParams.get("filtroArticolo");
        aggiungiProdotti(filtroCategoria, filtroPrezzo, filtroArticolo);
   }
   else if(window.location.href.includes("prodotto.html")){
        let url = new URL(window.location.href);
        let articolo = url.searchParams.get("articolo");
        let prezzo = url.searchParams.get("prezzo");
        let img = url.searchParams.get("img");
   }
   else if(window.location.href.includes("landingPage.html")){
        document.getElementById("inputCategoria").value = '';
        document.getElementById("inputPrezzo").value = '';
        document.getElementById("inputArticolo").value = '';
   }
})