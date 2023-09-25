#include <stdio.h>
#include <stdlib.h>
// Imprime una matriz nula de 3x3

const int columnas = 3;
const int filas = 3;

int main(void)
{
   int A[filas][columnas] = {0};

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
