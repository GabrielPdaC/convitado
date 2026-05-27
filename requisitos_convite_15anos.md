# Documento de Requisitos — Convite Digital 15 Anos

## Projeto

Sistema de convite digital para festa de 15 anos com temática Jardim Encantado.

Tecnologias principais:
- Next.js
- TypeScript
- Tailwind CSS
- Hospedagem na Vercel

---

# Informações do Evento

- Aniversariante: Vanessa
- Tema: Jardim Encantado
- Data: 06/09/2026
- Horário: 20h
- Local: Salão Festa Lumaki
- Endereço: Vicentina Maria Fidélis, 387 - Vicentina
- Link do mapa:
  https://maps.app.goo.gl/xgmK8u5MJ6WbeM7R7

---

# Objetivo do Projeto

Criar um site de convite digital elegante, delicado e responsivo para dispositivos móveis e desktop, contendo confirmação de presença, lista de presentes e painel administrativo simples.

---

# Requisitos Funcionais

## RF001 — Página inicial do convite

O sistema deve possuir uma página inicial exibindo um convite digital fechado centralizado na tela.

---

## RF002 — Abrir convite

Ao clicar no convite fechado, o sistema deve executar uma animação simples de abertura exibindo o conteúdo interno do convite.

---

## RF003 — Exibição das informações do evento

O convite aberto deve exibir:

- Nome da aniversariante
- Tema da festa
- Data
- Horário
- Local
- Endereço
- Botão de confirmação
- Botão da lista de presentes
- Botão para abrir localização

---

## RF004 — Abrir localização no mapa

Ao clicar no botão de localização, o sistema deve abrir o Google Maps utilizando o link informado.

---

## RF005 — Confirmação de presença

O sistema deve permitir que o convidado confirme presença informando:

- Nome
- Quantidade de acompanhantes
- Mensagem opcional

---

## RF006 — Armazenamento das confirmações

O sistema deve salvar as confirmações de presença no banco de dados.

---

## RF007 — Página de lista de presentes

O sistema deve possuir uma página com lista de presentes disponíveis.

---

## RF008 — Reservar presente

O usuário deve conseguir selecionar um presente e informar seu nome para reservar o item.

---

## RF009 — Bloqueio de presente reservado

Após reservado, o presente deve aparecer como indisponível para outros convidados.

---

## RF010 — Página administrativa

O sistema deve possuir uma página administrativa acessível inicialmente sem login.

---

## RF011 — Visualização de confirmações

A página administrativa deve exibir:

- Nome do convidado
- Quantidade de acompanhantes
- Mensagem
- Data da confirmação

---

## RF012 — Visualização de presentes reservados

A página administrativa deve exibir:

- Nome do presente
- Pessoa que reservou
- Data da reserva

---

## RF013 — Responsividade

O sistema deve funcionar corretamente em:

- Celular
- Tablet
- Desktop

---

# Requisitos Não Funcionais

## RNF001 — Visual delicado

O sistema deve possuir aparência elegante, delicada e minimalista inspirada no tema Jardim Encantado.

---

## RNF002 — Paleta de cores

O sistema deve utilizar predominantemente:

- Rosa claro
- Bege
- Creme
- Dourado suave

---

## RNF003 — Animações leves

As animações devem ser suaves e discretas para evitar poluição visual.

---

## RNF004 — Borboletas decorativas

O sistema deve possuir pequenas borboletas decorativas com movimento lento e simples.

Exemplos:
- Leve flutuação
- Pequena rotação
- Movimento quase estático

---

## RNF005 — Pétalas animadas

O sistema deve possuir pétalas caindo lentamente em baixa quantidade.

---

## RNF006 — Efeito de partículas mágicas

O sistema deve possuir pequenas partículas brilhantes discretas no fundo da tela.

---

## RNF007 — Performance

As animações não devem prejudicar a performance em dispositivos móveis.

---

## RNF008 — Tempo de carregamento

A página inicial deve carregar rapidamente mesmo em conexões móveis.

---

## RNF009 — Compatibilidade

O sistema deve funcionar corretamente nos navegadores modernos:

- Chrome
- Edge
- Safari
- Firefox

---

## RNF010 — Hospedagem

O sistema deve ser compatível com deploy na Vercel.

---

## RNF011 — Estrutura tecnológica

O sistema deve utilizar:

- Next.js
- TypeScript
- Tailwind CSS

---

## RNF012 — Banco de dados

O sistema deve utilizar banco simples compatível com aplicações serverless.

Sugestão inicial:
- Supabase

---

## RNF013 — Acessibilidade básica

Os botões e textos devem possuir contraste adequado e tamanho legível em dispositivos móveis.

---

# Escopo da Primeira Versão (MVP)

## Funcionalidades incluídas

- Convite animado simples
- Confirmação de presença
- Lista de presentes
- Página administrativa simples
- Layout responsivo
- Animações leves e delicadas

---

## Funcionalidades fora do escopo inicial

- Login/autenticação
- Envio de e-mail
- Integração com WhatsApp
- Música de fundo
- Animações complexas 3D
- Upload de fotos
- Múltiplos eventos
- Edição dinâmica do convite

---

# Direção Visual

## Estilo

- Minimalista
- Elegante
- Romântico
- Delicado

---

## Sensação visual

Mistura de:
- Jardim encantado
- Conto de fadas moderno
- Floral clean
- Luxo suave

---

# Recomendações Técnicas

## Front-end

Framework:
- Next.js App Router

Estilização:
- Tailwind CSS

Animações:
- Framer Motion
- CSS Animations

---

## Banco de dados

Sugestão:
- Supabase

Tabelas iniciais:
- confirmations
- gifts

---

## Hospedagem

Plataforma:
- Vercel

---

# Estrutura Inicial Recomendada

```txt
/app
  /(public)
    /
    /confirmar
    /presentes

  /admin

/components
  InvitationCard
  Butterfly
  FloatingParticles
  GiftCard

/lib
  supabase.ts

/styles
```

---

# Considerações Finais

A primeira versão deve priorizar:

- Simplicidade
- Elegância
- Boa experiência mobile
- Performance
- Facilidade de manutenção
- Facilidade de evolução futura

As animações devem ser leves e discretas para manter o visual sofisticado e delicado.
