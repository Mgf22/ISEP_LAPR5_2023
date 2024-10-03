# UC 380

## 1. Requisitos

**UC380** -  Como gestor de frota pretendo consultar todos os robots da frota.

## 2. Análise

### 2.1 Identificação do problema

Este requisito trata de listar robos persistidos, sem parâmetros.

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Ensure Username can't be null*

**Test 2:** *Ensure Password can't be null*

**Test 3:** *Ensure FirstName can't be null*

**Test 4:** *Ensure LastName can't be null*

**Test 5:** *Ensure Email can't be null*

**Test 6:** *Ensure User can't be null*

**Test 7:** *Ensure list of users can't be null*



## 3. Design



### 3.1. Realização

### 3.1.1 Excerto do MD

![excerpt diagram](ed380.svg "ed380.svg")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](./Nivel%201/vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

![vista processo 2](./Nivel%202/vp2.svg "Vista processo - nível 2")

##### 3.1.2.3 Nível 3

![vista processo 3](./Nivel%203/vp3.svg "Vista processo - nível 3")

#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

a

#### 3.1.4 Vista de implementação

##### 3.1.3.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

##### 3.1.3.1 Nível 3

![vista implementacao 3](/docs/implementation_view/iv3.svg "Vista implementação - nível 3")

#### 3.1.5 Vista física

##### 3.1.5.1 Nível 2

![vista física 2](/docs/physical_view/level2/vf2.svg "Vista física - nível 2")

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
