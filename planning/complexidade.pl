:-dynamic node/3. % node(ID, Col, Lin)
:-dynamic edge/3. % edge(ID1, ID2, Custo)
:-dynamic nlin/1. % nlin(num_linhas)

:-set_prolog_flag(answer_write_options,[max_depth(0)]).

cria_matriz:-
    retractall(node(_,_,_)),
    retractall(edge(_,_,_)),
    write('Numero de Colunas: '),read(NCol),nl,
    write('Numero de Linhas: '),read(NLin),nl,asserta(nlin(NLin)),
    cria_matriz_0(NCol,NLin,0),cria_grafo(NCol,NLin),retract(nlin(_)).

cria_matriz_0(1,1,I):-!,asserta(node(I,1,1)).

cria_matriz_0(NCol,1,I):-!,asserta(node(I,NCol,1)),I2 is I+1,NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin,I2).

cria_matriz_0(NCol,NLin,I):-asserta(node(I,NCol,NLin)),NLin1 is NLin-1,I2 is I+1,cria_matriz_0(NCol,NLin1,I2).

cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-
  cria_grafo_lin(Col,Lin),
  Lin1 is Lin-1,
  cria_grafo(Col,Lin1).


cria_grafo_lin(0,_):-!.

cria_grafo_lin(Col,Lin):-
  node(Id1,Col,Lin),
  !,
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  ((node(Id2,ColS,Lin), assertz(edge(Id1, Id2, 1));true)), % Verifca à direita.
  ((node(Id3,ColA,Lin), assertz(edge(Id1, Id3, 1));true)), % Verifca à esquerda.
  ((node(Id4,Col,LinS), assertz(edge(Id1, Id4, 1));true)), % Verifica abaixo.
  ((node(Id5,Col,LinA), assertz(edge(Id1, Id5, 1));true)), % Verifica acima.
  C is sqrt(2),
  ((node(Id6,ColS,LinA), assertz(edge(Id1, Id6, C));true)), % Verifica diagonal superior direita.
  ((node(Id7,ColA,LinA), assertz(edge(Id1, Id7, C));true)), % Verifica diagonal superior esquerda.
  ((node(Id8,ColS,LinS), assertz(edge(Id1, Id8, C));true)), % Verifica diagonal inferior direita.
  ((node(Id9,ColA,LinS), assertz(edge(Id1, Id9, C));true)), % Verifica diagonal inferior esquerda.
  
  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin),!.

cria_grafo_lin(Col,Lin):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin).


dfs(Orig,Dest,Cam,Custo,TSol):-
    get_time(Ti),
    dfs2(Orig,Dest,[Orig],Cam,Custo2),Custo is Custo2,
    get_time(Tf),
    TSol is Tf-Ti.

dfs2(Dest,Dest,LA,Cam,0):-
    reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam,Custo):-edge(Act,X, CustoA),\+ member(X,LA),
    dfs2(X,Dest,[X|LA],Cam,Custo2),Custo is CustoA + Custo2.

all_dfs(Orig,Dest,LCam,Custo,Tempo):-findall(Cam,dfs(Orig,Dest,Cam,Custo,Tempo),LCam).

melhor_dfs(Orig, Dest, Best, Custo, TSol):-
 get_time(Ti),
 all_dfs(Orig, Dest, [H|T], _, _),
 get_best(T, H, LCam, Best), 
 get_custo(Best, Custo),
 get_time(Tf), 
 TSol is Tf-Ti.

get_best([], MCA2, MCA2, MCA2):-!.

get_best([H|T], MelhorCamAtual, Melhor, A):-
    get_best2(H, MelhorCamAtual, Melhor),
    get_best(T, Melhor, MelhorCamFinal, A).

get_best2(C1, C2, MelhorCamAtual):-
    get_custo(C1, Custo1),
    get_custo(C2, Custo2),
    (Custo1 > Custo2, append(C2, [], MelhorCamAtual),!)
    ;
    (append(C1, [], MelhorCamAtual)).

get_custo([_|[]], 0):-!.

get_custo([N1, N2|T], Custo):-
    edge(N1, N2, C),
    get_custo([N2|T], Custo2),
    Custo is C + Custo2.


% BFS
bfs(Orig,Dest,Cam,Custo,TSol):-
    get_time(Ti),
    bfs2(Dest,[[Orig]],Cam,Custo),
    get_time(Tf),
    TSol is Tf-Ti.

bfs2(Dest,[[Dest|T]|_],Cam,Custo):-
    reverse([Dest|T],Cam),
    length(Cam, Custo).

bfs2(Dest,[LA|Outros],Cam,Custo):-
    LA=[Act|_],
    findall([X|LA],
    (Dest\==Act,edge(Act,X,_),\+ member(X,LA)),
    Novos),
    append(Outros,Novos,Todos),
    bfs2(Dest,Todos,Cam,Custo).


% A-star.
aStar(Orig,Dest,Cam,Custo,TSol):-
    get_time(Ti),
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo),
    get_time(Tf),
    TSol is Tf-Ti.

% Se for preciso apenas o melhor caminho, colocar cut a seguir ao reverse.
aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
	reverse([Dest|T],Cam),!.

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,edge(Act,X,CustoX),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo).

% substituir a chamada edge(Act,X,CustoX)
% por (edge(Act,X,CustoX);edge(X,Act,CustoX))
% se quiser ligacoes bidirecionais


estimativa(Nodo1,Nodo2,Estimativa):-
	node(Nodo1,X1,Y1),
	node(Nodo2,X2,Y2),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).
