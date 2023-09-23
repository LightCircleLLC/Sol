#include <stdio.h>
#include <stdlib.h>
// Imprime una matriz escalar de 3x3

const int columnas = 3;
const int filas = 3;

int main(void)
{
  int A[filas][columnas], escalar;

  printf("Proporciona el escalar: ");
  scanf("%d", &escalar);

  // LLENADO DE LA MATRIZ A
  for (int i = 0; i < filas; i++)
  {
    for (int j = 0; j < columnas; j++)
    {
      if (i == j)
      {
        A[i][j] = escalar;
      }
      else
      {
        A[i][j] = 0;
      }
    }
  }
  // IMPRIMIR MATRIZ A RESULTANTE
  for (int i = 0; i < filas; i++)
  {
    for (int j = 0; j < columnas; j++)
    {
      printf("\t%d", A[i][j]);
    }
    printf("\n\n");
  }

  system("pause");
}
