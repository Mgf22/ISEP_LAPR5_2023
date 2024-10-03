# UC 160

## 1. Requisitos

**UC160** -  Editar edificio

## 2. Análise

### 2.1 Indentificar o problema
Editar um edificio, através de um método PUT/PATCH.

> Questão : Em relação às User Stories de edição, temos já uma ideia das informações que são opcionais, mas queremos ter a certeza daquilo que é editável ou não. Posto isto, poderia indicar que informações pretende editar nas US160, US200, US250 e US280?
>
>Resposta: requisito 160 - editar edificio - todas as informações à exceção do código do edificio

#### 2.2 Excerto de domínio

![excerto dominio](ed160.svg "ed_160.svg")

### 2.3 Testes ao requisito

**Test 1:** *Modificar edficio com sucesso (controlador, 201 PUT)*

**Test 2:** *Modificar edificio com insucesso (controlador, 403 FORBIDDEN)*

**Test 3:** *Modificar edificio com sucesso (controlador + serviço, 201 PUT)*

**Test 4:** *Modificar edificio com insucesso, codigo de edificio em uso (controlador + serviço, 403 FORBIDDEN)*

## 3. Desenho

Para resolver este problema, é pedido ao utilizador os parametros a atualizar do edificio. O único parametro que nao pode ser atualizado é o código por ser unico.

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](../UC160/ed160.svg "ed_270.svg")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](../UC160/Nivel%201/vp1.svg "Vista processos - nível 1")

##### 3.1.2.2 Nível 2

![vista processo 2](../UC160/Nivel%202/vp2.svg "Vista processos - nível 2")

##### 3.1.2.3 Nível 3

![vista processo 3](../UC160/Nivel%203/vp3.svg "Vista processos - nível 3")

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
