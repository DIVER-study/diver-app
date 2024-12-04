![logo](/public/Logo.png)

# Diver App (nome a ser decidido)

- [Diver App (nome a ser decidido)](#diver-app-nome-a-ser-decidido)
	- [Sobre](#sobre)
	- [Mockups (WIP)](#mockups-wip)
	- [Nossa Equipe](#nossa-equipe)
	- [Tecnologias](#tecnologias)
	- [Como desenvolver](#como-desenvolver)
	- [Requisitos Funcionais e Não-Funcionais](#requisitos-funcionais-e-não-funcionais)

## Sobre

Nosso projeto tem a intenção de ajudar alunos que estão estudando os conceitos de Teoria Sociocultural e estejam com dificuldades na cadeira de Cognição e suas Tecnologias Digitais. A plataforma funcionará como uma atividade interativa e gamificada, trazendo um conteúdo mais fácil e rápido de digerir aos poucos.

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

-   Node.js
-   Next.js
-   Typescript
-   Supabase
-   Tailwindcss

## Como desenvolver

Tenha certeza de ter o [Node.js](https://nodejs.org/en/download) instalado em seu computador.

Clone esse repositório localmente:

```bash
git clone https://github.com/DIVER-study/diver-app.git
```

Configure o ambiente:

crie um arquivo com nome: `.env.local`<br/>
_recomendado que tenha ativada a opção "mostrar arquivos ocultos" do explorer_

Dentro do `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=<url-publico-do-projeto-no-supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<chave-anonima-do-supabase>
```
> Pegue as chaves secretas com um dos devs

Em seguida instale os pacotes do projeto:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

Isso é um projeto [Next.js](https://nextjs.org) criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Agora, inicialize o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

Você pode editar as páginas na pasta `app/`. As páginas atulizam automaticamente conforme você as edita.

## Requisitos Funcionais e Não-Funcionais

Acesse a tabela nesse link: [Tabela de Requisitos](https://royal-deal-c64.notion.site/Tabela-de-requisitos-151da11da8b18085b76bcd3c85f80c29)