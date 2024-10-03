# UC 270

## 1. Requisitos

**UC270** - Criar elevador em edifício.

## 2. Análise

### 2.1 Identificação do problema

Criar um elevador é uma entidade relevante do domínio que existe em edifícios e transporta pessoas/robos/drones de um piso para outro.

> Questão: há alguma restrição para o ID do elevador?
>esse número identificativo tem alguma especificação? era isso que queria perguntar
>
>Resposta: trata-se de um número inteiro
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
>Questão: Após análise do enunciado deparei-me com a coincidência: todos os edificios que têm elevador, este último serve todos os pisos desse edificio. Pode existir algum edifício em que o elevador não sirva todos os pisos?
>
>Resposta: sim, é possivel tal situação
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
>Questão: Relativamente à funcionalidade de criar elevador, no seguimento da sua resposta em (https://moodle.isep.ipp.pt/mod/forum/discuss.php?d=25298#p32051), gostaríamos que clarificasse quais das propriedades que indicou serem alfanuméricas podem conter espaços; por exemplo, nós acharíamos que seria sensato a descrição poder conter espaços.
>Adicionalmente, gostaria de saber se o identificador numérico que referiu deve ser fornecido ao sistema ou gerado automaticamente pelo mesmo, dado que este deve ser único dentro de cada edifício.
>
>Resposta: todos os atributos alfanumericos podem conter espaços à exceção do número de série
o número indeitifcativo do elevador deve ser gerado sequencialmente pelo sistema tendo em conta o edifico, por exemplo, existirá o elevador 1 do edificio B e o elevador 1 do edificio A

### 2.2 Testes ao requisito

**Teste 1:** *Criar elevador com sucesso (controlador, 201 OK)*

**Teste 2:** *Criar elevador com insucesso (controlador, 403 FORBIDDEN)*

**Teste 3:** *Criar elevador com sucesso (controlador + serviço, 201 OK)*

**Teste 4:** *Criar elevador com insucesso, edificio não existe (controlador + serviço, 403 FORBIDDEN)*

**Teste 5:** *Criar elevador com insucesso, pisos servidos não pertecem ao edifício/não existem (controlador + serviço, 403 FORBIDDEN)*

**Teste 6:** *Número identificativo da elevador segue regras de negócio.*

**Teste 7:** *Marca segue regras de negócio.*

**Teste 8:** *Modelo segue regras de negócio.*

**Teste 9:** *Número de série segue regras de negócio.*

**Teste 10:** *Descrição segue regras de negócio.*

## 3. Desenho

Para resolver o problema de criação de elevadores foi criado um agregado com a entidade "Elevador" e os respetivos value objects. Requisitos como este e o UC280, levou a equipa a decidir que um agregado seria a melhor solução para garantir manutenabilidade e expansibilidade. Consideramos ainda tratar o conceito "Elevador" como uma "Passagem". Sendo abstrato, faz sentido, porém optamos pela nossa escolha devido a simplicidade e naturalidade da resolução dos problemas.

### 3.1. Realização

#### 3.1.1 Excerto de domínio

![excerto dominio](ed270.svg "ed_270.svg")

#### 3.1.2 Vista de processo

##### 3.1.2.1 Nível 1

![vista processo 1](vp1.svg "Vista processo - nível 1")

##### 3.1.2.2 Nível 2

![vista processo 2](vp2.svg "Vista processo - nível 2")

##### 3.1.2.3 Nível 3

![vista processo 3](vp270.svg "Vista processo - nível 3")

#### 3.1.3 Vista lógica

##### 3.1.3.1 Nível 1

![vista logica 1](/docs/logical_view/level1/vl1.svg "Vista lógica - nível 1")

##### 3.1.3.2 Nível 2

![vista logica 2](/docs/logical_view/level2/vl2.svg "Vista lógica - nível 2")

##### 3.1.3.3 Nível 3

![vista logica 3](/docs/logical_view/level3/vl3.svg "Vista lógica - nível 3")

#### 3.1.3 Vista de cenários

##### 3.1.3.1 Nível 1

![vista cenario 1](/docs/scenario_view/level1/sv1.svg "Vista cenário - nível 1")

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
