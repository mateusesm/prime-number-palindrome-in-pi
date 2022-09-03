## Algoritmo que lê expansão decimal do número PI (3,1415...) e traz o primeiro número palíndromo primo de 9 dígitos

O algoritmo foi criado em JavaScript utilizando Node JS e um módulo chamado Line Reader para ler arquivos de texto. Neste projeto, disponibilizamos um arquivo de texto contendo a expansão decimal de 1 milhão de dígitos do número PI para leitura e testes, lembrando que pode-se usar qualquer número de expansão decimal inferior a 1 milhão e que seja maior do que 9 ou superior a 1 milhão de dígitos, se preferir, atentando-se sempre para possíveis mudanças em nomes de arquivos, diretórios e extensões para que o método eachLine() do Line Reader consiga ler o arquivo com sucesso.

Abaixo está um pequeno guia de instalação para rodar o projeto.

### Instalação

Após fazer o download deste projeto, certifique-se de que tem o Node JS instalado em sua máquina rodando o seguinte comando

```bash
node --version
```

O comando deverá retornar a versão do Node JS instalada. Caso não retorne, baixe-a.

Em seguida, use o gerenciador de pacotes de sua preferência (npm, yarn, etc.) para instalar todas as dependências

No meu caso, usei o npm

```bash
npm install
```

### Rodando o projeto

Em seguida, rode o seguinte comando

```bash
npm run dev
```