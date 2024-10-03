# UC 500

## 1. Requisitos

**UC612** - Exibir uma tip flutuante que identifique a sala, gabinete ou elevador a que pertence a célula apontada em cada momento pelo cursor do rato.

## 2. Análise

### 2.1 Identificação do problema

Para identificar um ponto de acesso (sala/gabinete ou elevador) deverá existir alguma etiqueta intuitiva e sugestiva.

**Respostas do cliente:**

> Pergunta: Nesta US o pretendido é que apareça a tip flutuante quando o utilizador aponta o cursor do rato para o chão ou é quando este aponta o cursor do rato para a porta que dá acesso à sala, gabinete ou elevador? Além disso, queria saber se é necessário mostrar várias câmaras ao mesmo tempo e se é utilizado o mesmo método em qualquer câmara para exibir a tip flutuante.
>
> Resposta: a tooltip deve ser mostrada quando o cursor do rato aponta para a porta da sala/elevador. a tooltip deve aparecer no viewport ativo (mas não há problema se aparecer em todos os viewports em simultaneo). se mostrarem a tooltip em mais que um viewport, devem usar o mesmo método em todos

## 3. Desenho

Para a realização deste requisito, a equipa decidiu que seria retirada a informação a partir dos mapas dos pisos, que armazenam a posição (X,Y) dos pontos de acesso. Como tal, a tooltip será gerada nessa posição com a respetiva desginação.

