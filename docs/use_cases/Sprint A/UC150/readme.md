# UC 150

## 1. Requisitos

**UC150** - Criar edifício.

## 2. Análise

### 2.1 Identificar o problema

Criar um edifício é um conceito fundamental de criação de uma entidade importante para este negócio.

> Questão: O nome do edifício tem limitações como, por exemplo, tem de ter uma letra e números? E para além do nome do edifício, que mais informação deve ser guardada sobre o edifício. Em relação à breve descrição, existe alguma regra em particular?
>
>
> Resposta: O código do edificio é obrigatório, no máximo 5 caracteres, letras e digitos, podendo conter espaços no meio, o nome do edificio é opcional, no máximo 50 caracteres alfanuméricos. É opcional, com o máximo de 255 caracteres

### 2.2 Excerto do MD

![excerpt diagram](ed150.svg "domain_excerpt_150.svg")

### 2.3 Testes ao requisito

**Test 1:** *Criar edifício com sucesso (controlador, 201 POST)*

**Test 2:** *Criar edifício com insucesso (controlador, 403 FORBIDDEN)*

**Test 3:** *Criar edifício com sucesso (controlador + serviço, 201 POST)*

**Test 4:** *Criar edifício com insucesso (controlador + serviço, 403 FORBIDDEN)*

**Test 5:** *Código de edifício segue regras de negócio.*

**Test 6:** *Nome opcional segue regras de negócio.*

**Test 7:** *Descrição segue regras de negócio*

## 3. Desenho

Para solucionar este problema, foi pensado num agregado para esta entidade, Edifício. É um conceito existente por si só, deve garantir manutenabilidade e expansibilidade.

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1

![vista processo 1](../UC150/Nivel%201/vp1.svg "Vista processos - nível 1")

##### 3.1.1.2  Nível 2

![vista processo 2](../UC150/Nivel%202/vp2.svg "Vista processos - nível 2")

#### #3.1.1.3  Nível 3

![vista logica 3](../UC150/Nivel%203/vp3.svg "Vista processos - nível 3")

#### 3.1.2 Vista Lógica

##### 3.1.2.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.2.2 Nível 2

![vista logica 2](/docs/logical_view/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.2.3 Nível 3

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
