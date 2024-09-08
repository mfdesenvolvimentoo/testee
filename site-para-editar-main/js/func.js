// Função para verificar o funcionamento de estabelecimentos com base em dias e horários
export default function func() {
  const funcionamento = document.querySelectorAll("[data-semana]"); // Seleciona os elementos com o atributo data-semana

  const dataAgora = new Date(); // Obtém a data e hora atual
  const diaAgora = dataAgora.getDay(); // Obtém o dia da semana atual (0 = domingo, 6 = sábado)
  const horasAgora = dataAgora.getHours(); // Obtém a hora atual
  const minutosAgora = dataAgora.getMinutes(); // Obtém os minutos atuais
  const horarioAgora = +`${horasAgora}.${minutosAgora}`; // Concatena horas e minutos como número decimal

  // Verifica cada elemento de funcionamento
  funcionamento.forEach((func) => {
    const diasSemana = func.dataset.semana.split(",").map(Number); // Obtém os dias da semana do dataset e converte para números
    const horarioSemana = func.dataset.horario.split(",").map(Number); // Obtém o horário de funcionamento do dataset e converte para números

    const semanaAberto = diasSemana.indexOf(diaAgora) !== -1; // Verifica se o dia atual está dentro dos dias de funcionamento
    const horarioAberto =
      horarioAgora >= horarioSemana[0] && horarioAgora < horarioSemana[1]; // Verifica se o horário atual está dentro do horário de funcionamento

    if (semanaAberto && horarioAberto) {
      func.classList.add("aberto"); // Adiciona a classe 'aberto' se estiver dentro do horário e dia de funcionamento
    }
    if (!semanaAberto) {
      func.classList.add("not-day"); // Adiciona a classe 'not-day' se não for o dia de funcionamento
    }
  });
}
