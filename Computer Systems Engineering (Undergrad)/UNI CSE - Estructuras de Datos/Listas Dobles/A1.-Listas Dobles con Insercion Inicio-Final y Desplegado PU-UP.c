#include <stdio.h>
#include <stdlib.h>

typedef struct nodo{
    int matricula;
    char nombre[100];
    int semestre;
    long long int telefono;
    char facultad[100];
    char generacion[20];
    char tutor[100];
    char correo_electronico[100];

	struct nodo* siguiente;
	struct nodo* atras;
}nodo;

nodo* primero = NULL;
nodo* ultimo = NULL;

void insertarNodoFinal();
void insertarNodoInicio();
void desplegarListaPU();
void desplegarListaUP();

int main(){
	int opcionMenu = 0;
	do{
		printf("\n|-------------------------------------|");
		printf("\n|           ° LISTA DOBLE °           |");
		printf("\n|------------------|------------------|");
		printf("\n| 1. InsertarFinal | 2. InsertarInicio|");
		printf("\n| 3. Desplegar P.U | 4. Desplegar U.P |");
        printf("\n| 5. Salir         |                  |");		
		printf("\n|------------------|------------------|");
		printf("\n\n Escoja una Opcion: ");
		scanf("%d", &opcionMenu);
		switch(opcionMenu){
			case 1:
				printf("\n\n Insertar nodo en la lista al final \n\n");
				insertarNodoFinal();
				break;
			case 2:
				printf("\n\n Insertar nodo en la lista al inicio \n\n");
				insertarNodoInicio();
				break;
			case 3:
				printf("\n\n Desplegar lista de nodos de primero al ultimo (izquierda a derecha)\n\n");
				desplegarListaPU();
				break;
            case 4:
                printf("\n\n Desplegar lista de nodos de ultimo al primero (derecha a izquierda)\n\n");
				desplegarListaUP();
				break;
			case 5:
				printf("\n\n Programa finalizado...");
				break;
			default:
				printf("\n\n Opcion invalida. Inserte otro numero. \n\n");	
		}
	}while(opcionMenu != 5);
	return 0;
}

void insertarNodoFinal(){
	nodo* nuevo = (nodo*)malloc(sizeof(nodo));
	printf(" Ingrese la matricula que contendra el nuevo Nodo: ");
	scanf("%d", &nuevo->matricula);
    printf(" Ingrese el nombre: ");
    scanf(" %[^\n]s", &nuevo->nombre);
    printf(" Ingrese el semestre: ");
    scanf("%d", &nuevo->semestre);
    printf(" Ingrese el telefono: ");
    scanf("%lld", &nuevo->telefono);
    printf(" Ingrese la facultad: ");
    scanf(" %[^\n]s", &nuevo->facultad);
    printf(" Ingrese la generacion: ");
    scanf(" %[^\n]s", &nuevo->generacion);
    printf(" Ingrese el nombre del tutor: ");
    scanf(" %[^\n]s", &nuevo->tutor);
    printf(" Ingrese el correo electronico del estudiante: ");
    scanf(" %[^\n]s", &nuevo->correo_electronico);
	
	if(primero == NULL){
		primero = nuevo;
		primero->siguiente = NULL;
		primero->atras = NULL;
		ultimo = primero;
	}else{
		ultimo->siguiente = nuevo;
		nuevo->siguiente = NULL;
		nuevo->atras = ultimo;
		ultimo = nuevo;
	}

	printf("\n Nodo ingresado con exito.\n\n");
}

void insertarNodoInicio(){
	nodo* nuevo = (nodo*)malloc(sizeof(nodo));
	printf(" Ingrese la matricula que contendra el nuevo nodo: ");
	scanf("%d", &nuevo->matricula);
    printf(" Ingrese el nombre: ");
    scanf(" %[^\n]s", &nuevo->nombre);
    printf(" Ingrese el semestre: ");
    scanf("%d", &nuevo->semestre);
    printf(" Ingrese el telefono: ");
    scanf("%lld", &nuevo->telefono);
    printf(" Ingrese la facultad: ");
    scanf(" %[^\n]s", &nuevo->facultad);
    printf(" Ingrese la generacion: ");
    scanf(" %[^\n]s", &nuevo->generacion);
    printf(" Ingrese el nombre del tutor: ");
    scanf(" %[^\n]s", &nuevo->tutor);
    printf(" Ingrese el correo electronico del estudiante: ");
    scanf(" %[^\n]s", &nuevo->correo_electronico);
	
	if(primero == NULL){
		primero = nuevo;
		primero->siguiente = NULL;
		primero->atras = NULL;
		ultimo = nuevo;
	}else{
		nuevo->siguiente = primero;
        primero->atras = nuevo;
        primero = nuevo;
        nuevo->atras = NULL;
	}

	printf("\n Nodo ingresado con exito.\n\n");
}

void desplegarListaPU(){
	nodo* actual = (nodo*)malloc(sizeof(nodo));
	actual = primero;
	if(primero != NULL){
		while(actual != NULL){
			printf("\n %d", actual->matricula);
            printf("\n %s", actual->nombre);
            printf("\n %d", actual->semestre);
            printf("\n %lld", actual->telefono);
            printf("\n %s", actual->facultad);
            printf("\n %s", actual->generacion);
            printf("\n %s", actual->tutor);
            printf("\n %s", actual->correo_electronico);
            printf("\n|------------------|------------------  |");
			actual = actual->siguiente;
		}
	}else{
		printf("\n La lista se encuentra vacia.\n\n");
	}
}

void desplegarListaUP(){
	nodo* actual = (nodo*)malloc(sizeof(nodo));
	actual = ultimo;
	if(primero != NULL){
		while(actual != NULL){
			printf("\n %d", actual->matricula);
            printf("\n %s", actual->nombre);
            printf("\n %d", actual->semestre);
            printf("\n %lld", actual->telefono);
            printf("\n %s", actual->facultad);
            printf("\n %s", actual->generacion);
            printf("\n %s", actual->tutor);
            printf("\n %s", actual->correo_electronico);
            printf("\n|------------------|------------------  |");
			actual = actual->atras;
		}
	}else{
		printf("\n La lista se encuentra vacia.\n\n");
	}	
}
