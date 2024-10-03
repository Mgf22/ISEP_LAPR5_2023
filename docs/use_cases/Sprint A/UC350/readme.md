# US 350

## 1. Requisitos

**US350** -  Como gestor de frota pretendo adicionar um novo tipo de robot indicando a sua designação e que tipos de tarefas pode executar da lista prédefinida de tarefas

> Q: A minha dúvida é em relação às tarefas e às suas definições.
>Existem diferentes tipos de tarefas, por isso, cada uma terá os seus atributos. No entanto, que atributos definem uma tarefa em geral? Apenas a sua designação?
>Em relação às tarefas existentes (vigilância de um piso e transporte de um objeto) existem algum requerimento especial? Para além da especificação do piso na vigilância e especificação do objeto e local de recolha e entrega no caso do transporte.
> 
>R: de momento todos os robots da frota apenas suportam estes dois tipos de tarefas. a existirem novos tipos de tarefas será necessáiro desenvolvimento especifico para tal. Em consequência não existem "tarefas em geral"
>As tarefas de vigilância caracterizam-se por indicar qual o edificio e piso(s) que se pretende vigiar bem como o número de contacto em caso de incidente. tipicamente o segurança irá requisitar que um robot "dê uma volta pelos pisos X, Y e Z do edificio N". Caso o robot detete alguma situação anómala, o robot irá enviar um SMS para o contacto indicado (*)
As tarefas de "piclup & delivery" caracterizam-se por indicar qual a sala que se pretende de pickup e qual a sala de delivery, bem como um nome e um contacto para pickup e outro para delivery. deve também ser indicado um código de confirmação que a pessoa que receberá deverá introduzir no painel do robot. adicionalmente deve ser indicada uma descrição da entrega, ex., "Marcadores de cor vermelha (1x) e azul (2x)"
(*) fora do âmbito do protótipo
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
>Q: A US 350 (Como gestor de frota pretendo adicionar um novo tipo de robot indicando a sua designação e que tipos de tarefas pode executar da lista prédefinida de tarefas) - adicionar um tipo é indicar qual é a marca, o modelo e as tarefas que pode desempenhar um robot?
>
>R: no requisito 350 definimos tipos de robots e no requisito 360 definimos robots desses tipos.
se ajudar, fica aqui uma analogia.
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
>definir tipos de viaturas:
tipo 1: renault clio 5 portas gasolina
tipo 2: renault megane 5 portas diesel
definir viaturas
viatura com matricula AA-00-01 do tipo 1
viatura com matricula BB-10-CC do tipo 2
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
>Q: Relativamente à US350 foi referido numa resposta anterior "o requisito 350 permite definir que tipos de robots existem. por exemplo "Tipo A: Robot marca X modelo Y com capacidade de executar tarefas de vigilância"
Pretende alguma regra de negócio para o limite de caracteres para o tipo, marca e modelo?
>
>R: tipo de robot: obrigatório, alfanum+ericos, maximo 25 caracteres
marca: obrigatório, maximo 50 caracteres
modelo: obrigatório, máximo 100 caracteres

## 2. Análise

### 2.1 Identificação do problema

Este requisito levanta a questão de criação de tipos de robos.

### 2.2 Testes ao requisito

**Teste 1:** *Adicionar tipo de robo com sucesso (controlador, 201 POST)*

**Teste 2:** *Adicionar tipo de robo com insucesso (controlador, 403 FORBIDDEN)*

**Teste 3:** *Adicionar tipo de robo com sucesso (controlador + serviço, 201 POST)*

**Teste 4:** *Adicionar tipo de robo com insucesso, tarefa(s) não existe(m) (controlador + serviço, 403 FORBIDDEN)*

**Teste 5:** *Designação da sala segue regras de negócio.*

**Teste 6:** *Marca segue regras de negócio.*

**Teste 7:** *Modelo segue regras de negócio.*



## 3. Design

Para solucionar este problema, a equipa optou por criar um agregado para TipoRobo garantindo assim expansibilidade e manutenabilidade.

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](ed350.svg "ed350.svg")

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
