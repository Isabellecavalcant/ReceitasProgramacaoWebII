import { montarTabela } from "./tabela.js";

const urlBase = "https://jsonplaceholder.typicode.com";

// Diferentemente da receita 7, aqui as Promises são encadeadas com then e catch.
const buscarEExibir = (recurso, idResultado, idMensagem, colunas, limite) => {
  const resultado = document.getElementById(idResultado);
  const mensagem = document.getElementById(idMensagem);
  resultado.replaceChildren();
  mensagem.textContent = "Fazendo requisição...";

  return fetch(`${urlBase}/${recurso}`)
    .then(resposta => {
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      return resposta.json();
    })
    .then(dados => {
      if (!Array.isArray(dados)) throw new Error("Resposta inesperada da API.");
      if (dados.length === 0) {
        mensagem.textContent = "Nenhum resultado encontrado.";
        return;
      }

      resultado.replaceChildren(montarTabela(dados.slice(0, limite), colunas));
      const quantidade = Math.min(dados.length, limite);
      mensagem.textContent = `${quantidade} ${quantidade === 1 ? "registro exibido" : "registros exibidos"}.`;
    })
    .catch(erro => {
      mensagem.textContent = "Não foi possível carregar os dados. Confira sua conexão e tente novamente.";
      console.error("Falha na consulta:", erro);
    });
};

document.getElementById("buscarUsuarios").addEventListener("click", () =>
  buscarEExibir("users", "usuariosResultado", "usuariosMensagem", [
    { titulo: "Nome", propriedade: "name" },
    { titulo: "Usuário", propriedade: "username" },
    { titulo: "E-mail", propriedade: "email" }
  ], 10)
);

document.getElementById("buscarPublicacoes").addEventListener("click", () =>
  buscarEExibir("posts", "publicacoesResultado", "publicacoesMensagem", [
    { titulo: "ID", propriedade: "id" },
    { titulo: "Título", propriedade: "title" },
    { titulo: "Autor (ID)", propriedade: "userId" }
  ], 10)
);
