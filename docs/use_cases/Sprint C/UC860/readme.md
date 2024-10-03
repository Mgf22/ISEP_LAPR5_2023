# UC 860

## Requisitos

**UC860** - Como administrador de sistemas quero que o processo da US da cópia de segurança da DB seja mantido no log do Linux, num contexto adequado, e alertado o administrador no acesso à consola se ocorrer uma falha grave neste processo

## Identificação do problema

De que forma iremos notificar quando existir um problema grave no backup da base de dados

## Desenho

 Para a resolução deste problema iremos utilizar o script realizado para a UC840, que se trata do backup à base de dados, e iremos adicionar um script para verificar o conteúdo dos logs para efetivamente mostrar quando o administrador der login se houve alguma falha no backup.

## Implementação

### Alteração do script de backup

Para isto, adicionamos no final do ficheiro:

	# Function to log messages
		log_message() {
        local timestamp=$(date +"%Y-%m-%d %H:%M:%S")
        echo "[$timestamp] $1" >> "$LOG_FILE"
	}

	log_message "Starting MongoDB backup process for database: $DBNAME"

	# Attempt to perform the backup
		mongodump --uri="$MONGO_URI" --out="$BACKUP_FILE" && log_message "Backup successful" || {
        log_message "Backup failed."
        exit 1
	}

	log_message "MongoDB backup process completed successfully for database: $DBNAME"
	
### Criação de script checkUpdates

Agora que o script de backups foi alterado com sucesso, criamos um script para checkar por updates nos logs do backup, para isso colocamos no script:

	if grep -q "Backup failed." /root/us860_logs.log; then
    echo -e "\n\033[1;31m[ALERTA]: Ocorreu uma falha grave no ultimo processo de backup!\033[0m\n"
    sed -n '/Backup failed./,$p' /root/us860_logs.log
    echo ""
    fi