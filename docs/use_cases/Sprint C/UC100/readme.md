# UC 100

## 1. Requisitos

**UC100** - Como utente do sistema pretendo retificar/alterar os meus dados.

## 2. Análise

### 2.1 Identificar o problema

Implementar um método que permita ao utente alterar os seus próprios dados.

### 2.2 Respostas do Cliente

Pergunta:
Que dados pessoais é que o utente pode alterar?

Resposta:
Todos à exceção do email que serve para identificar o cliente.

Pergunta:
A password do utilizador é expectável poder ser alterada neste caso de uso?
Ou isso seria algo a fazer noutra funcionalidade do software?

Resposta:
a alteração de password faz parte de outro conjunto de casos de uso. Neste caso de uso apenas ratificam os dados pessoais do utente



### 2.3 Testes ao requisito

**Test 1:** *UPDATE utente successful case*

**Test 2:** *UPDATE utente unsuccessful case*

## 3. Desenho

Para solucionar este problema, foi criado um novo agregado de utilizadores e um de roles que estão interligados.

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1

![vista processo 1](../UC100/Nivel%201/vp1.svg "Vista processos - nível 1")

##### 3.1.1.2  Nível 2

![vista processo 2](../UC100/Nivel%202/vp2.svg "Vista processos - nível 2")

#### #3.1.1.3  Nível 3

![vista logica 3](../UC100/Nivel%203/vp3.svg "Vista processos - nível 3")

#### 3.1.2 Vista Lógica

##### 3.1.2.1 Nível 1

![vista logica 1](/docs/logical_view//sprint3/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.2.2 Nível 2

![vista logica 2](/docs/logical_view/sprint3/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.2.3 Nível 3

![vista logica 3](/docs/logical_view/sprint3/level3/A&A.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenarios 1](../../../scenario_view/level1/sv1.svg "Vista de cenários - nível 1")

#### 3.1.4 Vista de implementação

##### 3.1.3.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

##### 3.1.3.1 Nível 3

![vista implementacao 3](/docs/implementation_view/sprint2/iv3.svg "Vista implementação - nível 3")

#### 3.1.5 Vista física

##### 3.1.5.1 Nível 2

![vista física 2](/docs/physical_view/level2/sprint2/vf2.svg "Vista física - nível 2")

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
