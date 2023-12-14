window.addEventListener("load", (event) => {
    document.getElementById("inputCategoria").value = '';
    document.getElementById("inputPrezzo").value = '';
    document.getElementById("inputArticolo").value = '';
})

function cercaCatalogo(){
    let categoria = document.getElementById("inputCategoria").value;
    let prezzo = document.getElementById("inputPrezzo").value;
    let articolo = document.getElementById("inputArticolo").value;
    window.location.href = "./presto.html"+"?filtroCategoria="+categoria+"&filtroPrezzo="+prezzo+"&filtroArticolo="+articolo;
}