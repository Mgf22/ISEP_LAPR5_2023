# UC 535

## 1. Requisitos

**UC535** - Como utilizador pretendo um menu que me permita aceder às funcionalidades de cada módulo.

## 2. Análise

### 2.1 Identificação do problema

Existe a necessidade de criar um menu para aceder a todos os recursos criados.

> Questão: O que é pretendido que aconteça?
>
>Resposta: a aplicação web a desenvolver deve ter um menu de opções que permitir aceder às várias funcionaldiades identificadas nos requisitos, ex:
>
>    gestão de campus
        adicionar edificio
        adicionar piso
        ...
    gestão de frota
        adicionar robot
        ...
    gestão e planeamento de tarefas
        obter percurso entre edificios
        ...
        análise de complexidade
    Visualização 3D
        visualização interactiva
        animação de percurso
        ...
    Administração de sistemas
        MBCO
        Estratégia de recuperaçãod e dados
        ...
    Informação
        acerca de nós
        Relatório RGPD
        Politica de privacidade
        ...
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
> Questão: Dada esta resposta, queremos perceber se existe a necessidade de separar estas opções por diferentes UIs, respetivamente, para cada tipo de user, assumindo que existe também um sistema de autenticação.
Uma vez que, em nenhum momento foi referida a necessidade de tal sistema, gostávamos de perceber se é de facto uma preocupação do cliente ou se podemos assumir que apenas com acesso à interface estariam todas as opções disponíveis.
>
> Resposta: Como indicado nos requisitos as opções estão disponievsi consoante o tipo de utilizador, pelo que será necessário a existência de um sistema de autenticação e autorização. Para este sprint podem simular tal sistema, pois ele será implementado no Sprint C.
em relação a haver diferentes UIs, deverá ser uma única aplicação cujo conteudo do menu variará de acordo com o tipo de utilizador autenticado.
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
> Questão: Podemos entender como simulação, apenas a escolha do tipo de utilizador num menu de login, sem a necessidade de introduzir credenciais de acesso? Permitindo assim o acesso às funcionalidades correspondentes à da função selecionada.
>
> Resposta: sim
> <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

### 2.2 Testes ao requisito

**Teste 1:** *...*

## 3. Desenho

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

