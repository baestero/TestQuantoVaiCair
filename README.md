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
  - Inicie o npm:
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

## Localização dos Testes

Os testes automatizados estão localizados no diretório `cypress/integration`. Aqui você encontrará arquivos de teste que cobrem as funcionalidades descritas.

## Contribuição

Se você deseja contribuir para o projeto "Quanto Vai Cair - Testes Automatizados com Cypress", siga estas etapas:

1. **Fork o Repositório**: Faça um fork do repositório para sua própria conta do GitHub.
2. **Clone o Repositório**: Clone o repositório forkado para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/repositorio.git
   ```
3. **Crie uma Branch**: Crie uma nova branch para sua contribuição:
   ```bash
   git checkout -b minha-contribuicao
   ```
4. **Faça suas Alterações**: Faça as alterações desejadas e adicione os testes conforme necessário.
5. **Commit e Push**: Faça commit das suas alterações e envie para o repositório forkado:
   ```bash
   git add .
   git commit -m "Descrição das minhas alterações"
   git push origin minha-contribuicao
   ```
6. **Abra um Pull Request**: Vá até o repositório original e abra um pull request para que suas alterações possam ser revisadas e, se aprovadas, integradas ao projeto.

Agradecemos suas contribuições e estamos felizes em receber feedback e melhorias para garantir que a aplicação esteja sempre em ótimo estado!

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

A Licença MIT é uma licença permissiva que é amplamente utilizada e reconhecida. Ela permite que você use, copie, modifique, mescle, publique, distribua, sublicencie e/ou venda cópias do Software, desde que a permissão e o aviso de copyright sejam incluídos em todas as cópias ou partes substanciais do Software.
