#include <stdio.h>
#include <stdlib.h>

typedef struct nodo
{
    int matricula;
    char nombre[100];
    int semestre;
    long long int telefono;
    char facultad[100];
    char generacion[20];
    char tutor[100];
    char correo_electronico[100];

    struct nodo *siguiente;
    struct nodo *atras;
} nodo;

nodo *primero = NULL;
nodo *ultimo = NULL;

void insertarNodoFinal();
void insertarNodoInicio();
void desplegarListaPU();
void desplegarListaUP();
void buscarNodo();
void modificarNodo();
void eliminarNodo();

int main()
{
    int opcionMenu = 0;
    do
    {
        printf("\n|-------------------------------------|");
        printf("\n|            *LISTA DOBLE*            |");
        printf("\n|------------------|------------------|");
        printf("\n| 1. InsertarFinal | 2. InsertarInicio|");
        printf("\n| 3. Desplegar P.U | 4. Desplegar U.P |");
        printf("\n| 5. Buscar Nodo   | 6. Modificar Nodo|");
        printf("\n| 7. Eliminar Nodo | 8. Salir         |");
        printf("\n|------------------|------------------|");
        printf("\n\n Escoja una opcion: ");
        scanf("%d", &opcionMenu);
        switch (opcionMenu)
        {
        case 1:
            printf("\n\n Insertar nodo en la lista al final \n\n");
            insertarNodoFinal();
            break;
        case 2:
            printf("\n\n Insertar nodo en la lista al inicio \n\n");
            insertarNodoInicio();
            break;
        case 3:
            printf("\n\n Desplegar lista de nodos de primero al ultimo (izquierda a derecha) \n\n");
            desplegarListaPU();
            break;
        case 4:
            printf("\n\n Desplegar lista de nodos de ultimo al primero (derecha a izquierda) \n\n");
            desplegarListaUP();
            break;
        case 5:
            printf("\n\n Buscar nodo en la lista \n\n");
            buscarNodo();
            break;
        case 6:
            printf("\n\n Modificar nodo en la lista \n\n");
            modificarNodo();
            break;
        case 7:
            printf("\n\n Eliminar nodo en la lista \n\n");
            eliminarNodo();
            break;
        case 8:
            printf("\n\n Programa finalizado...");
            break;
        default:
            printf("\n\n Opcion invalida. Inserte otro numero. \n\n");
        }
    } while (opcionMenu != 8);
    return 0;
}

void insertarNodoFinal()
{
    nodo *nuevo = (nodo *)malloc(sizeof(nodo));
    
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

    if (primero == NULL)
    {
        primero = nuevo;
        primero->siguiente = NULL;
        primero->atras = NULL;
        ultimo = primero;
    }
    else
    {
        ultimo->siguiente = nuevo;
        nuevo->siguiente = NULL;
        nuevo->atras = ultimo;
        ultimo = nuevo;
    }

    printf("\n Nodo ingresado con exito.\n\n");
}

void insertarNodoInicio()
{
    nodo *nuevo = (nodo *)malloc(sizeof(nodo));

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

    if (primero == NULL)
    {
        primero = nuevo;
        primero->siguiente = NULL;
        primero->atras = NULL;
        ultimo = nuevo;
    }
    else
    {
        nuevo->siguiente = primero;
        primero->atras = nuevo;
        primero = nuevo;
        nuevo->atras = NULL;
    }

    printf("\n Nodo ingresado con exito.\n\n");
}

void desplegarListaPU()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;

    if (primero != NULL)
    {
        while (actual != NULL)
        {
            printf("\n %d", actual->matricula);
            printf("\n %s", actual->nombre);
            printf("\n %d", actual->semestre);
            printf("\n %lld", actual->telefono);
            printf("\n %s", actual->facultad);
            printf("\n %s", actual->generacion);
            printf("\n %s", actual->tutor);
            printf("\n %s", actual->correo_electronico);
            printf("\n|------------------|------------------|");
            actual = actual->siguiente;
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia.\n\n");
    }
}

void desplegarListaUP()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = ultimo;

    if (primero != NULL)
    {
        while (actual != NULL)
        {
            printf("\n %d", actual->matricula);
            printf("\n %s", actual->nombre);
            printf("\n %d", actual->semestre);
            printf("\n %lld", actual->telefono);
            printf("\n %s", actual->facultad);
            printf("\n %s", actual->generacion);
            printf("\n %s", actual->tutor);
            printf("\n %s", actual->correo_electronico);
            printf("\n|------------------|------------------|");
            actual = actual->atras;
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia.\n\n");
    }
}

