# Tutorial Yarn

Vamos lá

Nosso projeto preferencialmente utiliza o `yarn`.
Ele oferece uma detecção de dependencia melhor e
mais veloz do que o `npm`.

## Como instalar o yarn

Primeiro é válido verificar se o yarn já está no seu dispositivo

```bash
yarn -v
```

Se não houver erros após esse comando pule para => [Utilizando o yarn para desenvolver](#utilizando-o-yarn-para-desenvolver)

## instalação pelo npm

Caso o yarn não esteja no seu dispositivo,
utilizaremos o npm para instalar ele globalmente.

```bash
npm i -g yarn

# em alguns dispositivos pode ser necessário acesso a administrador
# abric o cmd como admin no windows ou utilizar sudo no linux
```

Após instalar o yarn precisamos abilitar o `corepack`,
que vem junto com o node.

```bash
corepack enable

# será necessário acesso a administrador
# abric o cmd como admin no windows ou utilizar sudo no linux
```

Agora sim podemos utilizar o yarn!

## Utilizando o yarn para desenvolver

Com o yarn instalado globalmente, é preciso
utlizar a versão específica utilizada no projeto.

```bash
# dentro do projeto
yarn set version berry
yarn install
```

Agora pode aproveitar o yarn :3

```bash
yarn dev
```
