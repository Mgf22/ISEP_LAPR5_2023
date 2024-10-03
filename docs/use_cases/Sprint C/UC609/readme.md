# UC 609

## 1. Requisitos

**UC609** - Animar o movimento automático do robot de um dado ponto de partida a um dado ponto de chegada, de acordo com a informação disponibilizada pelo módulo de planeamento de percurso.

## 2. Análise

### 2.1 Identificar o problema

Implementar os métodos necessários para ser possível o player executar as tarefas autonomamente.

**Respostas do cliente:**

Pergunta:
Gostaria de saber o que deverá acontecer após ser terminada a visualização da tarefa. Será exibida uma mensagem que chegou ao fim, ou deverá ficar a fazer a mesma tarefa em ciclo?

Resposta:
Deverá ser mostrada uma mensagem e o módulo deve voltar ao modo de movimento interativo.


Pergunta:
Gostaria de saber como é que o percurso automatico se procede. É o utilizador que chega ao módulo de visualização 3D e escolhe um ponto inicial e depois um final e o robot percorre esse percurso, ou é através de uma tarefa que já foi aceite e o utilizador quer ver o percurso dessa tarefa?

Resposta:
a partir da US 500 "consultar plano de execução" o utilizador poderá ver a sequencia de tarefas a executar, por exemplo numa tabela. em cada linha dessa tabela deve existir uma acção que permita saltar para o módulo de visualização 3D e ver a animação do percurso relativo à tarefa seleccionada.


### 2.3 Testes ao requisito


## 3. Desenho

Para solucionar este problema, necessitam de ser criados métodos que integrem com o módulo do planeamento de forma a buscar as rotas para o player seguir.

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1


##### 3.1.1.2  Nível 2


#### #3.1.1.3  Nível 3



#### 3.1.2 Vista Lógica

##### 3.1.2.1 Nível 1

![vista logica 1](/docs/logical_view//sprint3/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.2.2 Nível 2

![vista logica 2](/docs/logical_view/sprint3/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.2.3 Nível 3

![vista logica 3](/docs/logical_view/sprint3/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenarios 1](../../../scenario_view/level1/sv1.svg "Vista de cenários - nível 1")

#### 3.1.4 Vista de implementação

##### 3.1.3.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

##### 3.1.3.1 Nível 3

![vista implementacao 3](/docs/implementation_view/iv3.svg "Vista implementação - nível 3")

#### 3.1.5 Vista física

##### 3.1.5.1 Nível 2

![vista física 2](/docs/physical_view/level2/sprint3/vf2.svg "Vista física - nível 2")

### 3.2. Padrões aplicados
