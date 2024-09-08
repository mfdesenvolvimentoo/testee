import slide from "./js/slide.js";  // Importa o módulo responsável pelo slider
import api from "./js/api.js";  // Importa o módulo responsável por interações com APIs
import handleFaq from "./js/handle-faq.js";  // Importa o módulo que gerencia as perguntas frequentes
import func from "./js/func.js";  // Importa o módulo com funções utilitárias diversas
import mobile from "./js/mobile.js";  // Importa o módulo para funcionalidades específicas de dispositivos móveis
import anime from "./js/anime.js";  // Importa o módulo para animações
import sendForm from './js/form.js';  // Importa o módulo para gerenciamento de formulários
import formatNumber from './js/format-number.js';  // Importa o módulo para formatação de números

mobile();  // Executa a função de inicialização para dispositivos móveis
anime();  // Executa a função de inicialização das animações

// Verifica se a página atual é a página inicial
if (document.body.classList.contains("home")) {
  slide();  // Inicializa o slider
  api(5);  // Faz uma chamada para a API com o parâmetro 5
}

// Verifica se a página atual é a de habilitação
if (document.body.classList.contains("habilitacao")) {
  handleFaq();  // Inicializa o gerenciador de perguntas frequentes
}

// Verifica se a página atual é a de unidades
if (document.body.classList.contains("unidades")) {
  func();  // Executa funções utilitárias para a página de unidades
}

// Verifica se a página atual é a de contato
if (document.body.classList.contains("contato")) {
  sendForm();  // Inicializa o envio de formulário
  formatNumber();  // Executa a formatação de números
}
