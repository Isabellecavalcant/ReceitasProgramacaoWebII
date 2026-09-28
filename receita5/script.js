// O mesmo vetor é passado às funções em vez de ser acessado por elas como variável global.
const sorvetes = ["Chocolate", "Morango", "Pistache", "Baunilha"];

const carregarDiv = itens => {
  const div = document.getElementById("resultado");
  const sorvetesHtml = itens.map(item => {
    const cartao = document.createElement("div");
    cartao.className = "sorvete";
    cartao.textContent = item;
    return cartao;
  });
  div.replaceChildren(...sorvetesHtml);
};

const carregarTabela = itens => {
  const div = document.getElementById("resultado");
  const tabela = document.createElement("table");
  const cabecalho = document.createElement("thead");
  const linhaCabecalho = document.createElement("tr");
  const titulo = document.createElement("th");
  titulo.textContent = "Sorvete";
  linhaCabecalho.append(titulo);
  cabecalho.append(linhaCabecalho);
  const corpo = document.createElement("tbody");
  const linhas = itens.map(item => {
    const linha = document.createElement("tr");
    const celula = document.createElement("td");
    celula.textContent = item;
    linha.append(celula);
    return linha;
  });
  corpo.append(...linhas);
  tabela.append(cabecalho, corpo);
  div.replaceChildren(tabela);
};

const ordenarSorvetes = itens => {
  itens.sort((a, b) => a.localeCompare(b, "pt-BR"));
  carregarTabela(itens);
};

const embaralharSorvetes = itens => {
  // Reaproveita Array.sort, como no exercício anterior.
  itens.sort(() => Math.random() - 0.5);
  carregarDiv(itens);
};

document.getElementById("mostrar").addEventListener("click", () => carregarDiv(sorvetes));
document.getElementById("tabela").addEventListener("click", () => carregarTabela(sorvetes));
document.getElementById("ordenar").addEventListener("click", () => ordenarSorvetes(sorvetes));
document.getElementById("embaralhar").addEventListener("click", () => embaralharSorvetes(sorvetes));
