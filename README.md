## Algoritmo que lê expansão decimal do número PI (3,1415...) por meio de uma API e traz o primeiro número palíndromo primo de 9 dígitos

O algoritmo foi criado em JavaScript utilizando Node JS. Neste projeto, além do consumo da API para obtensão da expansão decimal de PI, também disponibilizamos um arquivo de texto contendo a expansão decimal de 1 milhão de dígitos de PI, para leitura e testes, caso seja necessário ler localmente, claro, fazendo algumas adaptações no código, como por exemplo, importar os módulos de leitura de arquivos do Node. Lembrando que pode-se usar qualquer número de expansão decimal inferior a 1 milhão e que seja maior do que 9 ou superior a 1 milhão de dígitos, se preferir, atentando-se sempre para possíveis mudanças em nomes de arquivos, diretórios e extensões.

Abaixo está um pequeno guia de instalação para rodar o projeto.

### Instalação

Após fazer o download deste projeto, certifique-se de que tem o Node JS instalado em sua máquina rodando o seguinte comando

```bash
node --version
```

O comando deverá retornar a versão do Node JS instalada. Caso não retorne, baixe-a.

### Rodando o projeto

Depois de instalado o Node JS, será preciso baixar os módulos necessários, para isso, dentro do terminal, na pasta do projeto, execute

```bash
npm i
```

Em seguida, rode o seguinte comando para executar o projeto e encontrar o número necessário dentro da expansão decimal de PI

```bash
npm run palindrome
```

Pode-se mudar a quantidade de dígitos do palíndromo e o salto de busca diretamente no código, de maneira intuitiva.

Lembrando que; essa versão está lendo a expansão decimal de PI por meio de uma API, mas pode-se adaptar o código para leitura local importando módulos de leitura de arquivos do Node. Também está disponível um arquivo .txt com a expansão decimal contendo 1 milhão de dígitos.