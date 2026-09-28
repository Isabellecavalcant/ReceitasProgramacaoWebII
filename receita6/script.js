const cervejas = [
  { name: "Guinness", alcohol: "4,2%", style: "Stout", ibu: "45" },
  { name: "Desperados", alcohol: "5,9%", style: "Lager", ibu: "20" },
  { name: "Becks", alcohol: "5,0%", style: "Pilsen", ibu: "25" }
];

const sorvetes = [
  { sabor: "Chocolate", preco: "R$ 8,00", disponivel: "Sim" },
  { sabor: "Morango", preco: "R$ 7,00", disponivel: "Sim" },
  { sabor: "Pistache", preco: "R$ 10,00", disponivel: "Não" }
];

// Os três parâmetros opcionais tornam a função reutilizável para outras tabelas.
const carregarDiv = (
  itens,
  id = "cervejasDiv",
  cabecalhos = ["Nome", "Álcool", "Estilo", "Amargor"],
  propriedades = ["name", "alcohol", "style", "ibu"]
) => {
  const destino = document.getElementById(id);
  if (!destino || cabecalhos.length !== propriedades.length) {
    throw new Error("Destino inexistente ou número de cabeçalhos diferente do número de propriedades.");
  }

  const tabela = document.createElement("table");
  const cabeca = document.createElement("thead");
  const linhaCabeca = document.createElement("tr");
  linhaCabeca.append(...cabecalhos.map(nome => {
    const coluna = document.createElement("th");
    coluna.scope = "col";
    coluna.textContent = nome;
    return coluna;
  }));
  cabeca.append(linhaCabeca);

  const corpo = document.createElement("tbody");
  corpo.append(...itens.map(item => {
    const linha = document.createElement("tr");
    linha.append(...propriedades.map(chave => {
      const coluna = document.createElement("td");
      coluna.textContent = item[chave] ?? "—";
      return coluna;
    }));
    return linha;
  }));

  tabela.append(cabeca, corpo);
  destino.replaceChildren(tabela);
};

document.getElementById("botaoCervejas").addEventListener("click", () => carregarDiv(cervejas));
document.getElementById("botaoSorvetes").addEventListener("click", () =>
  carregarDiv(sorvetes, "sorvetesDiv", ["Sabor", "Preço", "Disponível"], ["sabor", "preco", "disponivel"])
);
