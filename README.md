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

## 📚 Endpoints

| Ação | Método | Endpoint | Body / Observações | Retorno |
|------|--------|----------|------------------|---------|
| Adicionar aluno | POST | /alunos | `{ "ra": 123, "nome": "Diego", "turma": "ADS" }` | Aluno criado com sucesso (201) |
| Adicionar curso para aluno | POST | /alunos/:ra/cursos | `{ "curso": "JavaScript" }` | Aluno atualizado com o novo curso (200) |
| Alterar dados de um aluno | PUT | /alunos/:ra | `{ "nome": "Diego Silva" }` (somente campos a alterar) | Aluno atualizado (200) |
| Remover aluno | DELETE | /alunos/:ra | - | Mensagem de sucesso (200) ou 404 se não encontrado |
| Remover curso de um aluno | DELETE | /alunos/:ra/cursos | `{ "curso": "JavaScript" }` | Mensagem de sucesso (200) ou 404 se não encontrado |
| Listar todos os alunos | GET | /alunos | - | Lista de alunos com RA, nome e turma (200) |
| Listar aluno por RA | GET | /alunos/:ra | - | `{ "nome": "Diego", "turma": "ADS", "cursos": ["JavaScript", "Angular"] }` (200) |



