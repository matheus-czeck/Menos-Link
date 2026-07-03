<div align="center">

<h1>🔗 MenosLink</h1>

<p>Aplicação web Full-stack — encurte seus links, personalize, adicione senhas e gere QR Codes em um só lugar.</p>

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat-square&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17+-4169E1?style=flat-square&logo=postgresql&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O **MenosLink** nasceu da necessidade de ir além dos encurtadores de URL convencionais. Mais do que apenas reduzir o tamanho de um link, o objetivo é entregar uma ferramenta onde o usuário tenha total controle e segurança sobre o redirecionamento de suas informações.

Este projeto resolve isso centralizando a geração de links personalizáveis, protegidos por criptografia e acessíveis visualmente através de QR Codes.

> Projeto desenvolvido como o meu primeiro projeto prático full-stack com deploy ponta a ponta, focado em consolidar o aprendizado em uma arquitetura moderna e escalável.

---

## ✨ Funcionalidades

- [x] Interface inicial com opções básicas de configuração
- [x] Geração de links curtos aleatórios e seguros (via `nanoId`)
- [x] Customização de links com termos personalizados
- [x] Proteção de URLs por senha para acesso restrito
- [x] Geração dinâmica de QR Code para compartilhamento rápido
- [x] Expiração de links (24h, 7 dias, 30 dias ou nunca)
- [x] Rastreamento de cliques (estado e dispositivo)


---

## 🛠️ Tecnologias

**Back-end**

- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript
- [TypeScript](https://www.typescriptlang.org/) — superset com tipagem estática
- [Express](https://expressjs.com/) — framework web para construção da API
- [Prisma ORM](https://www.prisma.io/) — mapeamento objeto-relacional (ORM)
- [nanoId](https://github.com/ai/nanoid) — gerador de IDs únicos e compactos para as URLs

**Front-end**

- [Angular 17](https://angular.io/) — framework SPA para a interface
- [PrimeNG](https://primeng.org/) — biblioteca de componentes de UI de alta performance
- [PrimeIcons](https://primeng.org/icons) — conjunto oficial de ícones do ecossistema Prime

**Banco de Dados & Infraestrutura**

- [Neon PostgreSQL](https://neon.tech/) — banco de dados relacional Serverless na nuvem
- [Git](https://git-scm.com/) / [GitHub](https://github.com/) — controle de versão e hospedagem do código

---

## 🏗️ Arquitetura
```
MenosLink/
├── Back-end/
│   ├── src/
│   │   ├── __test__        # Testes unitarios
│   │   ├── controllers/    # Controladores que gerenciam as requisições das URLs
│   │   ├── models/         # Validação e regras de negocios
│   │   ├── repositories/   # Camada de comunicação com o Neon Postgres via Prisma
│   │   ├── routes/         # Definição dos endpoints da API 
│   │   ├── services/       # Direcionamento de responsabilidades 
│   │   ├── index.ts        # Inicialização e configuração do Express
│   │   └── server.ts       # Conexão com o banco de dados e inicialização do servidor
│   │
│   ├── prisma/
│   │   ├── migrations/     # Versionamento estrutural do banco de dados
│   │   └── schema.prisma   # Definição das tabelas de URLs e logs
│   │
│   └── package.json
│
└── Front-end
│   ├── src/
│   └── app/
│       ├── pages/          # Componentes visuais 
│       ├── services/       # Consumo dos endpoints do Back-end
│       ├── models/         # Interfaces e tipagens das URLs
│       └── environments/   # Configurações de rotas locais e de produção (Deploy)
│
└── package.json
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 22+
- Conta no Neon.tech (ou instância local do PostgreSQL)
- npm

### Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/matheus-czeck/MenosLink.git
cd MenosLink
Back-end
````
```Bash
cd Back-end

```
```# Instale as dependências
npm install

```
```# Configure as variáveis de ambiente
cp .env.example .env

# Edite o arquivo .env adicionando a sua URL de conexão do Neon PostgreSQL:
# DATABASE_URL="postgresql://usuario:senha@ep-nome-da-instancia.neon.tech/menoslink?sslmode=require"
# BASE_URL=http://localhost:3000

```
```# Execute as migrations para estruturar o banco
npx prisma migrate dev

```
```# Inicie o servidor de desenvolvimento
npm run dev
Front-end
```
```Bash
cd ../Front-end/menos-link

```
```# Instale as dependências
npm install

```

```# Inicie a aplicação Angular
npm start
```
Abra seu navegador em http://localhost:4200.

----
```🗄️ Modelo de dados
Snippet de código
model Link{
id            String    @id @default(cuid())
codigo        String    @unique 
url_original  String 
total_cliques Int       @default(0)
senha         String? 
qrcode_path   String?   
criado_em     DateTime  @default(now())
expira_em     DateTime? 

cliques       Clique[]
}

model Clique {
id            String    @id @default(cuid())
linkId        String  
clicadoEm     DateTime  @default(now())
ip            String?
pais          String?
dispositivo   String?

link          Link      @relation(fields: [linkId], references: [id])
}

---
```
👨‍💻 Autor
Matheus Henrique Czeck
Estudante de Engenharia de Software · Dev Web Full Stack em formação

[![LinkedIn](https://img.shields.io/badge/LinkedIn-matheus--hcz-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-hcz/)
[![GitHub](https://img.shields.io/badge/GitHub-matheus--czeck-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/matheus-czeck)
