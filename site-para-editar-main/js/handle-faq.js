// Função para controlar o comportamento de uma FAQ (perguntas frequentes)
const questions = document.querySelectorAll(".faq-ul li"); // Seleciona todos os itens da lista de perguntas
const answers = document.querySelectorAll(".faq-ul li p"); // Seleciona todas as respostas
const arrows = document.querySelectorAll(".arrow"); // Seleciona todos os ícones de seta

// Adiciona o evento de clique a cada pergunta
questions.forEach((question) => {
  question.addEventListener("click", showQ);
});

// Função que exibe ou oculta a resposta ao clicar na pergunta
function showQ(e) {
  answers[e.currentTarget.id].classList.toggle("block"); // Alterna a classe 'block' na resposta correspondente
  arrows[e.currentTarget.id].innerText = "▼"; // Muda a seta para baixo
  if (answers[e.currentTarget.id].classList.contains("block")) {
    arrows[e.currentTarget.id].innerText = "▲"; // Muda a seta para cima se a resposta estiver visível
  }
}

// Função exportada que pode ser usada para iniciar a FAQ (sem implementação no momento)
export default function handleFaq() {}
