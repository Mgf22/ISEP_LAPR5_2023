# Módulo Planeamento

## Cálculo de caminho entre e por pisos

### Objetivo

Calcular caminhos de um ponto de acesso (sala, corredor ou elevador) origem para um outro destino.

### Problema

Este módulo deve integrar-se e ser capaz de comunicar com o MDGD. Deve também ser capaz de filtrar a informação apropriadamente para esta tecnologia e calcular o melhor caminho com critérios (menor número de elevadores possível, por exemplo).

### Design

#### Integração

Para integrar o Planeamento com o Backend, vai ser estabelecido um servidor que vai corrê-lo. Este módulo vai estar à escuta, no porto 5000, de pedidos do backend. Após receber pedidos, vai fazer pedidos ao Backend de dados relativos a edifícios, passagens, pisos e mapa de piso. Após receber as respostas, vai criar factos na memória principal (asserts) para depois aplicar um algoritmo de pesquisa.

#### Representação do conhecimento do domínio

Existem vários predicados que representam o conhecimento de domínio, tais como:

- edificio(DesignacaoEdificio);
- pisos(DesignacaoEdificio, ListaPisos);
- corredor(DesignacaoEdificio1, DesignacaoEdificio2, DesignacaoPiso1, DesignacaoPiso2);
- elevador(DesignacaoEdificio, ListaPisosServidos);
- node(Identificacao, Coluna, Linha, Valor, Piso);
- edge(Identificacao1, Identificacao2, Custo, Piso);
- elev_pos(Identificador, Col, Lin, Piso);
- corr_pos(Identificador, Col, Lin, Piso);
- ponto_acesso(Identificador, Col, Lin, Piso).

#### Integração da movimentação entre pisos e dentro dos pisos

Primeiramente, é executada a procura pela solução entre pisos. Esta procura sofreu uma pequena alteração e guarda todos os pisos percorridos num argumento adicional ao fornecido (base). Após esta pesquisa, vai percorrer cada piso e vai determinar o caminho de um ponto de acesso ao outro e através das designações obtém as coordenadas. 

Exemplo: Input: [A101, C208] | Output: [cor(A1, B1), elev(B1, B3), cor(B3, C2)], [[11, 12, 22, 14], [72, 64, 44, 55], []]

Neste exemplo a origem é o gabinete A101 e o destino o gabinete C208, como tal a solução entre pisos passa por 2 corredores e um elevador. A solução para cada piso vai armazenar os índices das matrizes da sala e 11 é a célula mais próxima do gabinete A101, vai percorrer até 14 que será o correro de A1 para B1, executa os passos intermédios e termina na célula mais próxima do C208.

#### Algoritmo

##### Caminho entre pisos

É utilizado um algoritmo com base no BFS que vai pesquisar por uma solução de um piso origem até a um destino. Este caminho pode, ou não, ter um critério de preferência.

##### Caminho por piso

É utilizado um algoritmo com base no A-Star que vai pesquisar de um ponto de um piso até ao outro, idealmente de um ponto de acesso até outro.

## Geração de plano de tarefas otimizado

### Propósito

O algoritmo genético está encarregue de retornar uma combinação de tarefas, especificadas por um utilizador, numa ordem específica, de forma a que não seja desperdiçado tempo desnecessário e útil. Ou seja, existindo uma especificação de tarefas para um dado robô, R1:

- T1 (vigilância corredor B1_C1) (120 segundos);
- T2 (pick and delivery sala B203 -> sala C201) (120 segundos);
- T3 (limpeza sala B203) (60 segundos).

Deverá, de forma eficiente, eficaz e rápida devolver numa ordem que o tempo seja aproveitado ao máximo.

Para este exemplo, parte-se do pressuposto que o robô encontra-se na sala B203.

Pela ordem inicial, vão ser gastos 120 (vigilância) + X (deslocação de B1_C1 para B203) + 120 (pick and delivery) + Y (deslocação de C201 para B203) + 60 (limpeza).

Nota: X e Y resultarão nos somatório das células da origem até ao destino (1 segundo para verticais e horizontais ou 1,4 para diagonais)

É notório que uma boa solução seria (e, possivelmente, uma resposta do algoritmo):

- T3;
- T2;
- T1.

Tempo desnecessário com deslocações seria evitado.

### Condições de término

Este algoritmo apresenta condições que fazem a pesquisa terminar quando:

- Nº gerações máximo atingido;
- Tempo máximo atingido;
- Establização da população é atingida (Quando a mesma população repete-se X vezes).

Consideramos ainda utilizar, ao invés da estabilização, um valor específico. Porém concluimos que seria mais eficiente na existência de uma fórmula complexa que conseguisse "prever" o que seria um bom resultado para aquelas tarefas. A solução ótima varia de uma forma enorme, consoante o input das tarefas. A estabilização do indivíduo é eficaz e mais simples.

### Cruzamento variado

O algoritmo é capaz de fazer um cruzamento variado e aleatório, ou seja, é possível que qualquer um indivíduo se cruze com qualquer outro.

### Melhor indivíduo passa sempre

O melhor indivíduo de uma geração N, vai sempre passar para a geração N+1.
