# UC 260

## 1. Requisitos

**UC260** - Listar passagens entre 2 edifícios.

## 2. Análise

### 2.1 Identificação do problema

Listar passagens entre 2 edifícios deve apresentar todas as passagens que conectem um edificio A a um edificio B (todas as passagens são bidirecionais).

### 2.2 Testes ao requisito

**Teste 1:** *Listar passagens com sucesso (controlador, 200 OK)*

**Teste 2:** *Listar passagens com insucesso (controlador, 404 NOT FOUND)*

**Teste 3:** *Listar passagens com sucesso (controlador + serviço, 200 OK)*

**Teste 4:** *Listar passagens com insucesso (controlador + serviço, 404 NOT FOUND)*

## 3. Desenho

Para solucionar este problema, existe um agregado designado por Passagem que tem como atributos um edificio A, outro edificio B, um piso do edificio A e outro piso do edificio B. Desta forma, é possível listar todos as passagens entre dois edificios especificos.

Nota de detalhe técnico: Tabela de dupla entrada.

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](ed260.svg "ed260.svg")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

![vista processo 2](vp2.svg "Vista processo - nível 2")

##### 3.1.2.3 Nível 3

![vista processo 3](vp260.svg "Vista processo - nível 3")

#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenários 1](/docs/scenario_view/level1/sv1.svg "Vista cenários - nível 1")

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
