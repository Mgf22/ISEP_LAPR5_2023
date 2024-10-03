# User Story 10

## Requisitos

Como administrador de sistemas, quero que o administrador tenha acesso SSH à máquina virtual apenas por certificado, sem recurso a senha.

## Esclarecimentos do Cliente

**Questão:**

**Resposta:**

## Desenho

Para solucionar este requisito, foi necessário recorrer a um comando que executa um algoritmo de cifragem. Segue agora uma lista de passos da resolução deste problema.

1. Na máquina do administrador, gerar um par de chave pública e privada com o comando: `ssh-keygen -t rsa` e definir a palavra-passe para a utilização deste certificado (que no caso é "uc10");
   
2. Como foi especificado um diretório personalizado, vai ser necessário alterar as permissões (apenas para root) destes ficheiros por motivos de segurança, através dos comandos:
    - `sudo chown root:root ~/openssh_keys/key`;
    - `sudo chown root:root ~/openssh_keys/key.pub`;
    - `sudo chmod 700 ~/openssh_keys/key`;
    - `sudo chmod 700 ~/openssh_keys/key.pub`.

3. No diretório `.ssh/`, existe um ficheiro designado por `authorized_keys` (contém todas as keys com permissão para fazer SSH através de um certificado). Deve ser colocada a chave pública gerada pela máquina do administrador;

4. Como neste caso foi optado por guardar as chaves geradas num diretório personalizado, é necessário especificar o caminho para a chave privada ao executar o comando `ssh` e utilizar a flag de "ficheiro de identidade", ou seja:
   - `sudo ssh -i ~/openssh_key/key root@vs857.dei.isep.ipp.pt`
   
   Finalmente, insere-se a palavra-passe definida e mencionada no 1º passo. Nota: Esta palavra-passe é opcional na geração da chave, porém é fortemente aconselhada por motivos de segurança.
