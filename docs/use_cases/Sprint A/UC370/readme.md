# UC 370

## 1. Requisitos

**UC370** -  Como gestor de frota pretendo inibir um robô


## 2. Análise

### 2.1 Indentificar o problema
Para inibir um robô temos de alterar o seu estado de ativo para inativo, e ter em consideração o PATCH.

### 2.2 Testes ao requisito

**Test 1:** - Inibir robô com sucesso (controlador, 201, PATCH)

**Test 2:** - Inibir robô com insucesso (controlador, 404)

**Test 3:** - Inibir robô com sucesso (controlador + service, 201, PATCH)

**Test 4:** - Inibir robô com insucesso (controlador + service , 404, PATCH)

**Test 5:** - Estado não pode ser nulo

**Test 6:** - Robô tem de existir

**Test 7:** - Robô não pode ser nulo

## 3. Design

Para resolver este problema, implementamos um parâmetro nos robôs que define o seu estado como ativo e inativo, e sempre que for necessário inibir um robô da sua atividade, alteramos o seu respetivo estado.

### 3.1. Realização

### 3.1.1 Excerto de Domínio

![excerpt diagram](ed370.svg "domain_excerpt_370.svg")

### 3.1.2 Vista de processos

#### 3.1.2.1 Nível 1

![vista processo 1](../UC370/Nível%201/vp1.svg "Vista de processos - nível 1")

#### 3.1.2.2 Nível 2

![vista processo 2](../UC370/Nível%202/vp2.svg "Vista de processos - nível 2")

#### 3.1.2.3 Nível 3

![vista processo 3](../UC370/Nível%203/vp3.svg "Vista de processos - nível 3")

### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/level3/vl3.svg "Vista lógica - nível 3")

### 3.1.4 Vista de cenários

#### 3.1.4.1 Nível 1

![vista cenarios 1](../UC370/Nível%201/vc1.svg "Vista de pcenários - nível 1")

### 3.1.5 Vista de implementação

#### 3.1.5.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

#### 3.1.5.2 Nível 3

![vista implementacao 3](/docs/implementation_view/iv3.svg "Vista implementação - nível 3")

### 3.1.6 Vista física

##### 3.1.6.1 Nível 2

![vista física 2](/docs/physical_view/level2/vf2.svg "Vista física - nível 2")

### 3.2. Padrões aplicados
Os padrões aplicados são:
- DTO;
- Persistence;
- Controller;
- Service;
- Interfaces;
- Schema;
- Mapper;
- Repository;
- Modelo.