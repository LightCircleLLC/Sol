#include <stdio.h>
#include <stdlib.h>
// Imprime una matriz identidad de 3x3

const int columnas = 3;
const int filas = 3;

int main(void)
{
  int A[filas][columnas] = {0};

  // LLENADO DE LA MATRIZ A
  for (int i = 0; i < filas; i++)
    A[i][i] = 1;

  // IMPRIMIR MATRIZ A RESULTANTE
  for (int i = 0; i < filas; i++)
  {
    for (int j = 0; j < columnas; j++)
      printf("%d\t", A[i][j]);

    printf("\n");
  }

  system("pause");
}
