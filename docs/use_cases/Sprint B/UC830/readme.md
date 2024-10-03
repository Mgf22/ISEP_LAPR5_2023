# User Story 830

## Descrição

Como administrador do sistema quero obter os utilizadores com mais do que 3 acessos incorretos

## Identificação do problema

Identificar os utilizadores com mais do que 3 acessos incorretos.

## Resolução do problema

Para resolver este problema, vai recorrer-se ao ficheiro de logs `/var/log/auth.log` para identificar os utilizadores cujo login foi falhado mais do que 3 vezes.

### Instalação do módulo

Primeiro necessitamos de instalar o módulo que vai guardar nos ficheiros ".log" a informação de logins incorretos. Para isso necessitamos de correr o seguinte comando:

``$ sudo apt -y install -y rsyslog``

Após executar o comando, é necessário reiniciar a máquina para serem criados os ficheiros de logs, nos respetivos locais.

### Ficheiro auth.log

Dentro deste ficheiro estão localizadas todos os logins válidos ou tentivas falhadas, que poderão ser filtradas posteriormente através de um comando, para serem mostrados os utilizadores com mais do que 3 tentativas falhadas no seu login.

#### Comando de Filtragem de Utilizadores

Podemos utilizar o comando grep `"Failed password" /var/log/auth.log | awk '{print $(NF-5)}' | sort | uniq -c | awk '$1 > 3 {print $2}'` que irá filtrar os utilizadores com mais de 3 tentativas falhadas a fazer login. Todos os outros serão ignorados.