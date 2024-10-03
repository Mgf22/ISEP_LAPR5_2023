% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- [algoritmo_genetico].

:-dynamic edificio/1. % edificio(A), edificio(B)...
:-dynamic pisos/2. % pisos(A, [A1, A2, A3])...
:-dynamic corredor/5. % corredor(Designacao, A, B, A1, B2)...
:-dynamic elevador/2. % elevador(A, [A1, A2, A3])...
:-dynamic m/4. % m(col, lin, valor, piso) => m(0, 0, 0, A1)...
:-dynamic ligacel/3. % ligacel(cel1, cel2, piso) => ligacel(cel(1,3), cel(2,3), A1)...
:-dynamic cel/2. % cel(x, y) => cel(0, 3)...
:-dynamic liga/2. % liga(EdificioA, EdificioB)...
:-dynamic node/5. % node(Id, Col, Lin, Valor, Piso)...
:-dynamic edge/4. % edge(Id1, Id2, Custo, Piso)...
:-dynamic elev_pos/4. % elev_pos(Identificador, Col, Lin, Piso)...
:-dynamic corr_pos/4. % corr_pos(Identificador, Col, Lin, Piso)...
:-dynamic ponto_acesso/4. % ponto_acesso(Identificador, Col, Lin, Piso)...

:-dynamic tempo_caminho/3. % tempo_caminho(Tarefa1, Tarefa2, Tempo)...

:-dynamic tarefas/1. % tarefas(5)... => nº de tarefas a gerar o plano.

:-dynamic bto/2. % bto([T3, T1, T2], 30.2391)... => tem a melhor ordem e o respetivo tempo.
:-dynamic btoPath/2.
:-dynamic ttpl/4.

:-set_prolog_flag(answer_write_options,[max_depth(0)]).
:-set_prolog_flag(report_error,true).
:-set_prolog_flag(unknown,error). 

% Relação entre pedidos HTTP e predicados que os processam
:- http_handler('/path_between_floors', path_between_floors, []).
:- http_handler('/best_task_order', best_task_order, []).
:- http_handler('/full_path', full_path, []).

% Criação de servidor HTTP no porto 'Port'					
server(Port) :-						
  http_server(http_dispatch, [port(Port)]).

% Interromper servidor HTTP.
int_server(Port):-
  http_stop_server(Port, _).

stringify([], []).
stringify([Head|Tail], [QuotedHead|QuotedTail]) :-
    quote_items(Head, QuotedHead),
    stringify(Tail, QuotedTail).

quote_items([], []).
quote_items([Item|Rest], [QuotedItem|QuotedRest]) :-
    format(atom(QuotedItem), '"~w"', [Item]),
    quote_items(Rest, QuotedRest).

obtem_caminhos:-
  bto(Ts, _),
  %Ts = [_, S|_],
  obtem_caminhos2(Ts, L1, L2),
  asserta(btoPath(L1, L2)).

obtem_caminhos2([H1, H2|T], [HH|TT], [HH2|TT2]):-
  ttpl(H1, H2, A, B),
  HH = A,
  HH2 = B,
  obtem_caminhos2([H2|T], TT, TT2).

obtem_caminhos2([_|_], [], []).

converte_cams([], []):-!.

converte_cams([H|T], [HH|TT]):-
  converte_cam_final(H, HH),
  converte_cams(T, TT).

full_path(Request):-

  cors_enable(Request, [methods([get])]),
  
  %gtrace,
  % Percorre cada tarefa, calcula o caminho e intercala com os caminhos entre tarefas.
  findall(tarefa2(A,B,C), tarefa2(A,B,C), L),

  calcula_caminho_inteiro(L, R1, Resultado2, 0),

  converte_cams(R1, Resultado1),

  R = json([camEntrePisos=Resultado1, camPorPisos=Resultado2]),

  prolog_to_json(R, JSONObject),
  reply_json(JSONObject, [json_object(dict)]).


calcula_caminho_inteiro([], [], [], _):-!.

