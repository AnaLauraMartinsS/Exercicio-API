# API de Gerenciamento de Alunos e Cursos 👩‍🎓

Esta é uma API simples desenvolvida em **Node.js** com **Express** para gerenciar alunos e seus cursos de aperfeiçoamento.

---

## 🔧 Tecnologias utilizadas

- Node.js
- Express
- Insomnia (para testes) das rotas
- JSON para requisições e respostas

---

## 🚀 Instalando e executando

1. Clone o repositório (git clone)
2. Entre no projeto (cd <nome do projeto>)
3. Instale as dependências com (npm install)
4. Execute o servidor (node app.js)
- Roda na porta: http://localhost:3000

📚 Endpoints
1. Adicionar aluno

POST /alunos

Body (JSON):

{
  "ra": 123,
  "nome": "Diego",
  "turma": "ADS"
}

2. Adicionar curso para aluno

POST /alunos/:ra/cursos

Body (JSON):

{
  "curso": "JavaScript"
}

3. Alterar dados de um aluno

PUT /alunos/:ra

Body (JSON) (somente os campos que deseja alterar):

{
  "nome": "Diego Silva"
}

4. Remover aluno

DELETE /alunos/:ra

5. Remover curso de um aluno

DELETE /alunos/:ra/cursos

Body (JSON):

{
  "curso": "JavaScript"
}

6. Listar todos os alunos

GET /alunos

7. Listar aluno por RA

GET /alunos/:ra

Retorno:

{
  "nome": "Diego",
  "turma": "ADS",
  "cursos": ["JavaScript", "Angular"]
}