void buscarNodo()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;

    int nodoBuscado = 0, encontrado = 0;

    printf(" Ingrese el dato del nodo a buscar: ");
    scanf("%d", &nodoBuscado);

    if (primero != NULL)
    {
        while (actual != NULL && encontrado != 1)
        {
            if (actual->matricula == nodoBuscado)
            {
                printf("\n El nodo con la matricula ( %d ) ha sido encontrado\n\n", nodoBuscado);
                printf("\n %d", actual->matricula);
                printf("\n %s", actual->nombre);
                printf("\n %d", actual->semestre);
                printf("\n %lld", actual->telefono);
                printf("\n %s", actual->facultad);
                printf("\n %s", actual->generacion);
                printf("\n %s", actual->tutor);
                printf("\n %s", actual->correo_electronico);
                printf("\n|------------------|------------------|");
                encontrado = 1;
            }

            actual = actual->siguiente;
        }
        if (encontrado == 0)
        {
            printf("\n Nodo no encontrado.\n\n");
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia.\n\n");
    }
}

void modificarNodo()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;

    int nodoBuscado = 0, encontrado = 0;

    printf(" Ingrese la matricula del nodo a buscar para su modificacion: ");
    scanf("%d", &nodoBuscado);

    if (primero != NULL)
    {
        while (actual != NULL && encontrado != 1)
        {
            if (actual->matricula == nodoBuscado)
            {
                printf("\n El nodo con la matricula ( %d ) ha sido encontrado", nodoBuscado);
                printf("\n Ingrese la nueva matricula que contendra el nodo: ");
                scanf("%d", &actual->matricula);
                printf(" Ingrese el nuevo nombre: ");
                scanf(" %[^\n]s", &actual->nombre);
                printf(" Ingrese el nuevo semestre: ");
                scanf("%d", &actual->semestre);
                printf(" Ingrese el nuevo telefono: ");
                scanf("%lld", &actual->telefono);
                printf(" Ingrese la nueva facultad: ");
                scanf(" %[^\n]s", &actual->facultad);
                printf(" Ingrese la nueva generacion: ");
                scanf(" %[^\n]s", &actual->generacion);
                printf(" Ingrese el nuevo nombre del tutor: ");
                scanf(" %[^\n]s", &actual->tutor);
                printf(" Ingrese el nuevo correo electronico del estudiante: ");
                scanf(" %[^\n]s", &actual->correo_electronico);
                printf("\n Nodo modificado con exito.\n\n");

                printf("\n Datos despues de la modificacion: ");
                printf("\n %d", actual->matricula);
                printf("\n %s", actual->nombre);
                printf("\n %d", actual->semestre);
                printf("\n %lld", actual->telefono);
                printf("\n %s", actual->facultad);
                printf("\n %s", actual->generacion);
                printf("\n %s", actual->tutor);
                printf("\n %s", actual->correo_electronico);
                printf("\n|------------------|------------------|");
                encontrado = 1;
            }

            actual = actual->siguiente;
        }
        if (encontrado == 0)
        {
            printf("\n Nodo no encontrado.\n\n");
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia.\n\n");
    }
}

void eliminarNodo()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;
    nodo *anterior = (nodo *)malloc(sizeof(nodo));
    anterior = NULL;

    int nodoBuscado = 0, encontrado = 0;

    printf(" Ingrese la matricula del nodo a buscar para eliminar: ");
    scanf("%d", &nodoBuscado);
    if (primero != NULL)
    {
        while (actual != NULL && encontrado != 1)
        {
            if (actual->matricula == nodoBuscado)
            {
                if (actual == primero)
                {
                    primero = primero->siguiente;
                }
                else if (actual == ultimo)
                {
                    anterior->siguiente = NULL;
                    ultimo = anterior;
                }
                else
                {
                    anterior->siguiente = actual->siguiente;
                    actual->siguiente->atras = anterior;
                }

                printf("\n Nodo eliminado con exito.");
                encontrado = 1;
            }
            anterior = actual;
            actual = actual->siguiente;
        }
        if (encontrado == 0)
        {
            printf("\n Nodo no encontrado.\n\n");
        }
        else
        {
            free(anterior);
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia.\n\n");
    }
}

