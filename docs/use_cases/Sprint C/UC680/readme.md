# UC 680

## Requisitos

Como administrador da organização quero um plano de recuperação de desastre que satisfaça o MBCO definido no sprint B.
Esclarecimentos do cliente

Questão: 

Resposta: 

## Desenho

É impossível para uma organização evitar todas as ameaças a desastres, porém é possível precaverem-se. De qualquer das formas, o futuro é incerto e qualquer empresa está sujeita a este tipo de situações. É uma excelente prática e fortemente aconselhável que exista um DRP (Disaster Recovery Plan) para haver uma agilização na recuperação e restauração após uma situação destas.

### Definição de desastre

Um desastre é qualquer tipo de evento que impeça a utilização do setor de IT durante um período de tempo. São esses eventos:

- Sistema não funcional;
- Robôs/Drones não funcionais;
- Módulo(s) do sistema não funciona(l/is).

Para que aconteçam os desastres acima mencionados, segue uma lista de eventos com a capacidade de os fazer concretizar:

- Ciberataques;
- Catástrofes ambientais;
- Erros humanos;
- Falhas de energia;
- Falhas de hardware;
- Falhas de software.

### Propósito

Este plano tem como objetivo:

- Continuar com o negócio ativo face um evento disruptivo;
- Minimizar o downtime;
- Estabelecer meios alternativos de operar em avanço;
- Minimizar o impacto das consequências negativas;
- Prevenção de perda de recursos da empresa (hardware, dados…).

### Contatos de emergência

| Primeiro Nome     | Último Nome  | Título                       | Tipo Contato | Informação Contato            |
|-------------------|--------------|------------------------------|--------------|------------------------------|
| Ricardo           | Venâncio     | Coordenador DRP              | Email        | 1210828@isep.ipp.pt          |
| Gabriel      | Silva            | Analista de Recuperação de Dados | Email      | 1210808@isep.ipp.pt          |
| João     | Rodrigues            | Network Engineering          | Email        | 1210817@isep.ipp.pt          |
| Mateus  | Fernandes            | Especialista em Segurança     | Email        | 1210821@isep.ipp.pt          |

### Direcionamento

Este plano dirige-se às seguintes áreas tecnológicas:

- Infraestrutura de rede;
- Servidores da infraestrutura;
- Capacidade de armazenamento e sistemas de backup;
- Sistemas de base de dados.

### Backup e Dados

A próxima tabela vai demonstrar onde é que os dados do sistema RobDroneGo são persistidos também o onde estão as cópias de segurança. É relevante utilizar esta informação para localizar e restaurar dados numa situação desastrosa.

### Dados por ordem de criticidade

| Rank | Informação                    | Tipo de dado      | Freq. Cópia de segurança | Local. Cópia de segurança         |
|------|-------------------------------|-------------------|--------------------------|------------------------------------|
| 1    | Dados de alunos/docentes      | Dados pessoais    | Diária                    | vs510.dei.isep.ipp.pt (Cloud do DEI) |
| 2    | Informação do campus           | Dados do sistema  | 3 em 3 dias               | vs510.dei.isep.ipp.pt (Cloud do DEI) |

### APIs por ordem de importância

| Rank | Nome da API                             | Descrição                           |
|------|------------------------------------------|-------------------------------------|
| 1    | Master Data Gestão de Dispositivos API   | Gestão de dados de dispositivos     |
| 1    | Master Data Gestão de Tarefas API        | Gestão de dados de tarefas          |
| 1    | Frontend API                             | Interface do utilizador             |
| 2    | Planeamento API                          | Planeamento                         |
| 3    | Visualização 3D API                      | Visualização de gráficos 3D        |


### Plano de testes e Manutenção

É extremamente difícil apontar todos os problemas a uma organização, já que se encontra constantemente em atualizações e adaptações. À medida que a empresa vai mudando, o DRP deve ser atualizado.
Este plano deverá ser atualizado com uma frequência de um mês ou sempre que haja uma grande atualização ou upgrade de um sistema.
Para que a manutenção seja eficaz é necessário assegurar que:

- todas as equipas estão atualizadas;
- as instruções do plano ainda têm nexo para empresa;
- o plano está de acordo a lei.

Através de testes ao plano, vai ser possível verificar se é realmente funcional ou não. Os testes que devem ser executados para garantir eficácia são:

- membros da equipa experimentarem seguir o DRP e tentarem descobrir erros, falta de informação, bottlenecks e outras fraquezas;
- de forma isolada, colocar servidores e sistemas online para verificar que todos os sistemas de operação estão a correr como esperado e sem quaisquer problemas.
