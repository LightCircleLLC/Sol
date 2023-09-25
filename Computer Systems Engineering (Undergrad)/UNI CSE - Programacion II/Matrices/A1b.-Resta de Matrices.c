#include<stdio.h>
#include<conio.h>
//Hacer un programa que lea 2 matrices cuadradas con valores enteros
//Realizar la suma de ambas y almacenar en una tercera matriz

int main(void)
{
  int A[2][2], B[2][2], C[2][2], f, c;

  //LLENADO DE LA MATRIZ A , B y RESTA DE AMBAS
	for(f=0; f<2; f++)
   	for(c=0; c<2; c++)
      {
      	printf("Da un valor para la matriz A: \n");
         scanf("%d", &A[f][c]);
         printf("Da un valor para la matriz B: \n");
         scanf("%d", &B[f][c]);
         C[f][c]= A[f][c] + B[f][c];
      }

     //IMPRIMIR MATRIZ C RESULTANTE DE LA RESTA
	for(f=0; f<2; f++)
   {
   	for(c=0; c<2; c++)
      {
      	printf("\t%d", C[f][c]);
      }
      printf("\n\n");
   }

   getch();

}
