#include<stdio.h>
#include<conio.h>
//Hacer un programa que lea 2 matrices cuadradas con valores float
//Realizar la division de ambas y almacenar en una tercera matriz

int main(void)
{
  int c, f;
  float A[2][2], B[2][2], C[2][2];

  //LLENADO DE LA MATRIZ A , B y DIVISIÓN DE AMBAS
	for(f=0; f<2; f++)
   	for(c=0; c<2; c++)
      {
      	printf("Da un valor para la matriz A: \n");
         scanf("%f", &A[f][c]);
         printf("Da un valor para la matriz B: \n");
         scanf("%f", &B[f][c]);
         C[f][c]= A[f][c] / B[f][c];
      }

     //IMPRIMIR MATRIZ C RESULTANTE DE LA DIVISIÓN
	for(f=0; f<2; f++)
   {
   	for(c=0; c<2; c++)
      {
      	printf("\t%f", C[f][c]);
      }
      printf("\n\n");
   }

   getch();

}
