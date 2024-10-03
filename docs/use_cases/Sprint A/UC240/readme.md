# US 240

## 1. Requisitos

**US240** -  Criar passagem entre edifícios

## 2. Análise

### 2.1 Indentificar o problema
Para ser possível criar uma passagem entre edifícios é necessário fornecer dados relativamente aos edificios e aos pisos em questão de cada edificio, usando o POST.

**Respostas do cliente:**

> Pergunta: No mesmo edifício é possível ter duas passagens para outro edifício, em pisos diferentes? 
Por exemplo, do edifício B existir uma passagem para o edifício G no piso 2 e outra no piso 3 também para o G. 
>
>Resposta: Sim. em cada piso podem existir várias passagens, cada uma para outro edificio, e no mesmo edificio podem existir várias passagens para um outro edificio desde que em pisos diferentes.


### 2.2 Excerto do MD
![excerpt diagram](ed240.svg "domain_excerpt_3004.svg")

### 2.3 Testes ao requisito

**Test 1:** *Criar passsagem entre edifícios com sucesso (controlador, 201 POST)*

**Test 2:** *Criar passsagem entre edifícios com insucesso (controlador, 403 FORBIDDEN)*

**Test 3:** *Criar passsagem entre edifícios com sucesso (controlador + serviço, 201 POST)*

**Test 4:** *Criar passsagem entre edifícios com insucesso (controlador + serviço, 403 FORBIDDEN)*

**Test 5:** *Criar passagem entre edifícios com insucesso (edificioA e edificioB são iguais)*

**Test 5:** *Criar passagem entre edifícios com insucesso (pisoA e pisoB são iguais)*


## 3. Desenho

Para solucionar este problema, foi pensado num agregado para esta entidade, Passagem. É um conceito existente por si só, deve manter manutenabilidade e expansibilidade.

### 3.1. Realização

### 3.1.1 Vistas de Processo

#### 3.1.1.1 Vista de processo - nível 1

![sequence diagram](../UC240/Nível%201/VP1.svg "vp1.svg")

#### 3.3.1.2 Vista de processo - nível 2

![sequence diagram](../UC240/Nível%202/vp2.svg "vp2.svg")

#### 3.3.1.3 Vista de processo - nível 3

![sequence diagram](../UC240/Nível%203/vp3.svg "vp3.svg")

### 3.3.2 Vistas lógicas

#### 3.3.2.1 Vista lógica - nível 1

![vista logica 3](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 3")

#### 3.3.2.2 Vista lógica - nível 2

![vista logica 3](/docs/logical_view/level3/vl2.svg "Vista lógica - nível 3")

#### 3.3.2.3 Vista lógica - nível 3

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