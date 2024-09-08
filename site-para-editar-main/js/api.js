// Função que cria um carrossel de posts do Instagram utilizando a API
export default function api(postsNumber) {
  const prev = document.querySelector(".prev"); // Botão para o slide anterior

  // Função que cria elementos HTML para os posts
  function createLi() {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    const p = document.createElement("p");
    li.appendChild(a);
    li.appendChild(p);
    li.style.display = "none";
    a.appendChild(img);
    a.setAttribute("href", "");
    a.setAttribute("target", "_blank");
    img.setAttribute("src", "");
    prev.parentNode.insertBefore(li, prev.nextElementSibling);
  }

  // Cria elementos de lista baseados no número de posts
  for (let i = 0; i < postsNumber; i++) {
    createLi();
  }

  // Seleciona os elementos necessários para os slides
  const next = document.querySelector(".next"),
    slidesInsta = document.querySelectorAll(".slide-insta li"),
    linksInsta = document.querySelectorAll(".slide-insta li a"),
    imgsInsta = document.querySelectorAll(".slide-insta li a img"),
    textInsta = document.querySelectorAll(".slide-insta li p");

  // Adiciona eventos de clique para avançar e retroceder os slides
  next.addEventListener("click", adv);
  prev.addEventListener("click", bck);

  slidesInsta[0].style.display = "block"; // Mostra o primeiro slide

  const slidesQtd = slidesInsta.length - 1; // Quantidade de slides menos 1

  let i = 0;

  // Função para avançar o slide
  function adv() {
    if (i < slidesQtd) {
      i = i + 1;
    } else {
      i = 0;
    }
    slidesInsta.forEach((slide) => {
      slide.style.display = "none";
    });
    slidesInsta[i].style.display = "block";
  }

  // Função para retroceder o slide
  function bck() {
    i = i - 1;
    if (i < 0) {
      i = slidesQtd;
    }
    slidesInsta.forEach((slide) => {
      slide.style.display = "none";
    });
    slidesInsta[i].style.display = "block";
  }

  const token = "IGQVJVdWF6d1g1R1BYVFdSelJkM0dFM1pxOFhaOHBmd0pDOGg2Yy1NTmllbkxnRGNOYnpYOHFPX0txNnA0NDN2SXAyQTczRW5FaFp4LUh0RDNvRG9JQkFwblRVZAXJfMjYtOTZAKYm82cTdaOGxOTnRLRgZDZD";

  // Função que busca os posts do Instagram usando a API
  async function fetchInsta() {
    textInsta.forEach((txt) => {
      txt.innerText = "Carregando";
      txt.classList.add("loading");
    });
    const response = await fetch(
      `https://graph.instagram.com/me/media?access_token=${token}&fields=media_url,media_type,caption,permalink`
    );
    const resolve = await response.json();
    linksInsta.forEach((link, index) => {
      link.href = resolve.data[index].permalink;
    });
    imgsInsta.forEach((img, index) => {
      img.src = resolve.data[index].media_url;
    });
    textInsta.forEach((txt, index) => {
      txt.classList.remove("loading");
      txt.innerHTML = resolve.data[index].caption;
      if (txt.innerHTML.length > 200) {
        txt.innerHTML =
          txt.innerHTML.substring(0, 200) +
          ` <a class='link-post' href='${resolve.data[index].permalink}' target='_blank'>...Ver o post completo</a>`;
      }
      txt.innerHTML = txt.innerHTML.replace(
        /#(\w+)/g,
        `<a class='link-hash' href='https://www.instagram.com/explore/tags/$1' target='_blank'>$&</a>`
      );
    });
  }

  fetchInsta(); // Chama a função para buscar os posts

  // Adiciona um alt para as imagens dos posts
  const imgOfPost = document.querySelectorAll('.slide-insta li a img');
  imgOfPost.forEach((img) => {
    img.setAttribute('alt', 'Imagem do Post da Autoescola Hulk');
  })
}
