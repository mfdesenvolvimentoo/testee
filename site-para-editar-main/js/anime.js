// Função que controla animações de elementos ao rolar a página
export default function anima() {
  // Seleciona todos os elementos com o atributo data-anime
  const target = document.querySelectorAll('[data-anime]');
  const animationClass = 'animate'; // Classe que ativa a animação
  const video = document.querySelector('.video-home'); // Seleciona o vídeo da home
  const vid = document.getElementById('myVideo'); // Seleciona o vídeo por ID
  const body = document.getElementsByTagName('body')[0]; // Seleciona o elemento body

  // Função que verifica a posição da rolagem e ativa animações
  function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
    target.forEach(element => {
      if (windowTop > element.offsetTop) {
        element.classList.add(animationClass);
      } else if(element.classList.contains(animationClass)) {
        element.classList.remove(animationClass);
        if (!video.classList.contains(animationClass)) {
          vid.pause(); // Pausa o vídeo se a animação não estiver ativa
        }
      }
    })
  }

  animeScroll(); // Chama a função assim que o script é carregado

  // Verifica se o body contém a classe 'home' e observa mudanças
  if (body.classList.contains('home')) {
    const observer = new MutationObserver(handleMutation);
    observer.observe(video, {attributes: true});
  
    // Função que lida com mutações no DOM
    function handleMutation(mutation) {
      if (mutation[0].target.classList.contains('animate')) {
        vid.play(); // Reproduz o vídeo quando a animação é ativada
        observer.disconnect(); // Desconecta o observador após ativar
      }
    }
  }

  // Adiciona o evento de rolagem à janela para ativar as animações
  if (target.length) {
    window.addEventListener('scroll', animeScroll)
  }
}
