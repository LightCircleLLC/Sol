// MODIFICAR EL CODIGO PARA QUE EN BASE A UNA CALIFICACION FINAL DE UN ALUMNO
// DETERMINE SI ESTA APROBADO O REPROBADO
// VERSION NUMERO 2
#include <stdio.h>
#include <conio.h>
#define n 5 // Numero de alumnos a evaluar

int main(void)
{
  int calificaciones[n]; // Este arreglo es un VECTOR
  int i;                 // Contador

  for (i = 0; i < n; i++) // i=i+1;
  {
    printf("\nProporcione la calificacion del alumno %d: \n", i);
    scanf("%d", &calificaciones[i]);
    if (calificaciones[i] >= 70)
      printf("El alumno ha APROBADO.\n");
    else
      printf("El alumno ha REPROBADO.\n");
  }
  getch();
}