calcula_caminho_inteiro([H1|T1], [H2|T2], [H3|T3], 0):-!,
  H1 = tarefa2(_, Origem, Destino),
  ponto_acesso(Origem, ColO, LinO, PisoO),
  ponto_acesso(Destino, ColD, LinD, PisoD),

  melhor_caminho_pisos(PisoO, PisoD, Cam, PisosPer),

  node(X1, ColO, LinO, _, PisoO), 
  edge(X1, X, _, PisoO),

  node(Y1, ColD, LinD, _, PisoD), 
  edge(Y1, Y, _, PisoD),

  aStar_piso(PisosPer, LC, Cam, X, Y, _),
  eliminate_redundant(LC, LCam),
  H2 = Cam,
  H3 = LC,
  calcula_caminho_inteiro(T1, T2, T3, 1).

calcula_caminho_inteiro([H1|T1], [H2|T2], [H3|T3], 1):-!,
  H1 = tarefa2(Tarefa, _, _),
  ttpl(Tarefa, _, H2, H3),
  calcula_caminho_inteiro(T1, T2, T3, 0).



%obtem_caminhos2([H1|T], Ant, [HH|TT]):-
%  ttpl(H1, Ant, A, B),
%  HH = [A, B].

% Predicado que recebe pedidos HTTP para gerar o plano de execução das tarefas.
best_task_order(Request):-

  cors_enable(Request, [methods([get])]),
  http_parameters(Request, [tarefas(T, [])]),
  term_to_atom(Tarefas, T),
  
  request_dados(),

  cria_tarefas(Tarefas),

  calculo(Tarefas, Tarefas, 1, Caminhos),

  gera_aut,

  %gtrace,
  obtem_caminhos,
  
  bto(Seq, Tempo),
  btoPath(CEP, CamPorPiso),

  converte_cams(CEP, CamEntrePiso),
  
  R = json([plano=Seq, tempo=Tempo, caminhoPorPiso=CamPorPiso, caminhoEntrePisos=CamEntrePiso]),

  prolog_to_json(R, JSONObject),
  reply_json(JSONObject, [json_object(dict)]).


% % %
% Faz assert do predicado:
%   1 - tarefas/1, que contém o nº de tarefas.
%   2 - tarefa2/3, que contém a designação da tarefa, ponto de acesso origem e ponto de acesso destino.
%
% Recebe como parâmetro a lista de tarefas.
% Nota: Na ocasião de ser uma tarefa de vigilância, o destino é igual à origem.
% % %
cria_tarefas(L):-
  remove_tarefas,
  length(L, Len),
  asserta(tarefas(Len)),
  cria_tarefas2(L).

cria_tarefas2([]):-!.

cria_tarefas2([H|T]):-
  H = [Tarefa, Origem, Destino],
  asserta(tarefa2(Tarefa, Origem, Destino)),
  cria_tarefas2(T).

remove_tarefas:-
  (retractall(tarefas(_)),!;true),
  (retractall(tarefa(_,_,_,_)),!;true),
  (retractall(tarefa2(_,_,_)),!;true),
  (retractall(ttpl(_, _, _, _)),!;true),
  (retractall(btoPath(_,_)),!;true),
  (retractall(tempo_caminho(_,_,_)),!;true).


% % %
% Determina quais os caminhos que tem que calcular (origem e destino) e invoca o predicado feito no sprint passado para os calcular. Faz assert dos factos tempo_caminho/3, onde tem 
% Recebe como parâmetro a lista de tarefas, a mesma lista de tarefas e um 1.
% % %

calculo([], _, _, []):-!.

calculo([H|T], Intacta, IndexAct, [H2|T2]):-
  calculo2(H, Intacta, IndexAct, 1, H2),
  Next is IndexAct + 1,
  calculo(T, Intacta, Next, T2).

calculo2(_, [], _, _, []):-!.

calculo2(TarefaAtual, [_|T], Atual, Atual, L):-
  !,
  Next is Atual+1,
  calculo2(TarefaAtual, T, Atual, Next, L).

