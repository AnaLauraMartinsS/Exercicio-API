const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

// criação da variável de alunos que ja existem
var alunos = [
    {
        "ra": 123,
        "nome": "Diego",
        "turma": "ADS",
        "cursos": ["JavaScript", "Angular", "Java"]
    },
    {
        "ra": 456,
        "nome": "Angelo",
        "turma": "ADS",
        "cursos": ["Java", "React", "Spring Boot"]
    }
]
// metodo para adicionar aluno na lista
app.post('/alunos', (req, res) => {

  const {ra, nome, turma} = req.body; // requisição dessas informações no body
  // criando um objeto aluno
  const aluno = { ra, nome, turma, cursos: [] };

  // verificação -> a pessoa tem que passar ra, nome e uma turma, se não manda um erro
  if(!ra || !nome || !turma){
    return res.status(400).json({erro: "O ra, nome e turma são obrigatórios"})
  }

  // verificação se já existe um aluno com o mesmo ra
  const existe = alunos.find(a => a.ra === ra)
  // se existir dispara um erro
  if(existe){
    return res.status(409).json({erro: `Já possuí um aluno com o mesmo ra: ${ra}`})
  }

  // adicionamos um aluno na lista de alunos utilizando o push(adiciona ao final)
  alunos.push(aluno);
  // retorna a criação do aluno na lista de alunos
  return res.status(201).json(aluno)

});

// rota post para cursos de alunos, procurando pelo RA
app.post("/alunos/:ra/cursos", (req, res) => {
  //solicitando o ra e o curso
  const ra = Number(req.params.ra); // conversão para números no momento do params
  const { curso } = req.body;

  // busca de aluno pelo ra, utilizando o find equals ra
  const aluno = alunos.find(a => a.ra === ra);

  //verificação de que se o aluno não existe, retorna um status de erro
  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno inexistente." });
  }

  if (aluno.cursos.includes(curso)){
    return res.status(404).json({mensagem: `Já existe esse curso para esse aluno: ${ra}`});
  }

  // adicionando cursos ao cursos
  aluno.cursos.push(curso);

  // retorno do aluno atualizado
  res.status(200).json(aluno);
});

//alterar dados de um aluno através de um RA
app.put("/alunos/:ra", (req, res) => {
  //solicitando o ra e o curso
  const ra = Number(req.params.ra); // conversão para números no momento do params
  const aluno = alunos.find(a => a.ra === ra);
  
  //verificação de que se o aluno não existe, retorna um status de erro
  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno inexistente." });
  }

  // percorre cada campo enviado pelo body
  for (let chave in req.body){
    aluno[chave] = req.body[chave]; //então atualiza
  }

  // retorno do status 200 de aluno atualizado com sucesso
  return res.status(200).json(aluno)({mensagem: `Aluno com o ra ${ra}, atualizado com sucesso`});

});

// deleção de um aluno pelo RA
app.delete("/alunos/:ra", (req, res) => {
  //solicitando o ra e o curso
  const ra = Number(req.params.ra); // conversão para números no momento do params
  const aluno = alunos.find(a => a.ra === ra);

  //retorno do erro se o aluno não existe
  if(!aluno){
    return res.status(404).json({mensagem: "Aluno não encontrado"})
  }else{
    const index = alunos.indexOf(aluno); // armazenando o aluno encontrado em uma variavel
    alunos.splice(index, 1); // remove o aluno de dentro do array
    return res.status(200).json({mensagem: `Aluno, com o ra: ${ra} removido com sucesso!`})
  }
});

// deleção de curso de um aluno pelo RA
app.delete("/alunos/:ra/cursos", (req, res) => {
  //solicitando o ra e o curso
  const ra = Number(req.params.ra); // conversão para números no momento do params
  const { curso } = req.body;

  // encontra o aluno
  const aluno = alunos.find(a => a.ra === ra);

  // verifica se o aluno existe
  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno não encontrado" });
  }

  // encontra o índice do curso dentro do array de cursos do aluno
  const indexCurso = aluno.cursos.indexOf(curso);

  // se o curso não existir, retorna erro
  if (indexCurso === -1) {
    return res.status(404).json({ mensagem: "Curso não encontrado para esse aluno" });
  }

  // remove o curso de dentro do array
  aluno.cursos.splice(indexCurso, 1);

  // retorna mensagem de sucesso
  return res.status(200).json({
    mensagem: "Curso removido com sucesso!",
    aluno
  });
});

// listagem de todos os alunos
app.get("/alunos", (req, res) => {
  // retorna apenas RA, nome e turma de cada aluno
  const lista = alunos.map(a => ({
    ra: a.ra,
    nome: a.nome,
    turma: a.turma
  }));

  res.status(200).json(lista);
});

// listagem de alunos buscando pelo RA
app.get("/alunos/:ra", (req, res) => {
  //solicitando o ra e o curso
  const ra = Number(req.params.ra); // conversão para números no momento do params
  const aluno = alunos.find(a => a.ra === ra);

  // se o aluno não existe retorna um erro
  if (!aluno) {
    return res.status(404).json({ mensagem: "Aluno não encontrado" });
  }

  // retorna apenas os campos solicitados
  const resultado = {
    nome: aluno.nome,
    turma: aluno.turma,
    cursos: aluno.cursos
  };

  res.status(200).json(resultado);
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
});
