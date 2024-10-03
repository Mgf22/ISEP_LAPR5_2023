# UC 470

## 1. Requisitos

**UC470** - Como gestor de tarefas pretendo aprovar ou recusar uma requisição.

## 2. Análise

### 2.1 Identificação do problema

O gestor de tarefas tem que conseguir aprovar/recusar requisições feitas por um utente.

**Respostas do cliente:**

> Pergunta: Na US480 é pedido para consultar as requisições de tarefas ainda não aprovadas
Na US490 é pedido para pesquisar as requisições de tarefas por estado, por tipo de dispositivo, ou utente.
A partir desta informação, podem haver diferentes interpretações. Uma das interpretações possíveis é que a listagem da US490 engloba a listagem que precisa de ser desenvolvida na US480, já que na tabela da US490 é possível filtrar os requisitos de tarefas por tarefas ainda não aprovadas. Essa filtragem daria a tabela que é pedida na US480.
>
>Com base nesta resposta (https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=26304#p33367) entendemos que irão haver duas tabelas. Uma exclusiva para aprovar ou reprovar tarefas que ainda não foram aprovadas, com os botões "aprovar" e "não aprovar" para cada tarefa, e outra apenas para listar e filtrar todas as tarefas e os vários conceitos relacionados.
>
>Pedíamos que esclarecesse o número de tabelas que pretende que existam, as suas diferenças, e quais permitem a aprovação ou reprovação das tarefas.
>
>Resposta: Sao duas opções distintas. Uma apenas para aprovar ou recusar as tarefas pendentes de decisão.
A outra opção é para consulta de todas as tarefas do sistema, inclusive histórico.



### 2.2 Testes ao requisito

**Teste 1:** *Aprovar requisição com sucesso (controlador, 200 OK)*

**Teste 2:** *Aprovar requisição com insucesso (controlador, 403 FORBIDDEN)*

**Teste 3:** *Rejeitar requisição com sucesso (controlador, 200 OK)*

**Teste 4:** *Rejeitar requisição com insucesso (controlador, 403 FORBIDDEN)*

**Teste 5:** *Aprovar/Recusar requisição com tarefa inválida (controlador + serviço, 403 FORBIDDEN)*

**Teste 6:** *Aprovar requisição com insucesso (controlador + serviço, 403 FORBIDDEN)*

**Teste 7:** *Aprovar requisição com sucesso (controlador + serviço, 200 OK)*

## 3. Desenho

Este requisito foi subdividido em dois: aprovação e rejeição.
Só é necessário receber informação relativa ao requisitante, tarefa e tipo de dispositivo.

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](ed.svg "mdgt/DM.puml")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

###### Aprovação

![vista processo 2](vp2a.svg "Vista processo - nível 2")

###### Reprovação

![vista processo 2](vp2b.svg "Vista processo - nível 2")

##### 3.1.2.3 Nível 3

###### Aprovação

![vista processo 3](vpa3a.svg "Vista processo - nível 3")

###### Reprovação

![vista processo 3](vp3b.svg "Vista processo - nível 3")

#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/sprint3/level2/VL2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/sprint3/level3/MDGT.svg "Vista lógica - nível 3")

#### 3.1.4 Vista de cenários

##### 3.1.4.1 Nível 1

![vista cenários 1](/docs/scenario_view/level1/sv1.svg "Vista cenários - nível 1")

#### 3.1.5 Vista de implementação

##### 3.1.5.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

##### 3.1.5.1 Nível 3

![vista implementacao 3](/docs/implementation_view/iv3.svg "Vista implementação - nível 3")

#### 3.1.6 Vista física

##### 3.1.6.1 Nível 2

![vista física 2](/docs/physical_view/level2/sprint3/VF2.svg "Vista física - nível 2")

### 3.2. Padrões aplicados

Os padrões aplicados são:

- REST + ONION (padrões arquiteturais);
- DTO;
- Persistence;
- Controller;
- Service;
- Interfaces;
- Schema;
- Mapper;
- Repository;
- Modelo.
