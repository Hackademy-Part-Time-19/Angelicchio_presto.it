function injectCard(imgSrc, nomeProdotto, prezzoProd){
    var card = document.createElement('div');
    card.className = 'card';

    var img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Product Image';

    var cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    var prodotto = document.createElement('h2');
    prodotto.className = 'card-title';
    prodotto.textContent = nomeProdotto;

    var prezzo = document.createElement('p');
    prezzo.className = 'card-price';
    prezzo.textContent = prezzoProd;

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

for(var i = 0; i<6; i++){
    injectCard('./Senza titolo.jpg', 'nome prodotto', 200);
}