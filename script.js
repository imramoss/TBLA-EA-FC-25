function popularDadosIniciais() {
  if (!localStorage.getItem("tabelaFifa")) {
    const dadosIniciais = [
      { time: "André", pontos: 15, jogos: 6, vitorias: 5, empates: 0, derrotas: 1, golsPro: 18, golsContra: 7, amarelos: 3, vermelhos: 0 },
      { time: "Davizão", pontos: 13, jogos: 6, vitorias: 4, empates: 1, derrotas: 1, golsPro: 15, golsContra: 8, amarelos: 2, vermelhos: 1 },
      { time: "Gabriel", pontos: 10, jogos: 6, vitorias: 3, empates: 1, derrotas: 2, golsPro: 12, golsContra: 10, amarelos: 1, vermelhos: 0 },
      { time: "Jão", pontos: 9, jogos: 6, vitorias: 3, empates: 0, derrotas: 3, golsPro: 14, golsContra: 15, amarelos: 4, vermelhos: 1 },
      { time: "Haaland Moreno", pontos: 7, jogos: 6, vitorias: 2, empates: 1, derrotas: 3, golsPro: 9, golsContra: 13, amarelos: 3, vermelhos: 0 },
      { time: "Samuel", pontos: 5, jogos: 6, vitorias: 1, empates: 2, derrotas: 3, golsPro: 7, golsContra: 11, amarelos: 2, vermelhos: 1 }
    ];
    localStorage.setItem("tabelaFifa", JSON.stringify(dadosIniciais));
  }
}

function calcularPontosReais(time) {
  return (time.pontos || 0) - (time.amarelos || 0) - 2 * (time.vermelhos || 0);
}

function carregarTabela() {
  const tabelaBody = document.querySelector("#tabela-times tbody");
  const dados = JSON.parse(localStorage.getItem("tabelaFifa") || "[]");

  if (!dados.length) {
    tabelaBody.innerHTML = "<tr><td colspan='12'>Nenhum dado para exibir.</td></tr>";
    return;
  }

  dados.forEach((time) => {
    if (time.jogos === 0) {
      Object.keys(time).forEach(key => {
        if (key !== "time") time[key] = 0;
      });
    }
  });

  dados.sort((a, b) => calcularPontosReais(b) - calcularPontosReais(a));

  tabelaBody.innerHTML = "";

  dados.forEach((time, i) => {
    const saldo = (time.golsPro || 0) - (time.golsContra || 0);
    const linha = document.createElement("tr");
    // Dentro do forEach de carregarTabela()
if (i === 0) linha.classList.add("ouro");
else if (i === 1) linha.classList.add("prata");
else if (i === 2) linha.classList.add("bronze");

    const colunas = [
      i + 1,
      time.time,
      calcularPontosReais(time),
      time.jogos,
      time.vitorias,
      time.empates,
      time.derrotas,
      time.golsPro,
      time.golsContra,
      `🟨 ${time.amarelos || 0}`,
      `🟥 ${time.vermelhos || 0}`,
      saldo >= 0 ? `+${saldo}` : saldo
    ];

    colunas.forEach(val => {
      const td = document.createElement("td");
      td.textContent = val;
      linha.appendChild(td);
    });

    tabelaBody.appendChild(linha);
  });
}

document.getElementById("botao-secreto").addEventListener("click", () => {
  window.location.href = "admin.html";
});

window.onload = () => {
  popularDadosIniciais();
  carregarTabela();
};