# Instruções de Instalação e Execução

Este guia explica como configurar o ambiente e rodar o projeto localmente no seu computador.

---

## 1. Criar a Pasta e Baixar o Projeto

Abra o seu terminal e execute os comandos abaixo para criar a pasta chamada `site`, entrar nela e baixar o projeto do repositório:

```bash
# Cria uma pasta chamada site
mkdir site

# Entra na pasta criada
cd site

# Baixa o projeto (clona o repositório)
git clone [https://github.com/jeniferarispe/SoMaisUm.git](https://github.com/jeniferarispe/SoMaisUm.git)

# Entra na pasta raiz do projeto clonado
cd SoMaisUm

# Entra na pasta do frontend
cd frontend

# Instala todas as dependências necessárias do NPM
npm install

# Inicia o frontend
npm start

# Entra na pasta do backend
cd backend

# Instala as dependências do servidor backend
npm install

# Inicia o servidor backend
npm start
