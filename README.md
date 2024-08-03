# Quanto Vai Cair - Testes Automatizados com Cypress

Este projeto contém testes automatizados para a aplicação "Quanto Vai Cair", que calcula os descontos trabalhistas previstos em folha com base no valor do salário bruto. O objetivo é garantir o correto funcionamento dos cálculos e a usabilidade da aplicação.

## Índice

1. [Sobre](#sobre)
2. [Funcionalidades dos Testes](#funcionalidades-dos-testes)
3. [Instalação](#instalacao)
4. [Execução dos Testes](#execucao-dos-testes)
5. [Localização dos Testes](#localizacao-dos-testes)
6. [Contribuição](#contribuicao)
7. [Licença](#licenca)

## Sobre

A aplicação "Quanto Vai Cair" realiza cálculos dos descontos trabalhistas baseados no salário bruto fornecido. A aplicação visa fornecer uma estimativa precisa do valor líquido a ser recebido após descontos como INSS, IRRF, e outros encargos.

## Funcionalidades dos Testes

- **Comportamento da Aplicação**: Verifica se a aplicação realiza os cálculos corretamente conforme o valor do salário bruto inserido.
- **Validações**: Testa a validação de entradas e mensagens de erro para dados inválidos.
- **Usabilidade**: Avalia a experiência do usuário, garantindo que a interface seja intuitiva e fácil de usar.
- **Resultados**: Confirma se os resultados apresentados pela aplicação estão corretos e de acordo com as regras trabalhistas.

## Instalação

### 1. Instalar o Node.js e npm

Para rodar os testes, você precisa do Node.js e do npm (Node Package Manager). Siga as instruções abaixo para instalar:

- **Windows/Mac/Linux:**
  - Visite a [página de downloads do Node.js](https://nodejs.org/).
  - Baixe e instale a versão recomendada (ou a versão LTS) que inclui o npm.
  - 
```bash
 npm init --yes
```


### 2. Instalar o Cypress

Com o Node.js e o npm instalados, siga as etapas abaixo para configurar o projeto e instalar o Cypress na versão 9.5.1:

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/repositorio.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd repositorio
   ```
3. Instale as dependências do projeto, incluindo o Cypress na versão 9.5.1:

   ```bash
   npm install
   ```

   Caso o Cypress não esteja listado nas dependências, adicione-o manualmente com:

   ```bash
   npm install cypress@9.5.1 --save-dev
   ```

## Execução dos Testes

Para executar os testes automatizados com Cypress, use o seguinte comando:

```bash
npx cypress open
```
