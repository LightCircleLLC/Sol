#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#define n 5

void llenado(void);
void mostrar(void);
void buscar(void);
void modificar(void);
void eliminar(void);
void menu(void);
void terminar(void);

int temperaturas[n];

int main(void)
{
  while (1)
    menu();

  getch();
}

void llenado(void)
{
  int i;
  int suma = 0;
  float media = 0;
  //**************LLENADO DEL VECTOR*********************
  for (i = 0; i < n; i++) // i=i+1;
  {
    printf("\nDa la temperatura de %d horas: \n", i);
    scanf("%d", &temperaturas[i]);
    suma = suma + temperaturas[i];
  }
  media = suma / n;
  printf("\nLa media de las temperaturas es: %f", media);
}

void mostrar(void)
{
  int i;
  //**************MOSTRAR LOS DATOS DEL VECTOR*********************
  for (i = 0; i < n; i++) // i=i+1;
  {
    printf("\nValor %i: %i\n", i + 1, temperaturas[i]);
  }
}

void buscar(void)
{
  int i;
  int valor;
  //**************BUSCAR UN DATO DEL VECTOR*********************
  printf("\nDa el valor a buscar: ");
  scanf("%d", &valor);

  for (i = 0; i < n; i++) // i=i+1;
  {
    if (valor == temperaturas[i])
      printf("\nSe encontro el valor %d en la posicion %d!\n", temperaturas[i], i);
    else
      printf("\nNO se encontro el valor!\n");
  }
}

void modificar(void)
{
  int i;
  int valor;
  //**************MODIFICAR LOS DATOS DEL VECTOR*********************
  printf("\nDa el valor a modificar: ");
  scanf("%d", &valor);

  for (i = 0; i < n; i++) // i=i+1;
  {
    if (valor == temperaturas[i])
    {
      printf("\nDa el nuevo valor:");
      scanf("%d", &temperaturas[i]);
    }
    else
      printf("\nEl valor no se ha encontrado en el vector.\n");
    return 0;
  }

  for (i = 0; i < n; i++) // i=i+1;
  {
    printf("%d\n\n", temperaturas[i]);
  }
}

void eliminar(void)
{
  int i;
  int valor;
  //**************ELIMINAR EL DATO DEL VECTOR*********************
  printf("\nDa el valor a eliminar: ");
  scanf("%d", &valor);

  for (i = 0; i < n; i++) // i=i+1;
  {
    if (valor == temperaturas[i])
      temperaturas[i] = 0;
  }
  printf("\nEl valor ha sido eliminado.\n");

  for (i = 0; i < n; i++) // i=i+1;
  {
    printf("\n%d\n", temperaturas[i]);
  }
}

void menu(void)
{
  int opcion;
  //**************ESTA FUNCION DESPLIEGA EL MENU DE OPCIONES*********************
  printf("\n*****OPERACIONES CON VECTORES - MENU*****\n");
  printf("\n---Por favor, elija la operacion que desea realizar.---");
  printf("\n1.- Llenado del vector");
  printf("\n2.- Mostrar los datos del vector");
  printf("\n3.- Buscar datos del vector");
  printf("\n4.- Modificar datos del vector");
  printf("\n5.- Eliminar datos del vector");
  printf("\n6.- Terminar el programa");

  printf("\nElija una opcion.\n");
  scanf("%d", &opcion);

  switch (opcion)
  {
  case 1:
  {
    llenado();
    break;
  }

  case 2:
  {
    mostrar();
    break;
  }

  case 3:
  {
    buscar();
    break;
  }

  case 4:
  {
    modificar();
    break;
  }

  case 5:
  {
    eliminar();
    break;
  }

  case 6:
  {
    terminar();
    break;
  }
  }
}

void terminar(void)
{
//**************ESTA FUNCION TERMINA EL PROGRAMA*********************
std:
  abort();
}