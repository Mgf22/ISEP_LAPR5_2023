# UC 1150

## 1. Requisitos

**UC1150** - Como gestor de Campus pretendo editar Elevador em Edifício

> Questão: Qual é a informação que o elevador deve manter?
>
> Resposta: edificio (obrigatório)
> número identificativo (obrigatório, único no edificio)
> lista de pisos do edificio servidos pelo elevador (obrigatório)
> marca (opcional, alfanumerico, 50 caracteres)
> modelo (opcional, mas obrigatório se marca for introduzido, alfanumerico, 50 caracteres)
> número de série do fabricante (opcional, alfanumerico, 50 caracteres)
> breve descrição (opcional, alfanumerico, 250 caracteres)

## 2. Análise

### 2.1 Identificação do problema

Editar um elevador é um requisito relevante do domínio que deve ser capaz de atualizar informação de um elevador já existente.

### 2.2 Testes ao requisito (Alterar consoante necessidade!)

**Teste 1:** *Editar elevador successfully*

**Teste 2:** *Editar elevador unsuccessfully*

**Teste 6:** *Editar elevador com insucesso, novos pisos servidos não existem/não pertecem ao edifício (controlador + serviço, 404 NOT FOUND)*

## 3. Desenho

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.1.2 Nível 2

![vista processo 2](vp2.svg "Vista processo - nível 2")

##### 3.1.1.3 Nível 3

![vista processo 3](vp3.svg "Vista processo - nível 3")

#### 3.1.2 Vista lógica

##### 3.1.2.1 Nível 1

![vista logica 1](/docs/logical_view/sprint2/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.2.2 Nível 2

![vista logica 2](/docs/logical_view/sprint2/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.2.3 Nível 3

![vista logica 3](/docs/logical_view/sprint2/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenario 1](/docs/scenario_view/level1/sv1.svg "Vista cenário - nível 1")

#### 3.1.4 Vista de implementação

##### 3.1.4.1 Nível 2

![vista implementacao 2](/docs/implementation_view/iv2.svg "Vista implementação - nível 2")

##### 3.1.5.1 Nível 3

![vista implementacao 3](/docs/implementation_view/sprint2/iv3.svg "Vista implementação - nível 3")

#### 3.1.6 Vista física

##### 3.1.6.1 Nível 2

![vista física 2](/docs/physical_view/level2/sprint2/vf2.svg "Vista física - nível 2")

### 3.2. Padrões aplicados

Os padrões aplicados são:

- Component;
- Services;
- Pipes;
- Diretivas;
- Modelo.
