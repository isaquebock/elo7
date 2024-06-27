## Feature: Visualizar vagas

  Como usuário<br>
  Eu quero poder visualizar as vagas<br>
  Para ver quais vagas estão disponíveis

  ### Cenário: Visualizar vagas
    Dado que estou na página de vagas
    Quando desço a página
    Então devo visualizar as vagás disponíveis
<hr>

## Feature: Paginação

  Como usuário<br>
  Eu quero poder trocar de página<br>
  Para ver mais vagas disponíveis

  ### Cenário: Paginar listagem
    Dado que estou na página de vagas
    Quando clico em trocar página
    Então deve ser carregado a nova página de vagas
<hr>

## Feature: Buscar por vagas

  Como usuário<br>
  Eu quero poder buscar uma vaga<br>
  Para ver uma vaga específica

  ### Cenário: Busca por vaga
    Dado que estou na seção de vagas
    Quando digito no input de busca
    Então deve aparecer as vagas correspondente a busca
<hr>