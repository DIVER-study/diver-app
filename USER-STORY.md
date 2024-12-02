## Requisito Funcional 001 (Cód. RF 001): Criar e autenticar usuários

**COMO** usuário, **QUERO** criar uma conta e fazer login no sistema **PARA** poder acessar meus dados e funcionalidades personalizadas.

_Requisitos não funcionais:_

-   RNF 002: O sistemas deve ser protegido por autenticação usando senha. Interface: Formulário com email e senha.
-   Interação humano-computador: Botão de efetuar login.
-   Base de dados: Modelagem dos registros de usuários.
-   Validação: Validar formatos dos dados informados e se as credenciais coincidem com alguma das cadastradas no banco.

## Requisito Funcional 002 (Cód. RF 002): Adicionar e Exibir Ranking de Alunos

**COMO** aluno, **QUERO** visualizar o ranking dos melhores alunos **PARA** acompanhar minha posição e me motivar.

_Requisitos não funcionais:_

-   RNF 001: O sistema deve suportar mais de um usuário ao mesmo tempo.
-   Interface: Tela com o ranking dos alunos mostrando posições e pontuações.
-   Interação humano-computador: O aluno vê sua posição no ranking.
-   Base de dados: Registra pontuações dos alunos.
-   Validação: Atualiza o ranking dinamicamente.

## Requisito Funcional 003 (Cód. RF 003): Adicionar e Exibir Exercícios Interativos

**COMO** aluno, **QUERO** realizar exercícios interativos **PARA** aprimorar meu aprendizado de forma prática.

_Requisitos não funcionais:_

-   RNF 003: A aplicação deve ser funcional em dispositivos móveis.
-   Interface: Tela com exercícios e feedback.
-   Interação humano-computador: O aluno responde exercícios e recebe resultados.
-   Base de dados: Registra desempenho nos exercícios.
-   Validação: Avaliação automática das respostas e/ou avaliação dos professores.

## Requisito Funcional 004 (Cód. RF 004): Adicionar e Exibir Sistema de Conquistas

**COMO** aluno, **QUERO** desbloquear conquistas **PARA** aumentar meu engajamento.

_Requisitos não funcionais:_

-   RNF 005: O código deve ser organizado e comentado.
-   Interface: Tela com conquistas desbloqueadas.
-   Interação humano-computador: O aluno vê notificações ao desbloquear conquistas.
-   Base de dados: Registra conquistas por aluno.
-   Validação: Desbloqueio automático ao atingir critérios.

## Requisito Funcional 005 (Cód. RF 005): Adicionar e Exibir Sistema de Pontuação

**COMO** aluno, **QUERO** acumular pontos **PARA** acompanhar meu progresso.

_Requisitos não funcionais:_

-   RNF 001: O sistema deve suportar mais de um usuário ao mesmo tempo.
-   Interface: Exibição de pontuação em dashboard.
-   Interação humano-computador: O aluno visualiza pontos acumulados.
-   Base de dados: Registra pontos atribuídos por atividade.
-   Validação: Atualização dinâmica da pontuação.

## Requisito Funcional 006 (Cód. RF 006): Adicionar e Exibir Histórico de Atividades

**COMO** aluno, **QUERO** consultar meu histórico de atividades **PARA** revisar meu progresso.

_Requisitos não funcionais:_

-   RNF 006: O sistema deve garantir a privacidade dos dados do usuário.
-   Interface: Tela com atividades realizadas e datas.
-   Interação humano-computador: O aluno visualiza e filtra o histórico.
-   Base de dados: Armazena atividades realizadas.
-   Validação: Apenas o usuário pode acessar seu histórico.

## Requisito Funcional 007 (Cód. RF 007): Atribuição de Tarefas e Exercícios

**COMO** professor, **QUERO** atribuir tarefas aos alunos **PARA** engajá-los em atividades de aprendizado.

_Requisitos não funcionais:_

