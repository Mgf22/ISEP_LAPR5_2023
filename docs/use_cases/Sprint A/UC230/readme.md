# UC 230

## 1. Requisitos

**UC230** -  Carregar mapa de um piso


## 2. Análise

### 2.1 Indentificar o problema
Carregar o mapa de um piso através de um método PATCH.


### 2.2 Excerto do MD
![excerpt diagram](domain_excerpt_230.svg "domain_excerpt_160.svg")

### 2.3 Testes de Unidade - Teste de regras de negócio

**Test 1:** *Ensure Username can't be null*

**Test 2:** *Ensure Password can't be null*

**Test 3:** *Ensure FirstName can't be null*

**Test 4:** *Ensure LastName can't be null*

**Test 5:** *Ensure Email can't be null*

**Test 6:** *Ensure User can't be null*

**Test 7:** *Ensure list of users can't be null*



## 3. Design

To solve this problem it is necessary to ask for the parameters for the user (in case we're adding a user), make sure 
they persist in the database to make sure we can solve the US1001_2 and US1001_3.

### 3.1. Realização

### 3.3.1 Diagrama de Sequência

![sequence diagram](uc230/sequence_diagram.svg "sequence_diagram")


### 3.2. Padrões aplicados
Os padrões aplicados são:
- DTO;
- Persistência;
- Aplicação;
- Controlador;
- Serviço;
- Modelo.