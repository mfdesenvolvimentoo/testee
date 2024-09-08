// Função para controlar o menu mobile
export default function mobile() {
  const btn = document.querySelector('.btn-mobile'); // Seleciona o botão do menu mobile
  const btnImg = document.querySelector('.btn-mobile img'); // Seleciona a imagem do botão
  const menu = document.querySelector('.header .container nav'); // Seleciona o menu de navegação

  // Adiciona o evento de clique no botão mobile
  btn.addEventListener('click', handleMobile);

  // Função que alterna a classe do menu mobile e altera a imagem do botão
  function handleMobile(e) {
    menu.classList.toggle('active-mobile'); // Alterna a classe 'active-mobile' no menu
    if (menu.classList.contains('active-mobile')) {
      btnImg.src = 'img/close.svg'; // Muda a imagem para "fechar" se o menu estiver ativo
    } else {
      btnImg.src = 'img/open.svg'; // Muda a imagem para "abrir" se o menu não estiver ativo
    }
  }
}
