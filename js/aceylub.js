const catalogo = document.querySelector("#catalogo");
const msg = document.querySelector(".operacao");

let filmes = [
    "Lubricante Hot<hr>A base de agua <br> efecto calor 30ml<hr>$5.990",
    "Lubricante Ice<hr>A base de agua <br> efecto Hielo 30ml<hr>$5.990",
    "Lubricante Chocolate<hr>A base de agua <br> Comestible 30ml<hr>$5.990",
    "Lubricante Aloe Vera<hr>A base de agua <br> 60ml <hr>$9.990",
    "Gel Anal dilatador <hr> A base de agua <br> 60ml <hr>$10.990",
    "Gel retardante <hr> A base de agua <br> 60ml <hr>$9.990",
    "Gel Anal Anestesico <hr> A base de agua <br> 60ml <hr>$10.990",
    "Feromona Para mujer <hr> Con aroma <br> 30ml <hr>$12.200",
    "Aceite Premium masajes<hr>Sabor tutifruti  <br>comestible 60ml <hr>$9.990 ",
    "Aceite Premium masajes<hr>Sabor Chocolate  <br>comestible 60ml <hr>$9.990 ",
    "Aceite Premium masajes<hr>Sabor Bailey  <br>comestible 60ml <hr>$9.990 ",
    "Potenciador V95 <hr> <br> 10 Capsulas <hr>$9.990"
];

let listaImgFilmes = [
    "https://jenylove.cl/wp-content/uploads/2022/11/Lubricante-FuegoSex-Efecto-Calor.webp",
    "https://jenylove.cl/wp-content/uploads/2022/11/Lubricante-Hielo-Sex-Efecto-Frio.webp",
    "https://jenylove.cl/wp-content/uploads/2022/11/Lubricante-ChocoSex-Sabor-Chocolate.webp",
    "https://jenylove.cl/wp-content/uploads/2022/10/Gel-Lubricante-Premium-Aloe.webp",
    "https://jenylove.cl/wp-content/uploads/2022/10/Gel-Lubricante-Premium-Anal-con-Dilatador.webp",
    "https://jenylove.cl/wp-content/uploads/2023/01/Gel-Lubricante-Premium-con-Retardante.png",
    "https://jenylove.cl/wp-content/uploads/2020/02/Diseno-sin-titulo13.png",
    "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRZM5Em-YdE4zP_sVTsriCRzIo2-uilUK3YTKxYDgoHYaX9Z_QxM_0xA2NWeCpsHKXgvFQEDS0MFxY2VvQqWigofz5UZX6B1JyYeTUHiI73492fGLQYYczVOj9G&usqp=CAE",
    "https://jenylove.cl/wp-content/uploads/2020/10/frutilla.png",
    "https://jenylove.cl/wp-content/uploads/2020/10/chocolate.png",
    "https://jenylove.cl/wp-content/uploads/2020/10/bailey.png",
    "https://jenylove.cl/wp-content/uploads/2020/01/V95-MEN-10-CAPSULAS.webp"
];

function exibeFilmes() {
    for (let i = 0; i < filmes.length; i++) {
        catalogo.innerHTML += `
        <div class='singleFilm'>
        <img src="${listaImgFilmes[i]}">
        <span class='nomeFilme'>${filmes[i]}</span>
        </div>
        `;
    }
}

exibeFilmes();

function addFilme() {
    let newFilme = prompt("Digite o nome de um filme").toLowerCase();
    let newImgFilme = prompt("URL da capa do filme:");

    if (newFilme == "" || newImgFilme == "") {
        alert("Um dos campos está vázio!");
    } else if (newFilme == null || newImgFilme == null) {
        msg.innerHTML =
            'Operação Cancelada<span onclick="fecharMensagem()" class="close" title="Fechar">x</span>';
        mostrarMensagem();
    } else {
        filmes.push(newFilme);
        listaImgFilmes.push(newImgFilme);
        catalogo.innerHTML += `
        <div class='singleFilm'>
        <img onclick="trailer()" src="${listaImgFilmes[listaImgFilmes.length - 1]
            }">
        <span class='nomeFilme'>${filmes[filmes.length - 1]}</span>
        </div>
        `;
        msg.innerHTML =
            'Filme Adicionado com Sucesso<span onclick="fecharMensagem()" class="close" title="Fechar">x</span>';
        mostrarMensagem();
    }
}

function removerFilme() {
    let deleteFilme = prompt("Qual filme deseja remover?");
    deleteFilme = deleteFilme.toLowerCase();

    if (filmes.indexOf(deleteFilme) == -1) {
        msg.innerHTML =
            'Filme Não Encontrado<span onclick="fecharMensagem()" class="close" title="Fechar">x</span>';
        mostrarMensagem();
    } else {
        deleteIndice = filmes.indexOf(deleteFilme);
        filmes.splice(deleteIndice, 1);
        listaImgFilmes.splice(deleteIndice, 1);
        catalogo.innerHTML = "";
        exibeFilmes();
        msg.innerHTML =
            'Filme Removido com Sucesso<span onclick="fecharMensagem()" class="close" title="Fechar">x</span>';
        mostrarMensagem();
    }
}
function fecharMensagem() {
    document.getElementById("msg").style.display = "none";
}

function mostrarMensagem() {
    document.getElementById("msg").style.display = "block";
}
