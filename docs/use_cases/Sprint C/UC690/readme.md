# User Story 2

## Requisitos
Como administrador da organização quero que me seja apresentada de forma justificada a ou as alterações a realizar na infraestrutura por forma a assegurar um MTD (Maximum Tolerable Downtime) de 20 minutos.

## Esclarecimentos do cliente

Questão: 

Resposta: 

## Desenho

É importante que qualquer organização estude qual é o seu MTD, para que as perdas que possa vir a ter sejam minimizadas ou até mesmo nulas. Para isso, é importante perceber o que é o MTD antes de apresentar formas como a empresa ou organização consiga repor os seus serviços ou protegê-los antes do tempo máximo ser esgotado e isso lhe traga prejuízos.

## Solução

O MTD (Maximum Tolerable Downtime) é o período durante o qual uma empresa ou organização, pode ficar sem acesso a um sistema ou serviço critico antes que isso cause danos à operação da mesma. Para além disso o MTD, é um parâmetro importante, quando se fala em implementação de medidas de proteção e tolerância a falhas, como sistemas altamente disponíveis e backups, sendo por isso um indicador do investimento necessário a ser feito pela organização.
Para se poder garantir um MTD de 20 minutos, é preciso implementar medidas de proteção e tolerância a falhas, em todas as camadas da infraestrutura da organização.
Como é possível verificar na figura acima apresentada, o MTD é a soma entre o tempo de recuperação dos sistemas (RPO) e os testes de funcionamento e integridade destes mesmos (WRT), que já foram explorados e abordados anteriormente. O MTD, varia de acordo com as necessidades e prioridades da organização, e pode até variar entre departamentos e sistemas utilizados pela organização, o que significa que dentro da própria empresa, poderão existir diferentes MTD’s para cada operação.

Para se escolher um MTD, deverão ser seguidos alguns passos como por exemplo:
•	Avaliação de impacto nos negócios;

•	Identificação de ativos críticos;

•	Conversas com partes interessadas (Executivos, Departamentos, Equipas de Operações, …);

•	Identificar regulamentações e requisitos do setor;

•	Avaliar custos;

•	Identificar risco toleráveis;

•	Considerações estratégicas;

•	Executar testes e simulações.

Para ser possível garantir um MTD tão baixo exige altos custos, e investimento em tecnologias e soluções como as seguintes:
•	Investimento em infraestrutura redundante;

•	Tecnologias e soluções de backups avançadas;

•	Atualizações e manutenção constantes;

•	Monitorização e gerenciamento proativo;

•	Treinamento e capacitação da equipa;

•	Alocação de tempo e recursos para planeamento e testes;

•	Contratos de suporte e serviços especializados.

No caso, para a nossa infraestrutura, destas soluções, as que se deveriam adotar para conseguir um MTD de 20 minutos seriam:
•	Utilizar sistemas de backup e recuperação de desastres e anomalias, garantindo a proteção de dados críticos (informação da base de dados e a aplicação em si) e possibilitando a rápida recuperação em caso de falha;

•	Implementar sistemas altamente disponíveis, como clusters que permitem com o que o sistema continue a funcionar, em caso de falha, ao redirecionar para outro servidor/máquina a tarefa ou tarefas que o equipamento que falhou estaria a executar;

•	Realizar e produzir novos testes de failover, para garantir que os sistemas de backup funcionam corretamente e que caso haja necessidade de transição para estes sistemas, esta seja feita sem imprevistos e de forma suave;

•	Formar a equipa para proteger os sistemas de falhas humanas;

•	Manter os softwares atualizados, para prevenir falhas de segurança e do próprio software;

•	Praticar políticas que obriguem a atualização regular dos equipamentos e softwares, que contenham correções de falhas e melhorias para minimizar a probabilidade de falhas.
