# Política de Backups

## Objetivo

Criar e implementar uma política de backups para o projeto e respetiva base de dados.

## Problema

Para prevenir a perda de dados cruciais, seja funcionalidades do programa, ou dados que ele consome, é crucial efetuar uma política de Backups, que permita numa situação de emergência, a recuperação total ou parcial dos dados que foram perdidos, apagados ou alterados de forma inesperada.

Para escolher a melhor Política de Backups, foi analisado o documento onde é feito o estudo do WRT (Work Recovery Time) e do RPO (Recovery Point Objective), onde se chegou à conclusão que a frequência de backups deveria de ser de 3 em 3 dias para garantir o RPO estudado e escolhido.

Tendo esta informação em conta, foram então analisadas as possibilidades de backups que poderiam ser feitas : total, incremental ou diferencial e concluiu-se que no dado momento (SPRINT B) a informação que é armazenada e a quantidade de alterações feitas diariamente não justificavam a necessidade de ser feito um backup incremental ou diferencial. O projeto tem na sua grande maioria, dados estáticos e não tem qualquer automatização que implique que certos dados estejam disponíveis para ser executada, ou seja, qualquer ação feita no programa, será feita após um input de um utilizador e não triggered automaticamente.

Caso se justifique no SPRINT C, podem ser sempre acrescentadas novas políticas de backup que se adequem às novas funcionalidades ou dados armazenados. Isto significa um novo estudo, porque a implementação de backups diferenciais ou incrementais, implicavam um maior cuidado com a cronologia de backups, uma vez que ambos dependem do backup total para guardarem a informação correta.

Backup incremental
Um backup incremental é um tipo de cópia de segurança que registra apenas as alterações efetuadas nos dados desde o último backup realizado. Por exemplo, se um backup completo foi feito no domingo, o backup incremental feito na segunda-feira incluiria apenas as mudanças feitas desde esse backup de domingo. Na terça-feira, o backup incremental conteria apenas as modificações ocorridas desde o backup realizado na segunda-feira. Esse método de backup economiza espaço de armazenamento ao capturar apenas as alterações mais recentes nos dados, em vez de duplicar todo o conjunto de informações a cada backup.

Backup diferencial
Uma estratégia de backup diferencial registra apenas os dados novos e alterados desde o último backup completo. Se o último backup completo foi feito no domingo, um backup diferencial realizado na segunda-feira conteria todas as modificações desde o domingo. Da mesma forma, um backup feito na terça-feira também incluiria todas as alterações desde o último backup completo, realizado no domingo. Conforme novos backups diferenciais são feitos, o tamanho do arquivo de backup aumenta progressivamente até que seja realizado um novo backup completo.

## Resolução do Problema

Para resolver este problema, foi necessário utilizar o scp para fazer uma cópia do projeto da máquina local e envia-la para uma máquina remota. Utilizou-se também o mongodump, mas para fazer o backup da base de dados, na maquina remota. Depois foram feitos 2 scripts, um para cada um destes comandos, que os executavam, dando-lhes os dados necessários para fazer a comunicação entre máquinas e adicionado ao crontab uma regra para executar o script de 3 em 3 dias, às 2 da manhã.

### Backup do Projeto

Inicialmente, tem de ser feita a conexão das duas máquinas, e partilhar uma key entre elas, para que ao correr o script não seja exigido o login ao utilizador, mas este ser feito automaticamente. Para isto, executa-se o seguinte comando `ssh-keygen -t rsa -b 2048`, que irá gerar uma key, que terá de ser partilhada com a máquina remota através do comando `ssh-copy-id -i /path/to/private_key root@vs510.dei.isep.ipp.pt`. É também criado um ficheiro para logs, que conterá os registos e possíveis erros da execução do script, através do comando `touch ~/backup_logs.log`. Após isto, o script já pode fazer a conexão entre as duas maquinas sem necessitar de login, porque elas partilham uma key e já poderá também guardar as informações acerca da execução do script num ficheiro de logs. O script terá o seguinte formato:

##

#!/bin/bash

Caminho do ficheiro de logs
LOG_FILE="/root/backup_logs.log"

Caminho da pasta onde se encontra o projeto na máquina local
SOURCE_DIR="/root/RobDroneGo"

Caminho da pasta onde se quer armazenar o backup na máquina remota
REMOTE_USER="root"
REMOTE_HOST="vs510.dei.isep.ipp.pt"
REMOTE_DIR="/root/RobDroneGo"

Mensagem de informação de execução do script (sem ainda ter iniciado o processo de transferência)
echo "Transferring files..."

Comando scp com uso de keys SSH para um login sem password, com o output redirecionado para um ficheiro de logs
{
echo "===== Start of File Transfer ====="
date +"%Y-%m-%d %H:%M:%S"
scp -r -o "BatchMode yes" -i /root/backup_key "$SOURCE_DIR" "$REMOTE_USER"@"$REMOTE_HOST":"$REMOTE_DIR"
echo "===== End of File Transfer ====="
date +"%Y-%m-%d %H:%M:%S"
} >>"\$LOG_FILE" 2>&1

Verifica o status de término do comando scp e coloca a mensagem correspondente no ficheiro de logs
if [ $? -eq 0 ]; then
echo "Files transferred successfully." >>"$LOG_FILE"
else
    echo "Error transferring files." >>"$LOG_FILE"
fi

##

Deve-se testar o script, executando-o, para garantir que a conexão entre as duas máquinas é feita e o backup é feito corretamente antes de adicionar uma nova regra no crontab. Caso seja positivo, acrescenta-se finalmente ao ficheiro de configuração do crontab uma nova regra de execução do script.

Finalmente, deve-se acrescentar a regra ao ficheiro de configuração do crontab, através do comando `crontab -e`, que abrirá o ficheiro ao qual teremos de adicionar a seguinte regra : `0 2 * * * /root/backup_script.sh >> /root/backup_logs.log 2>&1`. 
##

### Backup da Base de Dados
Para o backup de base de dados, é necessário instalar o MongoDB Database Tools, e correr o comando `mongodump`. Igualmente, como no backup do projeto, cria-se um script e um ficheiro de logs e adiciona-se uma regra ao crontab. O script terá a seguinte estrutura:

#!/bin/bash

 MongoDB URI for authentication and connection
MONGO_URI="mongodb://mongoadmin:aed0452dba3a82201f874542@vsgate-s1.dei.isep.ipp.pt:10242/"

 Output directory for MongoDB dump
BACKUP_DIR="/path/to/backup/directory"

 Log file to record backup status
LOG_FILE="/path/to/backup.log"

 Ensure the backup directory exists; create if not
mkdir -p "$BACKUP_DIR"

 Run mongodump with the specified URI and log the output
if mongodump --uri "$MONGO_URI" --out "$BACKUP_DIR" >> "$LOG_FILE" 2>&1; then
    echo "$(date): MongoDB backup successful" >> "$LOG_FILE"
else
    echo "$(date): MongoDB backup failed" >> "$LOG_FILE"
fi

Finalmente, deve-se acrescentar a regra ao ficheiro de configuração do crontab, através do comando `crontab -e`, que abrirá o ficheiro ao qual teremos de adicionar a seguinte regra : `0 2 * * * /root/mongo_backup_total.sh >> /root/backup_logs.log 2>&1`. 
##