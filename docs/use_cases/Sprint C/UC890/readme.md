# UC 890

## Requisitos

**UC890** - Como administrador da organização quero que seja implementada uma gestão de acessos que satisfaça os critérios apropriados de segurança.

## Esclarecimentos do cliente

**Questão:** Relativamente à US890 é pedido para "...implementar uma gestão de acessos que satisfaça os critérios apropriados de segurança", queria pedir informação sobre quais os critérios apropriados a ter em conta.

**Resposta:** Há tipos diferentes de utilizadores, pertencentes a grupos distintos. Cada grupo terá inerentemente um critério de segurança (tríade CIA) diferente, por certo - ainda que alguns possam ser iguais ou similares.
Deve implementar os mecanismos apropriados para assegurar os critérios para cada utilizador/grupo.

**Questão:** Quando refere gestão de acessos, é exatamente ao quê? A uma pasta? A um módulo da aplicação? Por exemplo, o administrador tem acesso a todos os módulos enquanto o Gestor de Campus tem acesso somente ao módulo de Gestão de Campus?

**Resposta:** A gestão de acessos é aos componentes do UI, pastas, dados, etc... Também é para os clientes internos (colaboradores) que possuem credenciais locais.
Como planeiam criar a ligação à(s) base(s) de dados? Sempre com as mesmas credenciais que tudo permitem ou credenciais diferentes? Como planeiam controlar e monitorizar os acessos internos às pastas e informação on store?

## Desenho

Para a realização desta mesma, o cliente esclarece com uma das questões que cada utilizador tem um critério CIA diferente, critério este que envolve Confidencialidade, Integridade e Disponibilidade. Estes critérios são fundamentais para orientar as estratégias de segurança da informação.

Com base nos esclarecimentos obtidos, o grupo assumiu então que estes critérios de segurança se baseiam nestes 3 pontos principais.

Durante a realização do projeto, desde o Sprint A até este mesmo, já foram implementados alguns mecanismos de segurança que de acordo com os critérios CIA.

Alguns deles já implementados envolvem a configuração com o módulo PAM, bem como algumas user stories realizadas no Sprint B que condicionam o acesso à solução.

Outros mecanismos podem envolver manter o histórico de logins dos utilizadores, encriptação de passwords e realização de backups, também realizada em US do Sprint B e no Sprint C.

O exemplo do Last Login quando um utlizador faz conexão por ssh é um exemplo da utilização do histórico de logins
 
Relativamente ao histórico de login dos utilizadores e à encriptação de passwords, o sistema é responsável por estes mesmos.
Para acedermos aos logs de autenticação acedemos a /var/log/auth.log
 
A encriptação de passwords é feita pelo sistema também, encontra-se em etc/shadow:

Para além destas regras implementadas, no nosso projeto também aplicamos o parâmetro de autorização de acesso, onde cada utilizador só tem acesso às funcionalidades que necessita consoante a sua função, ou seja, uma Role.
 
Já para as políticas de acesso, estabelece-se algumas regras para a utilização dos recursos na organização, de entre elas destacam-se, por exemplo, não utilizar em circunstância alguma a conta de outro funcionário da empresa; se encontrar algum problema técnico, informar um administrador para que este possa contactar a equipa de desenvolvimento do projeto; Em caso de algum problema de conexão com um dos servidores, contactar a equipa de manutenção.
