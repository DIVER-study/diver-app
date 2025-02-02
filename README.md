# Cog Tec

![logo da cog tec com uma cabeça com formato de ponto de interrogação e a palavra cog tec](/.github/assets/logo.png)

<!--toc:start-->

- [Cog Tec](#cog-tec)
  - [Sobre](#sobre)
  - [Mockups (WIP)](#mockups-wip)
  - [Nossa Equipe](#nossa-equipe)
  - [Tecnologias](#tecnologias)
  - [Como desenvolver](#como-desenvolver)
    - [Repositório](#repositório)
      - [Clonar uma branch específica](#clonar-uma-branch-específica)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
      - [Como utilizar suas próprias chaves secretas](#como-utilizar-suas-próprias-chaves-secretas)
      - [Atualizando templates de email](#atualizando-templates-de-email)
      - [Configurando tabelas](#configurando-tabelas)
    - [Instalando pacotes](#instalando-pacotes)
      - [Intalando Yarn](#intalando-yarn)
    - [Desenvolvendo](#desenvolvendo)
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

### Repositório

Clone esse repositório localmente:

```bash
git clone https://github.com/DIVER-study/diver-app.git
```

> OBS: A branch mais atualizada do repositório é a [dev](https://github.com/DIVER-study/diver-app/tree/dev).
> Porém a [main](https://github.com/DIVER-study/diver-app/tree/main) terá sempre a versão mais estável do projeto.
> O desenvolvimento dos requerimentos são feitos em branchs separadas

<details>
<summary>Clonando uma braanch específica</summary>

#### Clonar uma branch específica

Você pode clonar uma branch específica com esse comando:

```bash
# git clone https://github.com/DIVER-study/diver-app.git -b <nome-da-branch>
git clone https://github.com/DIVER-study/diver-app.git -b dev
```

</details>

### Variáveis de ambiente

Na pasta do projeto, crie um arquivo com nome: `.env.local`

> Recomendado que tenha ativada as opções 'mostrar arquivos ocultos' e
> 'mostar extensões de arquivos' do explorer

Dentro do `.env.local` coloque:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=<url-publico-do-projeto-no-supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<chave-anonima-do-supabase>
```

> Pegue as chaves secretas com um dos devs e coloque elas nos lugares adequados.

<details>
<summary>Criando seu próprio projeto no Supabase</summary>

#### Como utilizar suas próprias chaves secretas

Como o projeto ainda está em inicio de desenvolvimento ainda
é possível utilizar um projeto qualquer do Supabase

No site do [Supabase](https://supabase.com), faça ou entre em uma conta e crie um novo projeto.
Preencha todos os detalhes que o supabase pedir.

Com um novo projeto criado, na barra de naavegação clique em connect:
![barra de navegação do supabase com o nome de um projeto e um botão destacado nomeado 'connect'](/.github/assets/supanav.png)

Um novo popup aparecerar com novas opções.
Procure por App Frameworks, selecione as opções de NextJS e SupabaseJS
e suas chaves secretas estrão disponíveis.
![janela do supabase mostrando as chaves secretas de um projeto borradas](/.github/assets/supapopup.png)

#### Atualizando templates de email

Supabase utiliza templates de email para enviar links
para os usuários confirmarem seu email ou redefinir sua senha.

Para que possa fazer isso no seu próprio projeto do Supabase,
utilize os templetas encontrados para

- Confirmação de email [confirmation.html](/supabase/templates/confirmation.html)
- Redefinição de senha [recovery.html](/supabase/templates/recovery.html)

Copie o html desses arquivos e cole eles nos templates adequados

você pode encontrar os templates aqui:

![a imagem mostra a interface do supabase com a seção email templates selecionada](/.github/assets/email-templates.png)

#### Configurando tabelas

Nossas tabelas, funções, triggers, políticas e buckets podem ser criadas com o seguinte SQL:

veja o arquivo: [init_project.sql](./init_project.sql)
você pode copiar o código do arquivo no editor de sql do Supabase

</details>

### Instalando pacotes

Em seguida instale os pacotes do projeto:

```bash
yarn install
```

<details>
<summary>Como instalar o Yarn</summary>

#### Intalando Yarn

Instale o yarn com o npm ou com sua distribuição linux

```bash
npm i -g yarn
```

Ative o corepack como admin

```bash
sudo corepack enable
# no windows, abra o prompt de comando como admin
# corepack enable
```

E dentro da pasta de projeto atualize o yarn
e instale os pacotes

```bash
yarn set version berry
yarn install
```

</details>

### Desenvolvendo

Nosso projeto utiliza [Next.js](https://nextjs.org) e foi inicializado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Agora, inicialize o servidor de desenvolvimento:

```bash
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e veja o resultado.

Você pode editar as páginas na pasta `app/`. As páginas atulizam conforme as edita.

## Requisitos Funcionais e Não-Funcionais

Acesse a tabela nesse link: [Tabela de Requisitos](https://docs.google.com/spreadsheets/d/1WzkAcBs6IBwXHklCpwbMeGyta-0hUh-rsLZbWoxZaFc/edit?usp=sharing)
