# UC 490

## 1. Requisitos

**UC490** - Como gestor de tarefas pretendo pesquisar as requisições de tarefas por estado, por tipo de dispositivo, ou utente.

## 2. Análise

### 2.1 Identificação do problema

O gestor de tarefas tem que conseguir fazer uma listagem de requisições filtrada com o que entender: estado, tipo de dispositivo ou utente. Esta tarefa pode ser repartida em três.

### 2.2 Testes ao requisito

**Teste 1:** *Listar requisições por tipo dispositivo/estado/utente (controlador, 200 OK)*

**Teste 2:** *Listar requisições por tipo dispositivo/estado/utente  (controlador, 404 NOT FOUND)*

**Teste 3:** *Listar requisições por tipo dispositivo/estado/utente  (controlador + serviço, 200 OK)*

**Teste 4:** *Listar requisições por tipo dispositivo/estado/utente  (controlador + serviço, 404 NOT FOUND)*

## 3. Desenho

Visto que os dados aqui inseridos poderão chegar aos milhares em, relativamente, pouco tempo, a equipa desenhou uma forma de contornar a listagem "pesadíssima" que seria listar uma quantidade tão grande informação:
Listaremos o máximo de 500. Mais concretamente, serão listados os últimos 500 registos da base de dados.

O requisito foi repartido por listagem.

### 3.1. Realização

#### 3.1.2 Vista de processo (Listagem por Estado)

##### 3.1.2.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

###### Tipo de dispositivo

![vista processo 2](vp2a.svg "Vista processo - nível 2")

###### Estado

![vista processo 2](vp2b.svg "Vista processo - nível 2")

###### Utente

![vista processo 3](vp2c.svg "Vista processo - nível 3")

##### 3.1.2.3 Nível 3

###### Tipo de dispositivo

![vista processo 3](vp3a.svg "Vista processo - nível 3")

###### Estado

![vista processo 3](vp3b.svg "Vista processo - nível 3")

###### Utente

![vista processo 3](vp3c.svg "Vista processo - nível 3")

#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](../../../../logical_view/sprint3/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](../../../../logical_view/sprint3/level2/VL2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](../../../../logical_view/sprint3/level3/MDGT.svg "Vista lógica - nível 3")

#### 3.1.4 Vista de cenários

##### 3.1.4.1 Nível 1

![vista cenários 1](/docs/scenario_view/level1/sv1.svg "Vista cenários - nível 1")

#### 3.1.5 Vista de implementação

##### 3.1.5.1 Nível 2

![vista implementacao 2](../../../../implementation_view/sprint3/IV2.svg "Vista implementação - nível 2")

##### 3.1.5.1 Nível 3

![vista implementacao 3](../../../../implementation_view/sprint2/iv3.svg "Vista implementação - nível 3")

#### 3.1.6 Vista física

##### 3.1.6.1 Nível 2

![vista física 2](../../../../physical_view/level2/sprint3/VF2.svg "Vista física - nível 2")

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