calculo2(Tarefa, [[TDest, _, Destino]|T], Atual, Ind, [H2|T2]):-

  Tarefa = [TOrig, Origem, _],

  %trace,
  (ponto_acesso(Origem, ColO, LinO, PisoO),!;elev_pos(Origem, ColO, LinO, PisoO),!;corr_pos(Origem, ColO, LinO, PisoO)),
  (ponto_acesso(Destino, ColD, LinD, PisoD),!;elev_pos(Destino, ColD, LinD, PisoD),!;corr_pos(Destino, ColD, LinD, PisoD)),

  melhor_caminho_pisos(PisoO, PisoD, Cam, PisosPer),

  node(X1, ColO, LinO, _, PisoO), 
  edge(X1, X, _, PisoO),

  node(Y1, ColD, LinD, _, PisoD), 
  edge(Y1, Y, _, PisoD),

  aStar_piso(PisosPer, LC, Cam, X, Y, Tempo),
  eliminate_redundant(LC, LCam),
  %H2 = [TOrig|TDest->Cam*LCam],
  assertz(ttpl(TOrig, TDest, Cam, LCam)),
  tempo_passagens(Cam, Tempo, NTempo),
  asserta(tempo_caminho(TOrig, TDest, NTempo)),
  asserta(tempo_caminho(TDest, TOrig, NTempo)),
  %open('teste.txt', append, Stream),
  %write(Stream, 'CamTempo: '), write(Stream, TOrig), write(Stream, TDest), write(Stream, NTempo), nl(Stream),
  %close(Stream),
  Ind2 is Ind+1,
  calculo2(Tarefa, T, Atual, Ind2, T2).

tempo_passagens([], Tempo, Tempo):-!.

tempo_passagens([elev(_,_)|T], Tempo, NTempo):-
  !,
  tempo_passagens(T, Tempo, NTempo2),
  NTempo is NTempo2 + 30. % Tempo por defeito de andar de elevador.

tempo_passagens([cor(_,_,_)|T], Tempo, NTempo):-
  tempo_passagens(T, Tempo, NTempo2),
  NTempo is NTempo2 + 5. % Tempo por defeito de andar no corredor externo.

%%%%%%%%%%%%%%%%%%%%%%%%%
% Caminhos entre pisos. %
%%%%%%%%%%%%%%%%%%%%%%%%%
path_between_floors(Request):-
  cors_enable(Request, [methods([get])]),
  http_parameters(Request, [origem(Origem, []), destino(Destino, [])]),
  
  atom_string(Origem, Or),
  atom_string(Destino, Dest),
  
  % Faz os pedidos ao backend dos dados.
  request_dados(),

  % Busca pelas coordenadas e piso da origem e do destino através dos identificadores.
  busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  melhor_caminho_pisos(PisoOr, PisoDest, Cam, PisosPer),

  node(X1, COr, LOr, _, PisoOr), % Pos inicial tem que ser   %define_dados(ResVal, PisoOr, COr, LOr, PisoDest, CDest, LDest),
  edge(X1, X, _, PisoOr),

  node(Y1, CDest, LDest, _, PisoDest), % Pos destino tem que ser 0 também.
  edge(Y1, Y, _, PisoDest),
  
  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso2, Cam, X, Y, _),

  converte_cam_final(Cam, CamF),

  eliminate_redundant(CamPorPiso2, CamPorPiso),
  gtrace,
  R = json([sol1=CamF, sol2=CamPorPiso]),
  prolog_to_json(R, JSONObject),

  reply_json(JSONObject, [json_object(dict)]).

request_dados():-
  request_edificios(),
  request_elevadores(),
  request_pisos(),
  request_passagens(),
  request_mapa_pisos().

busca_coordenadas_piso(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest):-
  ((ponto_acesso(Or, COr, LOr, PisoOr);corr_pos(Or, COr, LOr, PisoOr);elev_pos(Or, COr, LOr, PisoOr)),
  (ponto_acesso(Dest, CDest, LDest, PisoDest);corr_pos(Dest, CDest, LDest, PisoDest);elev_pos(Dest, CDest, LDest, PisoDest))).

converte_cam_final([], []).

converte_cam_final([elev(PO,PD)|T], [[PO,elev,PD]|T2]):-
  converte_cam_final(T, T2).

converte_cam_final([cor(_,PO,PD)|T], [[PO,cor,PD]|T2]):-
  converte_cam_final(T, T2).

