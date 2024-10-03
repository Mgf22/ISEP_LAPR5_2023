# UC 920

## Requisitos

**UC920** - Como administrador de sistemas quero que para agilização entre as várias equipas seja criada uma partilha pública de ficheiros, formato SMB/CIFS  ou NFS.

## Identificação do problema

Gestão de permissões para as diferentes equipas presentes no sistema.

## Desenho

 Para a resolução deste problema foi pensado no formato SMB, visto que já existe conhecimento prévio sobre o mesmo, para atribuir diferentes permissões às equipas, com recurso também às extended libraries do Linux (ACL).
 
 Utilizaremos também a pasta pública criada no Sprint B, e efetuaremos as respetivas alterações na mesma para estar de acordo com o pedido pelo cliente.

## Implementação

### Instalação do Package ACL

Para esta instalação, tudo o que necessitamos é:

	sudo apt-get install acl
	
### Criação de grupos e utilizadores para testar funcionaldidade

São criados 3 grupos para a demonstração com os respetivos nomes:

- gestoresCampus
- gestoresFrota
- administradoresSistema

Para cada um destes grupos, vamos ter 1 utilizador de teste por grupo, por exemplo:

- gestorCampus1
- gestorFrota1
- adminSist1
	
### Alteração de passwords dos utilizadores

Agora que criamos os grupos e utilizadores, configuramos as suas passwords só para garantir o conhecimento das credenciais de acesso, para isso usamos o comando:

	smbpasswd utilizadorPretendido

### Definir lista de controlo de acesso através do Setfacl 

Agora que os utilizadores se encontram configurados, definimos as permissões para cada grupo através do setfacl para a pasta pretendida (já criada no sprint B)

	setfacl -m g:gestoresFrota:r /public
	setfacl -m g:gestoresCampus:rx /public
	setfacl -m g:administradoresSistema:rwx /public

Cada grupo tem permissões diferentes

### Executar o getfacl

Executamos este comando para verificar se as permissões foram corretamente atribuídas

	getfacl /public

### Alteração no ficheiro smb.conf

Após a instalação do package, adicionamos no final do ficheiro as seguintes configurações:

	[public]
	path = /public/
	read only = yes
	create mask = 0664
	directory mask = 0775
	valid users = @gestoresCampus @gestoresFrota @administradoresSistema
	write list = @administradoresSistema
	admin users = @administradoresSistema
	guest ok = yes

### Reiniciar o serviço

Após guardarmos as alterações do ficheiro, reiniciamos o serviço, através de:
	
	service smbd restart

### Verificar conexões à pasta partilhada

Por último, verificamos o acesso de cada utilizador e as suas resptivas permissões à pasta.