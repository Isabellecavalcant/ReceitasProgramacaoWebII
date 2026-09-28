// Função genérica importada pelo script desta receita.
export const montarTabela = (itens, colunas) => {
  const tabela = document.createElement("table");
  const cabecalho = document.createElement("thead");
  const linhaCabecalho = document.createElement("tr");

  linhaCabecalho.append(...colunas.map(({ titulo }) => {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = titulo;
    return th;
  }));
  cabecalho.append(linhaCabecalho);

  const corpo = document.createElement("tbody");
  corpo.append(...itens.map(item => {
    const linha = document.createElement("tr");
    linha.append(...colunas.map(({ propriedade }) => {
      const td = document.createElement("td");
      td.textContent = item[propriedade] ?? "—";
      return td;
    }));
    return linha;
  }));
  tabela.append(cabecalho, corpo);
  return tabela;
};