extrai_request(Data, [Data.origem, Data.posOrigem, Data.destino, Data.posDestino|[]]).

define_dados([PO, [ColOr, LinOr], PD, [ColDest, LinDest]], PO, ColOr, LinOr, PD, ColDest, LinDest).

%%%

%%%

% Vai aplicar o A-Star a cada um dos pisos da solução de melhor_caminho_pisos ou caminho_pisos.
% 1º - Lista de pisos da solução.
% 2º - Lista de listas contendo as soluções do A-Star para cada piso.
aStar_piso([PisoDest|[]], [UltCaminho|[]], [], Or, Dest, Custo):-
  aStar(Or, Dest, UltCaminho, Custo, PisoDest),
  !.

aStar_piso([PisoAct, PisoProx|ProxPisos], [[CamPiso]|Restante], [TravessiaEd|Travessias], IdInicial, Dest, Custo):-

  ((TravessiaEd == elev(PisoAct, PisoProx), elev_pos(_, Col, Lin, PisoAct), node(IdElev, Col, Lin, _, PisoAct),
  edge(IdCorr, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo1, PisoAct), elev_pos(_, Col1, Lin1, PisoProx),
  node(IdElevProxPiso, Col1, Lin1, _, PisoProx), edge(IdElevProxPiso, IdInicialProxPiso, _, PisoProx),!)
  ;
  (TravessiaEd = cor(Des, PisoAct, PisoProx), corr_pos(Des, Col, Lin, PisoAct), node(IdCorr, Col, Lin, _, PisoAct), % no início TravessiaEd == cor(_, PisoAct, PisoProx),
  edge(IdCorr, IdFinal, _, PisoAct), aStar(IdInicial, IdFinal, CamPiso, Custo1, PisoAct), corr_pos(_, Col1, Lin1, PisoProx),
  node(IdCorrProxPiso, Col1, Lin1, _, PisoProx), edge(IdCorrProxPiso, IdInicialProxPiso, _, PisoProx))),

  append([PisoProx], ProxPisos, L),
  aStar_piso(L, Restante, Travessias, IdInicialProxPiso, Dest, Custo2),
  Custo is Custo1 + Custo2.

