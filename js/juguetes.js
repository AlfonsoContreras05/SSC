const catalogo = document.querySelector("#catalogo");
const msg = document.querySelector(".operacao");

let filmes = [
    "Anillo Eros<hr>Con Lengua<br>Vibrador <hr>$5.990",
    "Anillo Dionisio<hr>Doble estimulacion<br>Vibrador<hr>$5.990",
    "Anillo Hermes<hr>Con Perla estimuladora<br>Vibrador<hr>$4.990",
    "Plug Anal zafiro<hr> Acero quirurjico <br>L9.4cm D2.2cm<hr>$9.990",
    "Plug Anal <hr>Colita de Zorro <br> Fantasia <hr>$15.990",
    "Plug Anal <hr>Jelly Pequeño<br> Fantasia <hr>$5.990",
    "Plug Anal <hr>Jelly Grande<br> Fantasia <hr>$7.990",
    "Plug Anal <hr>Colita de Conejo <br> Fantasia <hr>$15.990",
    "Masturbador Vibrador<hr>forma de vagina <br> a pilas <hr>$22.990",
    "Masturbador Realista<hr>Senos-Vagina-Ano <br> .<hr>$39.990",
    "Bomba de Vacio <hr>Incrementa <br>el tamaño del pene<hr>$19.990",
    "Kit Bondage Completo <hr> 10 articulos Ecocuero <br> color negro o rojo <hr>$33.990 ",
    "Esposas Bondage <hr> Ecocuero <br> forradas ajustables <hr>$5.990",
    "Latigo Bondage <hr> Ecocuero <br>Color rosa <hr>$5.990",
    "",
    "",
    "",
    "",
    "",
    ""



];

let listaImgFilmes = [
    "https://jenylove.cl/wp-content/uploads/2022/07/DC026-6_%E5%89%AF%E6%9C%AC.jpg",
    "https://jenylove.cl/wp-content/uploads/2022/07/DC-050-2.jpg",
    "https://jenylove.cl/wp-content/uploads/2019/02/364197591-570281448.jpg",
    "https://jenylove.cl/wp-content/uploads/2022/07/Plug-Anal-Joya-Zafir.png",
    "https://jenylove.cl/wp-content/uploads/2019/01/15546943241593060491.jpg",
    "https://jenylove.cl/wp-content/uploads/2020/08/DN-014-14.jpg",
    "https://image.made-in-china.com/202f0j00igwkLAVlLQcn/Five-Beads-Jelly-Crystal-TPE-Material-Anal-Plug-Anal-Dilatation-Device.webp",
    "https://jenylove.cl/wp-content/uploads/2022/07/Plug-Anal-Cola-de-Conejo-de-JenyLove.png",
    "https://abaratalo.com/wp-content/uploads/2022/07/mv18622-8.jpg",
    "https://www.ropafetish.com/23219-thickbox_default/masturbador-tetas.jpg",
    "https://jenylove.cl/wp-content/uploads/2019/08/Bomba-De-vacio.png",
    "https://jenylove.cl/wp-content/uploads/2019/02/kit-de-bondage.jpg",
    "https://jenylove.cl/wp-content/uploads/2018/10/esposas-1.jpg",
    "https://s.cornershopapp.com/product-images/5636576.jpg?versionId=Ef3XIBiwhuIAg6lilrtxkvr9Dhhl4TuO",
    "",
    "",
    "",
    "",
    "",
    ""


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
