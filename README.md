# Diver App (nome a ser decidido)

![logo](/public/Logo.png)

<!--toc:start-->

- [Diver App (nome a ser decidido)](#diver-app-nome-a-ser-decidido)
  - [Sobre](#sobre)
  - [Mockups (WIP)](#mockups-wip)
  - [Nossa Equipe](#nossa-equipe)
  - [Tecnologias](#tecnologias)
  - [Como desenvolver](#como-desenvolver)
  - [Requisitos Funcionais e Não-Funcionais](#requisitos-funcionais-e-não-funcionais)
  <!--toc:end-->

## Sobre

Nosso projeto tem a intenção de ajudar alunos que estão estudando os conceitos de
Teoria Sociocultural e estejam com dificuldades na cadeira de Cognição e suas
Tecnologias Digitais. A plataforma funcionará como uma atividade interativa e
gamificada, trazendo um conteúdo mais fácil e rápido de digerir aos poucos.

## Mockups (WIP)

## Nossa Equipe

| nome              | função           |
| :---------------- | :--------------- |
| Shyanne           | Líder de Projeto |
| Pedro Henrique    | UI Designer      |
| Yves Klavdian     | UI Designer      |
| Kodie Freitas     | Frontend Dev     |
| Antonio Guilherme | Frontend Dev     |
| Maria Eduarda     | Fullstack Dev    |
| Paulo Magalhães   | Backend Dev      |

## Tecnologias

- Node.js
- Next.js
- Typescript
- Supabase
- Tailwindcss

## Como desenvolver

Tenha certeza de ter o [Node.js](https://nodejs.org/en/download) instalado.

Clone esse repositório localmente:

```bash
git clone https://github.com/DIVER-study/diver-app.git
```

> OBS: A branch mais atualizada do repositório é a [main](https://github.com/DIVER-study/diver-app/tree/main).
> O desenvolvimento dos requerimentos são feitos em branchs separadas

Você pode clonar uma branch específica com esse comando:

```bash
# git clone https://github.com/DIVER-study/diver-app.git -b <nome-da-branch>
git clone https://github.com/DIVER-study/diver-app.git -b main
```

Configure o ambiente:

crie um arquivo com nome: `.env.local`

> Recomendado que tenha ativada as opções 'mostrar arquivos ocultos' e
> 'mostar extensõe de arquivos' do explorer

Dentro do `.env.local`:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=url-publico-do-projeto-no-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=chave-anonima-do-supabase
```

> Pegue as chaves secretas com um dos devs.
> Como o projeto ainda está em desenvolvimento,
> voce pode criar uma conta com um novo projeto no [Supabase](https://supabase.com/)
> e utilizar as chaves do projeto criado

Em seguida instale os pacotes do projeto:

```bash
npm install
# ou
yarn install
```

> Apesar de npm estar no exemplo,
> Nosso projeto utiliza o [yarn](https://yarnpkg.com/getting-started/install),
> e recomendamos que faça o mesmo.

<details>
  <summary>Como instalar o Yarn</summary>

  ```bash
  npm i -g yarn
  # ou se você estiver em uma distribuição linux,
  # utilize os pacotes da sua distribuição

  sudo corepack enable
  # no windows, abra o prompt de comando como admin

  # dentro da pasta do projeto
  yarn set version berry
  yarn install

  # e aguarde
  ```

</details>

Nosso projeto utiliza [Next.js](https://nextjs.org) e foi inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Agora, inicialize o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

> Apesar de npm estar no exemplo,
> Nosso projeto utiliza o [yarn](https://yarnpkg.com/getting-started/install),
> e recomendamos que faça o mesmo.

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

Você pode editar as páginas na pasta `app/`. As páginas atulizam conforme as edita.

## Requisitos Funcionais e Não-Funcionais

Acesse a tabela nesse link: [Tabela de Requisitos](https://royal-deal-c64.notion.site/Tabela-de-requisitos-151da11da8b18085b76bcd3c85f80c29)
