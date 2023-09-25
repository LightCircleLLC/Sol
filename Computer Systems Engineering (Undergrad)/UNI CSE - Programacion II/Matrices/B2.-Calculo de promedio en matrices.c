#include <stdio.h>
#include <stdlib.h>
// Hacer un programa que lea 2 matrices cuadradas con valores float
// Realizar la suma de ambas y almacenar en una tercera matriz
// Determinar el promedio de los valores de la matriz
// Contar cuantos valores almacenados son mayores y menores a dicho promedio

int main(void)
{
  int f, c, mayor = 0, menor = 0;
  float A[2][2], B[2][2], C[2][2];
  float suma = 0, promedio = 0;

  // LLENADO DE LA MATRIZ A , B y SUMA DE AMBAS EN MATRIZ AUXILIAR
  for (f = 0; f < 2; f++)
    for (c = 0; c < 2; c++)
    {
      printf("Da un valor para la matriz A: \n");
      scanf("%f", &A[f][c]);
      printf("Da un valor para la matriz B: \n");
      scanf("%f", &B[f][c]);
      C[f][c] = A[f][c] + B[f][c];
    }

  // IMPRIMIR MATRIZ C RESULTANTE DE LA SUMA
  for (f = 0; f < 2; f++)
  {
    for (c = 0; c < 2; c++)
    {
      printf("\t%f", C[f][c]);
    }
    printf("\n\n");
  }

  // CALCULAR el promedio de la matriz
  for (f = 0; f < 2; f++)
    for (c = 0; c < 2; c++)
    {
      suma = suma + C[f][c];
      promedio = suma / 4;
    }

  // DETERMINAR Cuantos valores almacenados son mayores a dicho promedio, y cuantos son menores.
  for (f = 0; f < 2; f++)
    for (c = 0; c < 2; c++)
    {
      if (C[f][c] > promedio)
        mayor++;
      else
        menor++;
    }

  // IMPRIMIR El valor del promedio y la cantidad de valores que son mayores y menores al promedio.
  printf("\nEl promedio es: %f\n", promedio);

  printf("\nValores mayores al promedio:  %d ----- Valores menores al promedio: %d",
         mayor, menor);

  system("pause");
}