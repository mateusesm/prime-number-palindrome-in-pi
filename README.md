### Desafio da SigmaGeek 2022 - Encontrando números primos grandes na expansão decimal de PI.

#### Algoritmos que leem expansão decimal do número PI (3,1415...) por meio de uma API ou arquivos e trazem o primeiro número palíndromo primo com número de dígitos especificado pelo usuário

O algoritmo do arquivo apiSearchPi.js faz a busca por meio da API (https://pi.delivery/#apifetch).
O algoritmo do arquivo fileSearchPi.js faz a busca em algum arquivo local que esteja disponível na máquina, sendo necessário talvez fazer algumas mudanças em nomes de diretórios.

Abaixo está um pequeno guia de instalação para rodar o projeto.

### Instalação

Após fazer o download deste projeto, certifique-se de que tem o Node JS instalado em sua máquina rodando o seguinte comando:

```bash
node --version
```

O comando deverá retornar a versão do Node JS instalada. Caso não retorne, baixe-a.

### Rodando o projeto

Depois de instalado o Node JS, será preciso baixar os módulos necessários, para isso, dentro do terminal, na pasta do projeto, executeo comando:

Você pode usar o gerenciador de pacotes de sua preferência (npm, yarn, etc.) para instalar todas as dependências, no meu caso, usei o npm:

```bash
npm install
```

Em seguida, rode o seguinte comando para executar o algoritmo que busca pela API:

```bash
npm run api-search
```

Ou, se desejar, busque pelo arquivo executando:

```bash
npm run file-search
```

Pode-se mudar a quantidade de dígitos do palíndromo e o salto de busca diretamente no código, de maneira intuitiva.