-   RNF 007: Existência de backup dos dados.
-   Interface: Tela para atribuição de tarefas.
-   Interação humano-computador: O professor cria tarefas com prazos.
-   Base de dados: Registra tarefas atribuídas.
-   Validação: Confirmação de atribuição e prazos.

## Requisito Funcional 008 (Cód. RF 008): Adicionar e Exibir Feedback dos Professores

**COMO** aluno, **QUERO** receber feedback dos professores **PARA** melhorar meu desempenho.

_Requisitos não funcionais:_

-   RNF 001: Suporte a múltiplos usuários simultaneamente.
-   Interface: Tela com feedbacks organizados por atividade.
-   Interação humano-computador: O aluno acessa feedback diretamente.
-   Base de dados: Armazena feedbacks associados às atividades.
-   Validação: Feedback visível apenas ao destinatário.

## Requisito Funcional 009 (Cód. RF 009): Adicionar e Exibir Notificações e Alertas

**COMO** aluno, **QUERO** receber notificações de eventos importantes **PARA** me manter atualizado.

_Requisitos não funcionais:_

-   RNF 003: Funcionalidade em dispositivos móveis.
-   Interface: Barra de notificações ou pop-ups.
-   Interação humano-computador: O aluno clica em notificações para detalhes.
-   Base de dados: Registra eventos notificados.
-   Validação: Notificações claras e acessíveis.

## Requisito Funcional 010 (Cód. RF 010): Adicionar e Exibir Dashboard de Administração

**COMO** professor, **QUERO** acessar um dashboard administrativo **PARA** gerenciar alunos e conteúdos.

_Requisitos não funcionais:_

-   RNF 005: Código organizado para fácil manutenção.
-   Interface: Tela com visão geral de dados administrativos.
-   Interação humano-computador: O professor navega entre opções de gerenciamento.
-   Base de dados: Armazena dados administrativos.
-   Validação: Funcionalidades disponíveis conforme permissões.

## Requisito Funcional 011 (Cód. RF 011): Adicionar Controle de Progresso do Aluno

**COMO** professor, **QUERO** visualizar o progresso de cada aluno **PARA** acompanhar seu desempenho.

_Requisitos não funcionais:_

-   RNF 001: Suporte a múltiplos usuários.
-   Interface: Tela com gráficos e relatórios de progresso.
-   Interação humano-computador: Navegação por relatórios individuais.
-   Base de dados: Armazena dados de progresso.
-   Validação: Dados precisos e atualizados.

## Requisito Funcional 012 (Cód. RF 012): Adicionar Gestão de Conteúdos de Ensino

**COMO** professor, **QUERO** organizar os conteúdos de ensino **PARA** facilitar o aprendizado.

_Requisitos não funcionais:_

-   RNF 005: Código comentado para manutenção.
-   Interface: Tela para upload e categorização de conteúdos.
-   Interação humano-computador: O professor gerencia conteúdos facilmente.
-   Base de dados: Armazena arquivos e metadados.
-   Validação: Verificação de formatos suportados.

## Requisito Funcional 013 (Cód. RF 013): Adicionar Suporte ao Aluno em Dispositivos Móveis

**COMO** aluno, **QUERO** acessar o sistema pelo meu celular **PARA** estudar em qualquer lugar.

_Requisitos não funcionais:_

-   RNF 003: A aplicação deve ser funcional em dispositivos móveis.
-   Interface: Layout responsivo que se adapta ao tamanho de tela do dispositivo.
-   Interação humano-computador: O aluno utiliza o sistema em qualquer dispositivo.
-   Base de dados: Sincronização com os mesmos dados do desktop.
-   Validação: Funcionalidade uniforme em diferentes dispositivos.

## Requisito Funcional 014 (Cód. RF 014): Adicionar e Exibir Tutorial Inicial

**COMO** aluno, **QUERO** acessar um tutorial inicial **PARA** aprender a usar o sistema.

_Requisitos não funcionais:_