% Vai fazer o GET e fazer os asserts para criar os factos.
% São aproveitados o edifíidentifica_salascio a que pertence o piso e a sua designação: pisos(B, [B1, B2, B3]). pisos(C, [C1, C2]).
request_pisos():-
  destroi_pisos(),
  http_open('http://localhost:3000/api/piso/listPisosGeral', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_pisos(ResObj, ResVal),
  cria_pisos(ResVal).

% Dada uma lista de JSONs, vai iterar e colocar na lista Codigos os codigos dos edifícios.
extrai_pisos([], []):-!.
extrai_pisos([H|T], [[H.edificio, H.pisos]|T2]):-
  extrai_pisos(T, T2).

% O piso vai ficar organizada da seguinte forma: [[A, [A1, A2, A3]], [B, [B1, B2]]]

% Caso base: Edifício não identificado.
arranja_piso(Designacao, Edificio, [Edificio, [Designacao]|[]]).

% Caso base: Edifício identificado.
arranja_piso(Designacao, Edificio, [[Edificio|T1]|_]):-
  append(T1, Designacao, _).

arranja_piso(Designacao, Edificio, [_|LAtual]):-
  arranja_piso(Designacao, Edificio, LAtual).

cria_pisos([]).

cria_pisos([[Edificio, Pisos|_]|T]):-
  assertz(pisos(Edificio, Pisos)),
  cria_pisos(T).

destroi_pisos():-
  findall(pisos(X, Y), pisos(X, Y), A),
  destroi(A).

request_passagens():-
  destroi_passagens(),
  http_open('http://localhost:3000/api/passagem/listPassagens', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_passagens(ResObj, ResVal),
  cria_passagens(ResVal).

destroi_passagens():-
  findall(corredor(A, B, C, D, E), corredor(A, B, C, D, E), F),
  destroi(F).

extrai_passagens([], []).
extrai_passagens([H|T1], [[H.designacao, H.edificioA, H.edificioB, H.pisoA, H.pisoB]|T2]):-
  extrai_passagens(T1, T2).

cria_passagens([]).
cria_passagens([[Designacao, EdificioA, EdificioB, PisoA, PisoB]|T]):-
  assertz(corredor(Designacao, EdificioA, EdificioB, PisoA, PisoB)),
  assertz(liga(EdificioA, EdificioB)),
  cria_passagens(T).

% Vai fazer o GET e fazer os asserts para criar os factos.
% Vão ser aproveitadas as designações: edificio(A). edificio(B).
request_edificios():-
  destroi_edificios(),
  http_open('http://localhost:3000/api/edificio/listEdificios', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_edificio(ResObj, ResVal),
  cria_edificio(ResVal).


% Dada uma lista de JSONs, vai iterar e colocar na lista Codigos os codigos dos edifícios.
extrai_edificio([], []).
extrai_edificio([H|T], [H.codigoEdificio|L]):-
  extrai_edificio(T, L).

cria_edificio([]).
cria_edificio([Code|T]):-
  assertz(edificio(Code)),
  cria_edificio(T).

destroi_edificios():-
  findall(edificio(X), edificio(X), Edificios),
  destroi(Edificios).


% Vai fazer o GET e fazer os asserts para criar os factos.
% Vão ser aproveitados o edifício a que pertence e os pisos servidos: elevador(B, [B1, B2]). elevador(C, [C1, C2]).
request_elevadores():-
  destroi_elevadores(),
  http_open('http://localhost:3000/api/elevador/listElevadores', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_elevadores(ResObj, ResVal),
  cria_elevadores(ResVal).

extrai_elevadores([], []).
extrai_elevadores([H|T], [[H.edificio, H.pisosServidos]|T2]):-
  extrai_elevadores(T, T2).

cria_elevadores([]).
cria_elevadores([[Edificio, PisosServidos|_]|T]):-
  assertz(elevador(Edificio, PisosServidos)),
  cria_elevadores(T).

destroi_elevadores():-
  findall(elevador(X, Y), elevador(X, Y), Elevadores),
  destroi(Elevadores).

% Vai fazer o GET e fazer os asserts para criar os factos.
% Vão ser aproveitadas os mapas de cada piso: m(x,y,z), onde x é a coluna, y a linha e z o valor.
% Valores:
% - 0, é por onde o robo deve circular;
% - 1, paredes, não pode atravessa-las;
% - 2, elevadores;
% - 3, corredores;
% - 4, saídas;
request_mapa_pisos():-
  destroi_mapa_pisos(),
  http_open('http://localhost:3000/api/mapaPiso/listMapasPiso', ResJSON, [cert_verify_hook(cert_accept_any)]),
  json_read_dict(ResJSON, ResObj),
  extrai_mapa_pisos(ResObj, ResVal),
  cria_mapa_pisos(ResVal, 0).

destroi_mapa_pisos():-
  findall(node(K, L, M, N, O), node(K, L, M, N, O), Nodes),
  findall(edge(A1, B1, C1, D1), edge(A1, B1, C1, D1), Edges),
  findall(elev_pos(K11, K1, L1, M1), elev_pos(K11, K1, L1, M1), ElevPos),
  findall(corr_pos(K22, K2, L2, M2), corr_pos(K22, K2, L2, M2), CorrPos),
  findall(ponto_acesso(A2, B2, C2, D2), ponto_acesso(A2, B2, C2, D2), PontoAce),
  destroi(ElevPos),
  destroi(CorrPos),
  destroi(PontoAce),
  destroi(Nodes),
  destroi(Edges).

extrai_mapa_pisos([], []).
extrai_mapa_pisos([H|T], [[H.piso, [H.largura, H.profundidade], H.mapa, H.saidas, H.elevador, H.salas, H.saidaLocalizacao]|T2]):-
  extrai_mapa_pisos(T, T2).


cria_mapa_pisos([], _):-!.

cria_mapa_pisos([[Piso, [Largura, Profundidade], Mapa, Saidas, [[IdElev, ColE, LinE]|_], Salas, _]|T], _):-
  cria_mapa(Mapa, Piso, 1, 1, 1),
  identifica_corredores(Saidas, Piso),
  identifica_salas(Salas, Piso),
  assertz(elev_pos(IdElev, ColE, LinE, Piso)), % Existe apenas 1 elevador por edifício.
  L1 is Largura+1,
  P1 is Profundidade+1,
  cria_grafo(L1, P1, Piso),
  cria_mapa_pisos(T, 1).

% Caso base - percorreu a lista de corredores até ao final.
identifica_corredores([], _):-
  !.

% Caso o edifício não tenha nenhum corredor.
identifica_corredores([[]], _):-
  !.

identifica_corredores([[Id, Col, Lin]|Restantes], Piso):-
  assertz(corr_pos(Id, Col, Lin, Piso)),
  identifica_corredores(Restantes, Piso).

identifica_salas([], _):-
  !.

identifica_salas([[]], _):-
  !.

identifica_salas([[Identificacao, Col, Lin]|Restantes], Piso):-
  assertz(ponto_acesso(Identificacao, Col, Lin, Piso)),
  identifica_salas(Restantes, Piso).



cria_mapa([], _, _, _, _):-!.

cria_mapa([Array|Restantes], Piso, Col, Lin, Id):-
  cria_linha(Array, Piso, Col, Lin, Id, LId),
  Col2 is 1,
  Lin2 is Lin+1,
  cria_mapa(Restantes, Piso, Col2, Lin2, LId).


cria_linha([], _, _, _, Id, Id):-!.

cria_linha([Valor|Restantes], Piso, Col, Lin, Id, LId):-
  %assertz(m(Col, Lin, Valor, Piso)),
  assertz(node(Id, Col, Lin, Valor, Piso)),
  Id2 is Id+1,
  Col2 is Col+1,
  cria_linha(Restantes, Piso, Col2, Lin, Id2, LId).

% Faz retract a todos os predicados que fez assert dinamicamente antes do novo request.
destroi([]).
destroi([H|T]):-
  retract(H),
  destroi(T).

% Algoritmo que vai retornar os caminhos do piso origem para o piso destino. Em LEdCam vai armazenar os edifícios e o LLig vai retornar pormenorizado.

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

caminho_pisos(PisoOr, PisoDest, LEdCam, LLig):-
  pisos(EdOr, LPisosOr), member(PisoOr, LPisosOr),
  pisos(EdDest, LPisosDest), member(PisoDest, LPisosDest),
  caminho_edificios(EdOr, EdDest, LEdCam),
  %!, % Cut to prevent backtracking on the caminho_edificios/3 predicate
  segue_pisos(PisoOr, PisoDest, LEdCam, LLig),
  append([PisoOr], LPiCam2, LPiCam).

segue_pisos(PisoDest, PisoDest, _, []).

segue_pisos(PisoDest1, PisoDest, [EdDest], [elev(PisoDest1, PisoDest)]):-
  PisoDest \== PisoDest1,
  elevador(EdDest, LPisos), member(PisoDest1, LPisos), member(PisoDest, LPisos).
  %!. % Cut to prevent backtracking

segue_pisos(PisoAct, PisoDest, [EdAct, EdSeg | LOutrosEd], [cor(Des, PisoAct, PisoSeg) | LOutrasLig]):-
  (corredor(Des, EdAct, EdSeg, PisoAct, PisoSeg); corredor(Des, EdSeg, EdAct, PisoSeg, PisoAct)),
  segue_pisos(PisoSeg, PisoDest, [EdSeg | LOutrosEd], LOutrasLig).
  %!. % Cut to prevent backtracking

segue_pisos(PisoAct, PisoDest, [EdAct, EdSeg | LOutrosEd], [elev(PisoAct, PisoAct1), cor(Des, PisoAct1, PisoSeg) | LOutrasLig]):-
  (corredor(Des, EdAct, EdSeg, PisoAct1, PisoSeg); corredor(Des, EdSeg, EdAct, PisoSeg, PisoAct1)),
  PisoAct1 \== PisoAct,
  elevador(EdAct, LPisos), member(PisoAct, LPisos), member(PisoAct1, LPisos),
  segue_pisos(PisoSeg, PisoDest, [EdSeg | LOutrosEd], LOutrasLig).
  %!. % Cut to prevent backtracking

caminho_edificios(EdOr, EdDest, LEdCam):-
  caminho_edificios2(EdOr, EdDest, [EdOr], LEdCam).
  %!. % Cut to prevent backtracking

caminho_edificios2(EdX, EdX, LEdInv, LEdCam):-
  !, reverse(LEdInv, LEdCam).

caminho_edificios2(EdAct, EdDest, LEdPassou, LEdCam):-
  (liga(EdAct, EdInt); liga(EdInt, EdAct)),
  \+member(EdInt, LEdPassou),
  caminho_edificios2(EdInt, EdDest, [EdInt | LEdPassou], LEdCam).
  %!. % Cut to prevent backtracking


% Algoritmo que vai retornar os caminhos com o critério de preferência sem elevadores.
melhor_caminho_pisos(P, P, [], [P]):-!.

melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor,LPiCam):-

  findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
  menos_elevadores(LLLig,LLigMelhor,_,_),
  enumera_pisos(LLigMelhor, LPiCam).

enumera_pisos([elev(Piso1, Piso2)|[]], [Piso1, Piso2|[]]):-!.

enumera_pisos([cor(_,Piso1, Piso2)|[]], [Piso1, Piso2|[]]):-!.

enumera_pisos([elev(Piso, _)|T1], [Piso|T2]):-
  enumera_pisos(T1, T2).

enumera_pisos([cor(_,Piso, _)|T1], [Piso|T2]):-
  enumera_pisos(T1, T2).


menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).

menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
  menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
  conta(LLig,NElev1,NCor1),
  (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,
  NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
  (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).

conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.

conta([cor(_,_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.


%%%%% Criação de grafo (mapa do piso) %%%%%
% m(col, lin, valor, piso) => m(0, 0, 0, A1)...
% node(Id, Col, Lin, Valor, Piso)...
% edge(Id1, Id2, Custo, Piso)...
cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,Piso):-
  cria_grafo_lin(Col,Lin,Piso),
  Lin1 is Lin-1,
  cria_grafo(Col,Lin1,Piso).


cria_grafo_lin(0,_,_):-!.

cria_grafo_lin(Col,Lin,Piso):-
  ((corr_pos(_, Col, Lin, Piso),%Piso == "A1",trace,
  !,node(Id1, Col, Lin, _, Piso))
  ;
  (elev_pos(_, Col, Lin, Piso),%Piso == "A1",trace,
  !,node(Id1, Col, Lin, _, Piso))
  ;
  (ponto_acesso(_, Col, Lin, Piso),%trace,
  !,node(Id1, Col, Lin, _, Piso))
  ; % Sem obstáculos (0), porta vertical (6) e porta horizontal (7).
  (node(Id1,Col,Lin,0,Piso),!) ; (node(Id1, Col, Lin, 6, Piso),!) ; (node(Id1, Col, Lin, 7, Piso),!)),
  !,
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  (((node(Id2,ColS,Lin,0,Piso),! ; node(Id2,ColS,Lin,6,Piso),! ; node(Id2,ColS,Lin,7,Piso)), assertz(edge(Id1, Id2, 1, Piso));true)), % Verifca à direita.
  (((node(Id3,ColA,Lin,0,Piso),! ; node(Id3,ColA,Lin,6,Piso),! ; node(Id3,ColA,Lin,7,Piso)), assertz(edge(Id1, Id3, 1, Piso));true)), % Verifca à esquerda.
  (((node(Id4,Col,LinS,0,Piso),! ; node(Id4,Col,LinS,6,Piso),! ; node(Id4,Col,LinS,7,Piso)), assertz(edge(Id1, Id4, 1, Piso));true)), % Verifica abaixo.
  (((node(Id5,Col,LinA,0,Piso),! ; node(Id5,Col,LinA,6,Piso),! ; node(Id5,Col,LinA,7,Piso)), assertz(edge(Id1, Id5, 1, Piso));true)), % Verifica acima.
  C is sqrt(2),
  (((node(Id6,ColS,LinA,0,Piso),! ; node(Id6,ColS,LinA,6,Piso),! ; node(Id6,ColS,LinA,7,Piso)), asserta(edge(Id1, Id6, C, Piso));true)), % Verifica diagonal superior direita.
  (((node(Id7,ColA,LinA,0,Piso),! ; node(Id7,ColA,LinA,6,Piso),! ; node(Id7,ColA,LinA,7,Piso)), asserta(edge(Id1, Id7, C, Piso));true)), % Verifica diagonal superior esquerda.
  (((node(Id8,ColS,LinS,0,Piso),! ; node(Id8,ColS,LinS,6,Piso),! ; node(Id8,ColS,LinS,7,Piso)), asserta(edge(Id1, Id8, C, Piso));true)), % Verifica diagonal inferior direita.
  (((node(Id9,ColA,LinS,0,Piso),! ; node(Id9,ColA,LinS,6,Piso),! ; node(Id9,ColA,LinS,7,Piso)), asserta(edge(Id1, Id9, C, Piso));true)), % Verifica diagonal inferior esquerda.


  
  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin,Piso),!.

cria_grafo_lin(Col,Lin,Piso):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).


% A-star.
aStar(Orig,Dest,Cam,Custo,Piso):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo,Piso).

% Se for preciso apenas o melhor caminho, colocar cut a seguir ao reverse.
aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo,_):-
	reverse([Dest|T],Cam),!.

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo,Piso):-
  %trace,
	LA=[Act|_],
  %notrace,nodebug,
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,edge(Act,X,CustoX,Piso),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX,Piso),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo,Piso).

