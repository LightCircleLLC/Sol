// OPERACIONES BASICAS CON MATRICES: LLENAR, IMPRIMIR, BUSCAR, MODIFICAR Y ELIMINAR
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  int buscar_valor, modificar_valor;
  int valores[3][3], f, c;

  for (f = 0; f < 3; f++) // LLENADO
    for (c = 0; c < 3; c++)
    {
      printf("Da un valor entero: ");
      scanf("%d", &valores[f][c]);
    }

  printf("\n\n");
  for (f = 0; f < 3; f++) // IMPRIMIR
  {
    for (c = 0; c < 3; c++)
    {
      printf("\t%d", valores[f][c]);
    }
    printf("\n\n");
  }

  printf("\nDa el valor a buscar: ");
  scanf("%d", &buscar_valor);

  for (f = 0; f < 3; f++) // BUSCAR
  {
    for (c = 0; c < 3; c++)
    {
      if (buscar_valor == valores[f][c])
        printf("Se encontro el valor %d en la posicion [%d,%d]!\n",
               valores[f][c], f, c);
      else
        printf("NO se encontro el valor!\n");
    }
  }

  if (f == 0 && c == 0)
    printf("\nNO se encontro el valor!\n");

  printf("\nDa el valor a modificar: \n");
  scanf("%d", &buscar_valor);

  printf("\nInserte el nuevo valor: \n");
  scanf("%d", &modificar_valor);

  for (f = 0; f < 3; f++) // MODIFICAR
  {
    for (c = 0; c < 3; c++)
    {

      if (buscar_valor == valores[f][c])
        valores[f][c] = modificar_valor;
    }
  }

  for (f = 0; f < 3; f++) // IMPRIMIR (Para confirmar cambio en la matriz)
  {
    for (c = 0; c < 3; c++)
    {
      printf("\t%d", valores[f][c]);
    }
    printf("\n\n");
  }

  printf("\nDa el valor a eliminar: \n");
  scanf("%d", &buscar_valor);

  for (f = 0; f < 3; f++) // ELIMINAR
  {
    for (c = 0; c < 3; c++)
    {

      if (buscar_valor == valores[f][c])
        valores[f][c] = 0;
    }
  }

  for (f = 0; f < 3; f++) // IMPRIMIR (Para confirmar cambio en la matriz)
  {
    for (c = 0; c < 3; c++)
    {
      printf("\t%d", valores[f][c]);
    }
    printf("\n\n");
  }

  system("pause");
}