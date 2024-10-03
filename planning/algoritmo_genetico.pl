:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic prob_pior_individuo/1.
:-dynamic tempo_maximo/1.
:-dynamic estabilizacao_solucao/1.
:-dynamic inicio/1.
:-dynamic fim/1.
:-dynamic melhor_solucao_atual/2.
:-dynamic tarefa/4.
:-dynamic tarefa2/3.


% Tarefa Robo
tarefa_robo(t1).

inicializa:-%write('Numero de novas Geracoes: '),read(NG),
	(retract(geracoes(_));true), asserta(geracoes(NG)),

	%write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),

	%write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),

	%write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),

	%write('Prob. pior indiviuo gerar (%):'),read(PPI2),
	PPI is PPI2/100,
	(retract(prob_pior_individuo(_));true), asserta(prob_pior_individuo(PPI)),

	%write('Tempo maximo de calculo (segundos):'),read(TMC2),
	TMC is TMC2 * 10,

	%write('Estabilizacao da solucao (n):'),read(ES),
	(retract(estabilizacao_solucao(_));true), asserta(estabilizacao_solucao(ES)),

	% Colocado propositadamente aqui para nao comecar a contar antes do suposto.
	(retract(tempo_maximo(_));true), asserta(tempo_maximo(TMC)).

inicializa_aut:-

	% Condicao de paragem: Nº de geracoes.
	NG = 100,
	(retract(geracoes(_));true), asserta(geracoes(NG)),

	% Populacao. Nº de indíviduos por geracao.
	DP = 5,
	(retract(populacao(_));true), asserta(populacao(DP)),

	% Percentagem de cruzamento.
	P1 is 70,
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),

	% Percentagem de mutacao.
	P2 is 5,
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),

	% Percentagem de pior indivíduo gerar.
	PPI2 is 10,
	PPI is PPI2/100,
	(retract(prob_pior_individuo(_));true), asserta(prob_pior_individuo(PPI)),

	% Condicao de paragem: Tempo.
	TMC2 is 5,
	TMC is TMC2 * 10,

	% Condicao de paragem: Estabilizacao do melhor indivíduo.
	ES is 75,
	(retract(estabilizacao_solucao(_));true), asserta(estabilizacao_solucao(ES)),

	(retract(tempo_maximo(_));true), asserta(tempo_maximo(TMC)).

gera_aut:-
	(retract(inicio(_));true),
	(retract(fim(_));true),
	get_time(V),
	asserta(inicio(V)),
	inicializa_aut,
	gera_populacao(Pop),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	PopOrd = [FS|_],
	gera_geracao(0,NG,PopOrd,[FS,FS,0]).

gera:-
	(retract(inicio(_));true),
	(retract(fim(_));true),
	get_time(V),
	asserta(inicio(V)),
	inicializa,
	gera_populacao(Pop),
	%write('Pop='),write(Pop),nl,
	%trace,
	avalia_populacao(Pop,PopAv),
	%write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	PopOrd = [FS|_],
	gera_geracao(0,NG,PopOrd,[FS,FS,0]).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa2(Tarefa,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	Seq = [PT|T],
	avalia(T,PT,V).

avalia([],_,0).
avalia([Tarefa|Resto],TarefaAnt,V):-
	tarefa2(Tarefa, _, _),
	avalia(Resto,Tarefa,VResto),

	tempo_caminho(TarefaAnt, Tarefa, Tempo),
	V is Tempo+VResto.

ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


% Numero de geracoes maximo atingido.
gera_geracao(G,G,Pop,_):-!,
	%write('Geracao '), write(G), write(':'), nl, write(Pop), nl,
	Pop = [Lista*Tempo|_],
	(retractall(bto(_,_)),!;true),
	asserta(bto(Lista, Tempo)).
	%write('Numero de geracoes maximo atingido!').
	
% Numero de estabilizacao maximo atingido.
gera_geracao(N,_,Pop,[_,_,X]):-
	estabilizacao_solucao(X),
	!,
	%write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	Pop = [Lista*Tempo|_],
	(retractall(bto(_,_)),!;true),
	asserta(bto(Lista, Tempo)).
	%write('Estabilizacao maxima atingida!').
	% asserta(melhor_individuo()).

% Tempo maximo atingido. TODO: Consertar os segundos a mais que isto roda.
gera_geracao(N,_,Pop,_):-
	get_time(Tempo),
	verifica_tempo(Tempo),
	!,
	%write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	Pop = [Lista*Tempo|_],
	(retractall(bto(_,_)),!;true),
	asserta(bto(Lista, Tempo)).
	%write('Tempo maximo atingido!').
	% asserta(melhor_individuo()).

gera_geracao(N,G,Pop,[SolAct,SolAct,X]):-
	X2 is X+1,
	gera_geracao2(N,G,Pop,[SolAct,SolAct,X2]).

gera_geracao(N,G,Pop,[SolAnt,SolAct,_]):-
	gera_geracao2(N,G,Pop,[SolAnt,SolAct,1]).

gera_geracao2(N, G, Pop, [_, SolAct, X]):-
	%trace,
	%write('Geracao '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1,1),
	NPop1 = [NSol|_],
	mutacao(NPop1,NPop,1),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	N1 is N+1,
	gera_geracao(N1,G,NPopOrd,[SolAct, NSol, X]).

verifica_tempo(TempoAct):-
	inicio(Ini),
	tempo_maximo(Max),
	TempoAct - Ini >= Max.

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).

gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

% Passar sempre o melhor indivíduo + fazer cruzamentos aleatórios e nao sucessivos (1º com 2º, 3º com 4º...)
cruzamento([],[],_).

%cruzamento([Ind*_],[Ind],_).

% Predicado intermédio que vai garantir que:
%  1 - O melhor indíviduo é passado para a próxima geracao;
%  2 - Nao sao cruzados pares consecutivos (1º e 2º, 3º e 4º...).
% Como?
%  1 - Se se tratar do primeiro índice, ou seja, indivíduo com melhor prestacao, vai ser diretamente passado para a próxima geracao;
%  2 - É feito um shuffle à lista (excepto o melhor indivíduo).
cruzamento([Ind1*_|Resto], [Ind1|Resto1], 1):-
	!,
	random_permutation(Resto, RestoBaralhado),
	cruzamento(RestoBaralhado, Resto1, 2).

cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1],Index):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	Index2 is Index+1,
	cruzamento(Resto,Resto1,Index2).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[],_).

mutacao([Ind1|Rest],[Ind1|Rest1], 1):-
	!,
	mutacao(Rest, Rest1, 2).

mutacao([Ind|Rest],[NInd|Rest1], V):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	V2 is V+1,
	mutacao(Rest,Rest1,V2).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).



