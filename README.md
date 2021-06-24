# Fluxo de autenticação

**ENTRAR**

- _Pela primeira vez, a primeira tela deverá ser a welcome_

*EMAIL E SENHA*

- Informando o email e senha de um usúario cadastrado, deverá levar até a home do app
- Informando o email com formato incorreto deverá  mostrar uma mensagem de erro
- Informando a senha e/ou email incorreto deverá mostrar uma mensagem de erro
- Tentar entrar sem digitar deverá mostrar uma mensagem de erro
- Ao clicar em entrar, mostrar um loading enquanto não houver resposta da requisição

*GOOGLE/FACEBOOK*

- Deverá permitir logar no app com as credenciais do e-mail do google utilizado
- Caso o e-mail já esteja sendo utilizado em outro provedor, deverá informar a mensagem
- No primeiro acesso, deverá cadastrar as informações do usuário no banco (verificar melhor forma de cadastrar a senha)

**CADASTRAR**

- Deverá ser possível cadastrar uma nova conta informando todos os dados corretamente
- Informando os dados em formato incorreto ou em branco deverá mostrar uma mensagem de erro
- Ao clicar em cadastrar, mostrar um loading enquanto não houver resposta da requisição

# Fluxo de listagem dos anúncios na home

**LISTAGEM PADRÃO**

- _Listar no máximo 5 anúncios com base na localização do dispositivo e com base nos filtros padrões_
- _Caso o usuário esteja logado, listar os favoritos e verificar na lista padrão quais são favoritos_
- _Listar corretamente a distância do pet com base na localização atual_
- Listar corretamente o tempo em que o anúncio foi criado
- _Listar corretamente as imagens dos anúncios_
- _O conteúdo do card deverá expandir ao clicar, mostrando as informações do pet corretamente._
- _Ao puxar pra baixo no inicio da lista deverá atualizar a lista_
- _Ao chegar no final da lista deverá carregar mais anúncios_

**LISTAGEM COM FILTROS**

- _Poder filtrar os anúncios por especie_
- _Poder filtrar os anúncios por genero_
- _Poder filtrar os anúncios por distância_
- _Ao selecionar os filtros, mostrar loading até recompor a lista_
- O menu da lista de filtros deverá abrir ao primeiro clique

# Fluxo de criação, listagem e exclusão dos anúncios favoritos

- _Com o usuário logado, deverá poder salvar o anúncio como favorito na lista da home_
- _Deverá listar os anúncios favoritos na tela de favoritos_
- Deverá mostrar loading enquanto não houver resposta da requisição
- _Deverá mostrar uma mensagem padrão caso o usuário não possua favoritos_
- __Ao clicar pra salvar o favorito, deverá alterar o icone até obter uma resposta da requisição__
- _Deverá poder excluir o favorito ao clicar novamente no coração, tanto na lista, como na tela de favoritos_

# Fluxo de criação de anúncio

**CADASTRO DAS IMAGENS**

- Deverá ser possível cadastrar um anúncio com no mínimo 1 imagem e máximo de 4.
- Deverá poder cadastrar imagens da galeria e da camera
- Ao selecionar as imagens, elas deverão ser postas nas posições correspondentes
- _Ao tentar cadastrar sem imagens deverá mostrar uma mensagem de erro_

**ESPECIE**

- A especie padrão é 'others' caso o usuário não selecione nenhum

**NOME**

- O nome pode ficar em branco caso o pet não tenha sido batizado ainda

**IDADE**

- Idade padrão caso o usuário não selecione nenhuma

**GENERO**

- Genero padrão caso o usuário não selecione nenhuma

**DESCRIÇÃO**

- O usuário deverá preencher a descrição, caso contrario mostrar mensagem de erro

**LOCALIZAÇÃO**

- A localização padrão será a do dispositivo
- O usuário poderá selecionar a localidade clicando no mapa
- ``O usuário deverá poder buscar por algum local``

**CADASTRO**

- Ao clicar em cadastrar deverá mostrar loading até a resposta da requisição
- Mostrar mensagem de sucesso ou erro
- Caso dê sucesso, setar nulo a localidade selecionada, e redirecionar para a tela anterior
- Caso dê erro continuar na pagina

# Fluxo de listagem dos anúncios do usuário logado

- Deverá listar os anúncios do usuário
- Mostrar loading enquanto não houver resposta da requisição
- Deverá mostrar uma mensagem padrão caso o usuário não possua anúncios

# Fluxo de edição de anúncio

# Fluxo de exclusão de anúncio