-   RNF 005: Código organizado e comentado para manutenção.
-   Interface: Um tutorial interativo exibido no primeiro acesso.
-   Interação humano-computador: O aluno segue passos guiados no tutorial.
-   Base de dados: Marca usuários que já concluíram o tutorial.
-   Validação: Tutorial é exibido apenas no primeiro acesso ou quando solicitado.

## Requisito Funcional 015 (Cód. RF 015): Adicionar e Exibir Relatórios e Análises

**COMO** professor, **QUERO** gerar relatórios e análises de desempenho **PARA** avaliar os resultados dos alunos.

_Requisitos não funcionais:_

-   RNF 005: Código comentado e organizado.
-   Interface: Relatórios exportáveis em formatos como PDF.
-   Interação humano-computador: O professor gera relatórios com filtros e parâmetros.
-   Base de dados: Agrega informações do progresso e desempenho.
-   Validação: Dados exibidos com precisão e clareza.

## Requisito Funcional 016 (Cód. RF 016): Adicionar Suporte do Conteúdo

**COMO** aluno, **QUERO** acessar suporte ao conteúdo **PARA** esclarecer dúvidas durante os estudos.

_Requisitos não funcionais:_

-   RNF 006: Dados protegidos contra acessos não autorizados.
-   Interface: Uma seção de suporte com FAQs ou envio de dúvidas.
-   Interação humano-computador: O aluno acessa conteúdos de ajuda ou envia questões.
-   Base de dados: Armazena dúvidas enviadas pelos alunos.
-   Validação: Apenas dúvidas pertinentes são respondidas.

## Requisito Funcional 017 (Cód. RF 017): Adicionar e Exibir Correções das Tarefas dos Alunos

**COMO** aluno, **QUERO** visualizar as correções das minhas tarefas **PARA** entender os erros e melhorar meu desempenho.

_Requisitos não funcionais:_

-   RNF 001: Suporte a múltiplos usuários simultaneamente.
-   Interface: Correções detalhadas e personalizadas.
-   Interação humano-computador: O aluno visualiza feedback diretamente na tarefa.
-   Base de dados: Registra as correções feitas pelos professores.
-   Validação: Correções atribuídas corretamente ao aluno correspondente.

## Requisito Funcional 018 (Cód. RF 018): Adicionar Biblioteca de Recursos/Materiais/Vídeos

**COMO** aluno, **QUERO** acessar uma biblioteca de materiais e vídeos PARA complementar meu aprendizado.

_Requisitos não funcionais:_

-   RNF 007: Existência de backup dos dados.
-   Interface: Tela com filtros para materiais por tipo e assunto.
-   Interação humano-computador: O aluno baixa ou visualiza os materiais diretamente.
-   Base de dados: Armazena links e arquivos de recursos.
-   Validação: Disponibilidade de arquivos conforme o formato suportado.

## Requisito Funcional 019 (Cód. RF 019): Adicionar Modularização do Conteúdo

**COMO** professor, **QUERO** organizar os conteúdos em módulos PARA facilitar o aprendizado dos alunos.

_Requisitos não funcionais:_

-   RNF 005: Código comentado e organizado.
-   Interface: Tela para criar e editar módulos com conteúdos agrupados.
-   Interação humano-computador: O professor estrutura os módulos conforme a necessidade.
-   Base de dados: Armazena informações de módulos e conteúdos.
-   Validação: Módulos organizados e acessíveis apenas para os alunos correspondentes.

## Requisito Funcional 020 (Cód. RF 020): Gerenciar os Perfis dos Usuários

**COMO** administrador, **QUERO** gerenciar os perfis dos usuários PARA manter os dados organizados e atualizados.

_Requisitos não funcionais:_

-   RNF 002: Proteção por autenticação usando senha.
-   RNF 006: Dados de usuários protegidos contra acessos não autorizados.
-   Interface: Tela para edição e exclusão de perfis.
-   Interação humano-computador: O administrador edita dados diretamente no sistema.
-   Base de dados: Armazena informações de usuários.
-   Validação: Apenas administradores têm permissão para gerenciar perfis.
