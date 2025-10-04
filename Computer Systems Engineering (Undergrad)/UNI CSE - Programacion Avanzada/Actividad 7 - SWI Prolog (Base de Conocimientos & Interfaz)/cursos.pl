% --- Cursos y seriación ---
curso(matematicas1, 10).
curso(matematicas2, 10).
curso(programacion1, 8).
curso(programacion2, 8).
curso(estructuras, 8).
curso(basesdedatos, 8).
curso(redes, 7).
curso(sistemasoperativos, 9).
curso(inteligenciaartificial, 9).
curso(compiladores, 9).

% --- Requisitos ---
prerequisito(matematicas2, matematicas1).
prerequisito(programacion2, programacion1).
prerequisito(estructuras, programacion2).
prerequisito(basesdedatos, estructuras).
prerequisito(redes, programacion2).
prerequisito(sistemasoperativos, programacion2).
prerequisito(inteligenciaartificial, matematicas2).
prerequisito(inteligenciaartificial, programacion2).
prerequisito(compiladores, estructuras).
prerequisito(compiladores, sistemasoperativos).

% --- Estado de los alumnos con calificaciones ---
% aprobado(Alumno, Curso, Calificacion).

aprobado(juan, matematicas1, 85).
aprobado(juan, programacion1, 72).

aprobado(maria, matematicas1, 90).
aprobado(maria, matematicas2, 95).
aprobado(maria, programacion1, 88).
aprobado(maria, programacion2, 70).

aprobado(carlos, matematicas1, 80).
aprobado(carlos, programacion1, 65). % no aprobado
aprobado(carlos, programacion2, 75).
aprobado(carlos, estructuras, 83).
aprobado(carlos, basesdedatos, 78).

aprobado(ana, matematicas1, 100).
aprobado(ana, matematicas2, 98).
aprobado(ana, programacion1, 92).
aprobado(ana, programacion2, 85).
aprobado(ana, estructuras, 88).
aprobado(ana, sistemasoperativos, 70).

aprobado(luis, matematicas1, 95).
aprobado(luis, matematicas2, 87).
aprobado(luis, programacion1, 90).
aprobado(luis, programacion2, 91).
aprobado(luis, estructuras, 89).
aprobado(luis, basesdedatos, 93).
aprobado(luis, redes, 85).
aprobado(luis, sistemasoperativos, 84).

% --- Reglas ---
% Un curso está aprobado si la calificación es >= 70
curso_aprobado(Alumno, Curso) :-
    aprobado(Alumno, Curso, Cal),
    Cal >= 70.

% Se puede inscribir si cumple con todos los prerequisitos aprobados
puede_inscribir(Alumno, Curso) :-
    curso(Curso,_),
    \+ curso_aprobado(Alumno, Curso),
    forall(prerequisito(Curso, Req), curso_aprobado(Alumno, Req)).
