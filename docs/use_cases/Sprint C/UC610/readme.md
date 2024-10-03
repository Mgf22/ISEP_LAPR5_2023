# UC 610

## 1. Requisitos

**UC610** - Ao navegar de forma automática com base no planeamento de percurso, a passagem entre edifícios deve ter feedback visual adequado.

## 2. Análise

### 2.1 Identificar o problema

Implementar um feedback visual enquanto o player viaja dentro da passagem.

**Respostas do cliente:**

Pergunta:
Venho por este meio questionar o que o cliente entende por feedback visual adequado ao fazer a mudança entre passagens.

Resposta:
Idealmente, quando o robot está a movimentar-se de um piso para outro através de uma passagem, a cena visualizada deve ser o corredor de passagem. Ou seja, quando se movimenta num piso visualizam/"desenham" o piso, ao aproximar-se de uma passagem, visualizam/"desenham a passagem, ao aproximar-se do "fim" da passagem e entrar noutro piso, visualizam/"desenham esse piso.
É também aceitavel uma versão mais simples que faça aparecer uma "pop up" de alerta ao utilizador indicando que está a transitar de um piso para outro edificio. quando o utilizador fechar o alerta, visualizam/"desenham" o novo piso.
Quer num caso, quer noutro, sempre que se deslocam de um edifico/piso para outro, os respetivos controlos de UI devem ser atualizados, permitindo assim ao utilizador saber que ediifcio e piso está presentemente a visualizar.


### 2.3 Testes ao requisito


## 3. Desenho

Para solucionar este problema, é necessário criar um método que apresenta uma animação enquanto o player se encontra dentro da passagem a transitar de um piso para o outro.

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