% substituir a chamada edge(Act,X,CustoX)
% por (edge(Act,X,CustoX);edge(X,Act,CustoX))
% se quiser ligacoes bidirecionais


estimativa(Nodo1,Nodo2,Estimativa,Piso):-
	node(Nodo1,X1,Y1,_,Piso),
	node(Nodo2,X2,Y2,_,Piso),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).


  eliminate_redundant([], []).
eliminate_redundant([X|Xs], Result) :-
    (is_list(X) ->
        flatten(X, Flattened),
        eliminate_redundant(Xs, Rest),
        Result = [Flattened|Rest]
    ;
        eliminate_redundant(Xs, Rest),
        Result = [X|Rest]
    ).

flatten([], []).
flatten([X|Xs], Flat) :-
    flatten(X, FlatX),
    flatten(Xs, FlatRest),
    append(FlatX, FlatRest, Flat).
flatten(X, [X]).

% Define a predicate to remove outer single quotes from a list of lists
remove_outer_single_quotes_from_lists([], []).
remove_outer_single_quotes_from_lists([H|T], [ProcessedH|ProcessedT]) :-
    process_list_with_quotes(H, ProcessedH),
    remove_outer_single_quotes_from_lists(T, ProcessedT).

% Define a predicate to remove outer single quotes from a list
process_list_with_quotes([], []).
process_list_with_quotes([H|T], [ProcessedH|ProcessedT]) :-
    remove_outer_single_quotes(H, ProcessedH),
    process_list_with_quotes(T, ProcessedT).

% Define a predicate to remove outer single quotes from an atom or list
remove_outer_single_quotes(X, X) :- atomic(X).
remove_outer_single_quotes([H|T], [ProcessedH|ProcessedT]) :-
    remove_outer_single_quotes(H, ProcessedH),
    remove_outer_single_quotes(T, ProcessedT).
remove_outer_single_quotes(AtomWithQuotes, AtomWithoutQuotes) :-
    atom_concat('\'', AtomWithoutQuotesWithQuotes, AtomWithQuotes),
    atom_concat(AtomWithoutQuotesWithQuotes, '\'', AtomWithoutQuotes).

% Example usage:
% remove_outer_single_quotes_from_lists([['"T1"', '"D201T"', '"C101T"'], ['"T2"', '"D101T"', '"APF"']], ProcessedLists).
% The result will be ProcessedLists = [["T1", "D201T", "C101T"], ["T2", "D101T", "APF"]