// Função para formatar o número de telefone ao digitar
export default function formatNumber() {
  const number = document.getElementById("tel"); // Seleciona o campo de telefone

  console.log(number);

  // Adiciona o evento de keyup ao campo de telefone
  number.addEventListener("keyup", formatNumber);

  // Função que formata o número de telefone
  function formatNumber() {
    const ddd = number.value[0] + number.value[1]; // Extrai o DDD
    const firstPartCel =
      number.value[2] +
      number.value[3] +
      number.value[4] +
      number.value[5] +
      number.value[6]; // Extrai a primeira parte do celular
    const secondPartCel =
      number.value[7] + number.value[8] + number.value[9] + number.value[10]; // Extrai a segunda parte do celular
    const firstPartTel =
      number.value[2] + number.value[3] + number.value[4] + number.value[5]; // Extrai a primeira parte do telefone fixo
    const secondPartTel =
      number.value[6] + number.value[7] + number.value[8] + number.value[9]; // Extrai a segunda parte do telefone fixo
    if (number.value.length >= 11) {
      number.value = `${ddd} ${firstPartCel} ${secondPartCel}`; // Formata como celular
    } else if (number.value.length >= 10) {
      number.value = `${ddd} ${firstPartTel} ${secondPartTel}`; // Formata como telefone fixo
    }
  }
}
