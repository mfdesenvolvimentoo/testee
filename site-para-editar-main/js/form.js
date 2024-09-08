// Função para enviar formulário de contato
export default function sendForm() {
  const form = document.getElementById("form"); // Seleciona o formulário
  const formDiv = document.querySelector(".contact-content .container"); // Seleciona o container do formulário
  const btnSubmit = document.getElementById("submit"); // Seleciona o botão de envio

  // Função que faz o envio dos dados do formulário usando fetch
  async function fetchMail(url) {
    btnSubmit.disabled = true; // Desabilita o botão enquanto o envio está em andamento
    btnSubmit.classList.add("disabled"); // Adiciona uma classe para indicar desativação
    btnSubmit.innerText = "Enviando..."; // Altera o texto do botão para indicar que está enviando
    const formDt = new FormData(form); // Cria um objeto FormData com os dados do formulário
    const response = await fetch(url, {
      method: "post",
      body: formDt,
    });
    const feedback = document.createElement("div"); // Cria um elemento div para exibir o feedback
    if (response.ok) {
      feedback.setAttribute("class", "success"); // Se a resposta for bem-sucedida, exibe uma mensagem de sucesso
      feedback.innerHTML =
        "<h3>Formulário enviado com sucesso!</h3><p>Em breve entraremos em contato com você.</p>";
    } else {
      feedback.setAttribute("class", "error"); // Se houver erro, exibe uma mensagem de erro
      feedback.innerHTML =
        "<h3>Houve algum erro</h3><p>Tente enviar diretamente para o e-mail: <a class='link-post' href='mailto:dorival@adilisbr.com'>contato@autoescolahulk.com</a></p>";
    }
    form.style.display = "none"; // Esconde o formulário após o envio
    formDiv.appendChild(feedback); // Adiciona o feedback ao container do formulário
  }

  // Adiciona o evento de envio ao formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita o comportamento padrão do envio
    fetchMail("contato.php"); // Chama a função para enviar o formulário
  });
}
