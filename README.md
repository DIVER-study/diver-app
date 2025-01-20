# Cog Tec

![logo da cog tec com uma cabeça com formato de ponto de interrogação e a palavra cog tec](/.github/assets/cog-tec-logo.jpg)

<!--toc:start-->

- [Cog Tec](#cog-tec)
  - [Sobre](#sobre)
  - [Mockups (WIP)](#mockups-wip)
  - [Nossa Equipe](#nossa-equipe)
  - [Tecnologias](#tecnologias)
  - [Como desenvolver](#como-desenvolver)
    - [Repositório](#repositório)
    - [Variáveis de ambiente](#variáveis-de-ambiente)
      - [Atualizando templates de email](#atualizando-templates-de-email)
      - [Configurando tabelas](#configurando-tabelas)
    - [Instalando pacotes](#instalando-pacotes)
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
> O desenvolvimento dos requerimentos são feitos em branchs separadas

<details>
<summary><h4>Clonar uma branch específica</h4></summary>

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
<summary><h4>Como utilizar suas próprias chaves secretas</h4></summary>

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

```sql
-- Create a table for public profiles
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone not null default now(),
  display_name text not null unique default '',
  avatar_url text not null default '',
  email text not null,

  constraint display_name_length check (char_length(display_name) >= 3)
);

-- Set up Row Level Security (RLS)
alter table if exists profiles
  enable row level security;

drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

drop policy if exists "Users can insert their own profile." on public.profiles;
create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile." on public.profiles;
create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url, email)
  values (new.id, new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'avatar_url', new.email)
  on conflict (id) do update
  set (display_name, avatar_url, email) = (new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'avatar_url', new.email);
  return new;
end;
$$ language plpgsql security definer;
create or replace trigger on_auth_user_created
  after insert or update on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('profile-pictures', 'profile-pictures')
  on conflict (id) do nothing;

-- Set up access controls for storage.
drop policy if exists "Avatar images are publicly accessible." on storage.objects;
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'profile-pictures');

drop policy if exists "Anyone can upload an avatar." on storage.objects;
create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'profile-pictures');

drop policy if exists "Authenticated users can remove their avatar" on storage.objects;
create policy "Authenticated users can remove their avatar" on storage.objects
  for remove with check (bucket_id = 'profile-pictures' and (select auth.role()) = 'authenticated');
```

</details>

### Instalando pacotes

Em seguida instale os pacotes do projeto:

```bash
yarn install
```

<details>
<summary><h4>Como instalar o Yarn</h4></summary>

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

Acesse a tabela nesse link: [Tabela de Requisitos](https://royal-deal-c64.notion.site/Tabela-de-requisitos-151da11da8b18085b76bcd3c85f80c29)
