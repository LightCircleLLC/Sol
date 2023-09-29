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
} nodo;

nodo *primero = NULL;
nodo *ultimo = NULL;

void insertarNodo();
void buscarNodo();
void modificarNodo();
void eliminarNodo();
void desplegarLista();

int main()
{
    int opcionMenu = 0;
    do
    {
        printf("\n|-------------------------------------|");
        printf("\n|           ° LISTA SIMPLE °          |");
        printf("\n|------------------|------------------|");
        printf("\n| 1. Insertar      | 4. Eliminar      |");
        printf("\n| 2. Buscar        | 5. Desplegar     |");
        printf("\n| 3. Modificar     | 6. Salir         |");
        printf("\n|------------------|------------------|");
        printf("\n\n Escoja una Opcion: ");
        scanf("%d", &opcionMenu);
        switch (opcionMenu)
        {
        case 1:
            printf("\n\n INSERTA NODO EN LA LISTA \n\n");
            insertarNodo();
            break;
        case 2:
            printf("\n\n BUSCAR UN NODO EN LA LISTA \n\n");
            buscarNodo();
            break;
        case 3:
            printf("\n\n MODIFICAR UN NODO DE LA LISTA \n\n");
            modificarNodo();
            break;
        case 4:
            printf("\n\n ELIMINAR UN NODO DE LA LISTA \n\n");
            eliminarNodo();
            break;
        case 5:
            printf("\n\n DESPLEGAR LISTA DE NODOS \n\n");
            desplegarLista();
            break;
        case 6:
            printf("\n\n Programa finalizado...");
            break;
        default:
            printf("\n\n Opcion No Valida \n\n");
        }
    } while (opcionMenu != 6);
    return 0;
}

void insertarNodo()
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
        ultimo = nuevo;
    }
    else
    {
        ultimo->siguiente = nuevo;
        nuevo->siguiente = NULL;
        ultimo = nuevo;
    }
    printf("\n Nodo ingresado con Exito\n\n");
}

void buscarNodo()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;
    int nodoBuscado = 0, encontrado = 0;
    printf(" Ingrese la matricula del nodo a Buscar: ");
    scanf("%d", &nodoBuscado);
    if (primero != NULL)
    {
        while (actual != NULL && encontrado != 1)
        {

            if (actual->matricula == nodoBuscado)
            {
                printf("\n El nodo con la matricula ( %d ) Encontrado\n\n", nodoBuscado);
                printf("\n %s", actual->nombre);
                printf("\n %d", actual->semestre);
                printf("\n %lld", actual->telefono);
                printf("\n %s", actual->facultad);
                printf("\n %s", actual->generacion);
                printf("\n %s", actual->tutor);
                printf("\n %s", actual->correo_electronico);
                encontrado = 1;
            }

            actual = actual->siguiente;
        }
        if (encontrado == 0)
        {
            printf("\n Nodo no encontrado\n\n");
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia\n\n");
    }
}

void modificarNodo()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;
    int nodoBuscado = 0, encontrado = 0;
    printf(" Ingrese el matricula del nodo a Buscar para Modificar: ");
    scanf("%d", &nodoBuscado);
    if (primero != NULL)
    {
        while (actual != NULL && encontrado != 1)
        {

            if (actual->matricula == nodoBuscado)
            {
                printf("\n El nodo con el matricula ( %d ) Encontrado", nodoBuscado);
                printf("\n Ingrese la nueva matricula que contendra el Nodo: ");
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
                printf("\n Nodo modificado con exito\n\n");
                encontrado = 1;
            }

            actual = actual->siguiente;
        }
        if (encontrado == 0)
        {
            printf("\n Nodo no encontrado\n\n");
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia\n\n");
    }
}

void eliminarNodo()
{
    nodo *actual = (nodo *)malloc(sizeof(nodo));
    actual = primero;
    nodo *anterior = (nodo *)malloc(sizeof(nodo));
    anterior = NULL;
    int nodoBuscado = 0, encontrado = 0;
    printf(" Ingrese la matricula del nodo a Buscar para Eliminar: ");
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
                }

                printf("\n Nodo eliminado con exito");
                encontrado = 1;
            }
            anterior = actual;
            actual = actual->siguiente;
        }
        if (encontrado == 0)
        {
            printf("\n Nodo no encontrado\n\n");
        }
        else
        {
            free(anterior);
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia\n\n");
    }
}

void desplegarLista()
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
            actual = actual->siguiente;
        }
    }
    else
    {
        printf("\n La lista se encuentra vacia\n\n");
    }
}