# lusofly-web

LusoFly não é apenas um website institucional. É um ecossistema completo composto por uma **plataforma de gestão avançada (Backoffice)** e uma **página web imersiva (Frontend)**, onde *todo* o conteúdo virado para o público é controlado e modificado em tempo real pelos administradores, sem necessidade de tocar numa única linha de código.

## 🏗️ Arquitetura do Sistema

Este projeto foi desenhado com uma separação total entre a apresentação e os dados.

*   **A Plataforma de Gestão (`/backend`):** Construída em **Django & DRF**. Funciona como o cérebro da operação. Através de um painel de administração customizado, a escola de aviação gere os seus cursos, estrutura as etapas de formação, aprova testemunhos de alunos, define as saídas profissionais, configura templates de email dinâmicos, entre outras coisas.
*   **O Website ao Vivo (`/frontend`):** Desenvolvido em **Next.js (React)** com foco extremo na performance (Server Components) e no design premium (Tailwind CSS + Framer Motion). O frontend atua como uma montra inteligente que consome a API do Django, adaptando o seu layout instantaneamente a qualquer modificação feita na gestão.

## ✨ Funcionalidades Principais

*   **100% Data-Driven (Zero Hardcoding):** Todo o conteúdo do portal (Cursos como ATPL e SEP, saídas profissionais, etapas de formação e estatísticas) viaja da base de dados para a interface de forma orgânica.
*   **Timelines Interativas:** O percurso do aluno é renderizado dinamicamente com efeito cascata e detecção de *scroll* de forma fluída.
*   **Sistema de *Social Proof*:** Testemunhos de ex-alunos geridos via Django Admin, com a capacidade de ativar ou desativar cartões no frontend em tempo real.
*   **Motor de Candidaturas e Notificações:** Sistema de conversão "Become a Pilot" interligado com o backend, apresentando templates de email configuráveis com *tags* dinâmicas (`{nome}`, `{curso}`) para notificação automática de múltiplos recrutadores.

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
*   Node.js (v18+)
*   Python (3.10+)

### 1. Iniciar o Backend (Django)
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python manage.py migrate
python manage.py runserver
```
### 2. Iniciar o Frontend (Next.js)
```powershell
cd frontend
npm install
npm run dev
```

## 👨‍💻 Autor

**Rafael Antunes**  
Finalista de Engenharia Informática - Redes e Administração de Sistemas






