#include <conio.h>
#include <stdio.h>
#include <stdlib.h>
// Version 3b, 04/12/2022
// Proyecto Final de Estructuras de Datos
// Arbol Binario con Funciones (Completo)

// Declaracion de la estructura principal
struct nodo
{
    int dato;
    struct nodo *izquierda;
    struct nodo *derecha;
};

// Declaracion de elementos de la estructura auxiliares
struct nodo *raiz = NULL, *nuevonodo, *padreptr, *temp;

// Declaracion de prototipos de funciones
void insertarNodo(struct nodo *nodo);
void recorridoPreorden(struct nodo *nodo);
void recorridoInorden(struct nodo *nodo);
void recorridoPostorden(struct nodo *nodo);
int nivelArbol(struct nodo *arbol);
int totalNodos(struct nodo *arbol);
unsigned int totalHojas(struct nodo *arbol);
int altura(struct nodo *arbol);
struct nodo *nodoMayorValor(struct nodo *arbol);
void borrarArbol(struct nodo *nodo);
void menu(void);

// Funcion main
int main()
{
    int TN, TH, ALT;
    int opcion = 0;
    menu();
    do
    {
        printf("\nEscoja una opcion: ");
        scanf("%d", &opcion);
        switch (opcion)
        {
        case 0:
            menu();
            break;

        case 1:
            insertarNodo(raiz);
            printf("\nNodo insertado correctamente");
            break;

        case 2:
            printf("\nPreorden: (raiz, izquierdo, derecho)\n");
            recorridoPreorden(raiz);
            break;

        case 3:
            printf("\nInorden: (izquierdo, raiz, derecho)\n");
            recorridoInorden(raiz);
            break;

        case 4:
            printf("\nPostorden: (izquierdo, derecho, raiz)\n");
            recorridoPostorden(raiz);
            break;

        case 5:
            printf("\nEl nivel del arbol es: %d\n", nivelArbol(raiz));
            break;

        case 6:
            TN = totalNodos(raiz);
            printf("\nEl numero total de nodos es: %d\n", TN);
            break;

        case 7:
            TH = totalHojas(raiz);
            printf("\nEl numero de nodos hojas es: %d\n", TH);
            break;

        case 8:
            ALT = altura(raiz);
            printf("\nLa altura del arbol es: %d\n", ALT);
            break;

        case 9:
            if (raiz == NULL)
            {
                printf("\nAdvertencia: El arbol esta vacio.\n");
                break;
            }
            printf("\nEl nodo con mayor valor es: %d\n", nodoMayorValor(raiz)->dato);
            break;

        case 10:
            if (raiz == NULL)
            {
                printf("\nAdvertencia: El arbol esta vacio.\n");
            }
            borrarArbol(raiz);
            printf("\nEl arbol ha sido borrado correctamente.\n");
            break;

        case 11:
            printf("\nPrograma finalizado.\n");
            system("pause");
            break;

        default:
            printf("\nAdvertencia: Opcion invalida.\n");
            break;
        }
    } while (opcion != 11);
    return 0;
}

// Definicion de las funciones
void insertarNodo(struct nodo *arbol)
{
    nuevonodo = (struct nodo *)malloc(sizeof(struct nodo));
    printf("\nInserta el valor que desees agregar: ");
    scanf("%d", &nuevonodo->dato);
    int val = nuevonodo->dato;
    nuevonodo->izquierda = NULL;
    nuevonodo->derecha = NULL;

    if (raiz == NULL)
    {
        raiz = nuevonodo;
    }
    else
    {
        temp = raiz;
        while (temp != NULL)
        {
            padreptr = temp;
            if (val < temp->dato)
                temp = temp->izquierda;
            else
                temp = temp->derecha;
        }
        if (val < padreptr->dato)
            padreptr->izquierda = nuevonodo;
        else
            padreptr->derecha = nuevonodo;
    }
}

void recorridoPreorden(struct nodo *nodo)
{
    if (nodo == NULL)
    {
        return;
    }

    printf("%d ", nodo->dato);
    recorridoPreorden(nodo->izquierda);
    recorridoPreorden(nodo->derecha);
}

void recorridoInorden(struct nodo *nodo)
{
    if (nodo == NULL)
    {
        return;
    }

    recorridoInorden(nodo->izquierda);
    printf("%d ", nodo->dato);
    recorridoInorden(nodo->derecha);
}

void recorridoPostorden(struct nodo *nodo)
{
    if (nodo == NULL)
    {
        return;
    }

    recorridoPostorden(nodo->izquierda);
    recorridoPostorden(nodo->derecha);
    printf("%d ", nodo->dato);
}

int nivelArbol(struct nodo *arbol)
{
    int a = 0, b = 0;
    if (arbol == NULL)
    {
        return 1;
    }
    else
    {
        a = nivelArbol(arbol->izquierda) + 1;
        b = nivelArbol(arbol->derecha) + 1;
    }

    if (a >= b)
    {
        return a++; // Suma la raiz
    }
    else
    {
        return b++; // Suma la raiz
    }
}

int totalNodos(struct nodo *arbol)
{
    if (arbol == NULL)
    {
        return 0;
    }
    else
    {
        return (totalNodos(arbol->izquierda) + totalNodos(arbol->derecha) + 1);
    }
}

unsigned int totalHojas(struct nodo *arbol)
{
    if (arbol == NULL)
    {
        return 0;
    }

    if (arbol->izquierda == NULL && arbol->derecha == NULL)
    {
        return 1;
    }
    else
    {
        return totalHojas(arbol->izquierda) + totalHojas(arbol->derecha);
    }
}

int altura(struct nodo *arbol)
{
    int izquierdaAltura, derechaAltura;

    if (arbol == NULL)
    {
        return -1;
    }

    izquierdaAltura = altura(arbol->izquierda);
    derechaAltura = altura(arbol->derecha);

    if (izquierdaAltura > derechaAltura)
    {
        return (izquierdaAltura + 1);
    }
    else
    {
        return (derechaAltura + 1);
    }
}

struct nodo *nodoMayorValor(struct nodo *arbol)
{
    if ((arbol == NULL) || (arbol->derecha == NULL))
    {
        return arbol;
    }
    else
    {
        return nodoMayorValor(arbol->derecha);
    }
}

void borrarArbol(struct nodo *arbol)
{
    raiz = NULL;

    if (arbol != NULL)
    {
        borrarArbol(arbol->izquierda);
        borrarArbol(arbol->derecha);
        free(arbol);
    }
    else
    {
        return;
    }
}

void menu()
{
    printf("\n|-----------------------------------------------------------------|");
    printf("\n|                        *ARBOLES BINARIOS*                       |");
    printf("\n|--------------------------------|--------------------------------|");
    printf("\n| 1. Insertar Nodo               | 2. Recorrido Preorden          |");
    printf("\n| 3. Recorrido Inorden           | 4. Recorrido Postordem         |");
    printf("\n| 5. Nivel del Arbol             | 6. Cantidad de Nodos del Arbol |");
    printf("\n| 7. Cantidad de Hojas del Arbol | 8. Altura del Arbol            |");
    printf("\n| 9. Nodo con Mayor Valor        | 10. Borrar el Arbol            |");
    printf("\n| 11. Salir                      | 0. Menu                        |");
    printf("\n|--------------------------------|--------------------------------|");
}