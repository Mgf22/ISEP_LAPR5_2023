# UC 170

## 1. Requisitos

**UC170** -  Listar todos os edificios

## 2. Análise

### 2.1 Indentificar o problema
Listar todos os edifícios através de um método GET.

### 2.2 Testes ao requisito

**Teste 1:** *Listar edificios com sucesso (controlador, 201 POST)*

**Teste 2:** *Listar edificios com insucesso (controlador, 403 FORBIDDEN)*

**Teste 3:** *Listar edificios com sucesso (controlador + serviço, 201 POST)*

**Teste 4:** *Listar edificios com insucesso, edificios não existentes (controlador + serviço, 403 FORBIDDEN)*

## 3. Desenho

Para resolver este problema, o utilizador seleciona a opção de listar edificios e é lhe retornada a lista de edificios, caso existam.

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](ed170.svg "ed_270.svg")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

![vista processo 2](vp2.svg "Vista processo - nível 2")

##### 3.1.2.3 Nível 3

![vista processo 3](vp3.svg "Vista processo - nível 3")

#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenarios 1](../../scenario_view/level1/sv1.svg "Vista de cenários - nível 1")

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
