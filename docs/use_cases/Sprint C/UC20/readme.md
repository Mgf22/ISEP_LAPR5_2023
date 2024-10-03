# UC 20

## 1. Requisitos

**UC20** - Como potencial utente do sistema (ex., aluno, docente) pretendo registar-me como utente do sistema.

## 2. Análise

### 2.1 Identificar o problema

Implementar um método que permita a um utente se registar no sistema e ficar à espera de uma autorização de um administrador.

### 2.2 Respostas do Cliente
Pergunta:

Na Us de registo de um utente na aplicação deve ser apresentado a este a política de privacidade antes ou depois de ele preencher a sua informação? E caso o mesmo não a aceite como devo proceder, aviso que o registo não é possível sem aceitar a política de privacidade e retorno à home page ou pergunto se se quer registar de novo?

Resposta:
No formulário de registo deve ser pedida toda a informação e apresentada uma checkbox para aceitação da política de privacidade. No texto dessa checkbox deve existir um link para a política de privacidade.
O preenchimento da checkbox é obrigatório e se não for preenchido deve ser apresentada uma mensagem


Pergunta:
Que dados são necessários para a criação/registo de um utilizador, para além do seu Role?

Resposta:
criação de utilizadores e registo de utilizadores são dois casos de uso diferentes e com necessidades distintas.
a criação de utilizadores serve para os administradores de sistema criarem os diversos utilizadores de backoffice do sistema num dos papeis designados, ex., gestor de campus, gestor de frota, gestor de tarefas o registo de utentes serve para o registo de utilizadores com o papel utente em ambos os casos será necessário obter nome, email e telefone.
No registo de utentes deve adicionalmente ser recolhido o número de contribuinte para faturação de serviços apenas serão aceites emails da organização, ex., isep.ipp.pt.

Pergunta:
Como pretende que a atribuição de um Role seja feito?
Durante o registo do utente pelo próprio utente (US20)

Resposta:
o administrador atribui o papel na criação de utilizadores.
os utilizadores que utilizem a funcionalidade de registo serão sempre do tipo "utente"


### 2.3 Testes ao requisito

**Test 1:** *Create utente successful case*

**Test 2:** *Create utente unsuccessful case*

## 3. Desenho

Para solucionar este problema, foi criado um novo agregado de utilizadores e um de roles que estão interligados.

### 3.1. Realização

#### 3.1.1 Vista de processo

##### 3.1.1.1 Nível 1

![vista processo 1](../UC20/Nivel%201/vp1.svg "Vista processos - nível 1")

##### 3.1.1.2  Nível 2

![vista processo 2](../UC20/Nivel%202/vp2.svg "Vista processos - nível 2")

#### #3.1.1.3  Nível 3

![vista logica 3](../UC20/Nivel%203/vp3.svg "Vista processos - nível 3")

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