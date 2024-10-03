# UC 1310

## 1. Requisitos

**UC1310** - Como arquiteto da solução pretendo que todos os serviços de backend sejam autenticados.

## 2. Análise

### 2.1 Identificar o problema

Que método utilizar para implementar uma solução de autenticação para todos os serviços de backend?

### 2.2 Respostas do Cliente

Pergunta: 
	Podia especificar melhor o momento em que deve ser feita a verificação das autorizações? Deve ser feita no momento do login onde será demonstrado o menu de acordo com o utilizador (com a us 1300), ou deve ser feita apenas no backend?

Resposta:
	No momento de login deve ser verificado se o utilizador tem acesso à aplicação. em caso afirmativo o menu de opções deve ser ajustado às suas permissões.
	Por uma questão de segurança, todas as operações de serviços devem novamente validar se o pedido é efetuado por um utilizador com permissões para executar essa operação.

### 2.3 Testes ao requisito

**Test 1:** 

**Test 2:** 

## 3. Desenho

Para solucionar este problema, foi implementada uma framework em dotnet para o módulo de autenticação para os serviços de backend.
Cada utilizador tem uma role apenas.

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1

![vista processo 1](../UC1310/Nivel%201/vp1.svg "Vista processos - nível 1")

##### 3.1.1.2  Nível 2

![vista processo 2](../UC1310/Nivel%202/vp2.svg "Vista processos - nível 2")

#### 3.1.1.3  Máquina de Estados

![vista logica 3](../UC1310/me.svg "Máquina de Estados")

#### 3.1.2 Vista Lógica

##### 3.1.2.1 Nível 1

![vista logica 1](../../../logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.2.2 Nível 2

![vista logica 2](../../../logical_view/level2/vl2.svg "Vista lógica - nível 2") 

##### 3.1.2.3 Nível 3

![vista logica 3](../../../logical_view/sprint3/level3/A&A.svg "Vista lógica - nível 3") 

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenarios 1](../../../scenario_view/level1/sv1.svg "Vista de cenários - nível 1")

#### 3.1.4 Vista de implementação

##### 3.1.3.1 Nível 2

![vista implementacao 2](../../../implementation_view/sprint3/IV2.svg "Vista implementação - nível 2")

##### 3.1.3.1 Nível 3

![vista implementacao 3](../../../implementation_view/sprint2/iv3.svg "Vista implementação - nível 3")

#### 3.1.5 Vista física

##### 3.1.5.1 Nível 2

![vista física 2](../../../physical_view/level2/sprint3/VF2.svg "Vista física - nível 2")

### 3.2. Padrões aplicados

Os padrões aplicados são:

- Component;
- Services;
- Pipes;
- Diretivas;
- Modelo.
- REST + ONION (padrões arquiteturais);
- DTO;
- Persistence;
- Controller;
- Interfaces;
- Mapper;
- Repository;