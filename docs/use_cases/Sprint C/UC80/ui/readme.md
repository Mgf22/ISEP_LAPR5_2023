# UC 80

## 1. Requisitos

**UC80** -Como administrador do sistema pretendo aprovar ou recusar o registo de um utente

## 2. Análise

### 2.1 Identificar o problema

Implementar um método que permita a um administrador aprovar ou recusar o registo de um utente

**Respostas do cliente:**

> Pergunta: Como pretende que a atribuição de um Role seja feito?
Durante a aprovação do registo do utente pelo Administrator (US80)
>
>Resposta: 
o administrador atribui o papel na criação de utilizadores.
os utilizadores que utilizem a funcionalidade de registo serão sempre do tipo "utente"


### 2.3 Testes ao requisito

## 3. Desenho

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](/authentication/DM.svg "authentication/DM.svg")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](../a&a/vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

![vista processo 2](../a&a/vp2.svg "Vista processo - nível 2")

##### 3.1.2.3 Nível 3

##### Pedidos pendentes
![vista processo 3](./vp3_getPedidosPendentes.svg "Vista processo - nível 3 get Pedidos Pendentes")

##### Aprovar pedido
![vista processo 3](./vp3_aprovarPedido.svg "Vista processo - nível 3 aprovar Pedido")

##### Recusar pedido
![vista processo 3](./vp3_recusarPedido.svg "Vista processo - nível 3 recusar Pedido")


#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/sprint3/level2/VL2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/sprint3/level3/UI.svg "Vista lógica - nível 3")

#### 3.1.4 Vista de cenários

##### 3.1.4.1 Nível 1

![vista cenários 1](/docs/scenario_view/level1/sv1.svg "Vista cenários - nível 1")

#### 3.1.5 Vista de implementação

##### 3.1.5.1 Nível 2

![vista implementacao 2](/docs/implementation_view/sprint3/iv2.svg "Vista implementação - nível 2")

##### 3.1.5.1 Nível 3

![vista implementacao 3](/docs/implementation_view/sprint2/iv3.svg "Vista implementação - nível 3")

#### 3.1.6 Vista física

##### 3.1.6.1 Nível 2

![vista física 2](/docs/physical_view/level2/sprint3/VF2.svg "Vista física - nível 2")

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

