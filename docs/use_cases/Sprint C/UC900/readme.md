# User Story 9

## Requisitos

Como administrador da organização, quero que seja implementado de forma justificada um sistema de clustering entre os sistemas que implementam o SPA.

## Esclarecimentos do Cliente

### Desenho

#### Sistemas e Ferramentas

Os servidores utilizados têm o sistema operativo Debian, isto por serem sistemas mais leves (CLI) e com ferramentas muito mais avançadas e sofisticadas que as do Windows. Como tal, optou-se por usar o HAProxy como controlador do cluster.

#### Número de Servidores + Backup

A equipa optou por utilizar dois servidores para distribuir o trabalho e adicionou um servidor extra como backup, de forma a ser utilizado apenas se algum dos outros apresentar problemas.

#### Algoritmo de Balanceamento

O algoritmo selecionado foi o Round Robin, que vai redirecionar os pedidos, sequencialmente, para cada um dos servidores. Foi escolhido este método devido à capacidade similar de processamento dos servidores.

#### Ficheiro de Configuração HAProxy

É utilizado o URL “http://10.9.22.42:5432/haproxy?stats” para analisar estatísticas.
