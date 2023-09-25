#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define n 4

// PROTOTIPOS DE LAS FUNCIONES
void llenar(void);
void imprimir(void);
void busqueda_cansada(void);
void busqueda_con_centinela(void);
void busqueda_binaria(void);

void modificar(void); // AGREGARLE LA PARTE DE LA MODIFICACION Y ELIMINACION
void eliminar(void);
void menu(void);

FILE *archivo;

struct libro
{
   int clave;
   char titulo[50];
   char autor[30];
   char editorial[30];
   int anio;
} libros[n]; // ARREGLO DE LA ESTRUCTURA

// FUNCION PRINCIPAL *********************************
void main()
{

   int opcion;

   do
   {
      system("cls"); // system("cls");
      menu();
      scanf("%i", &opcion);
      switch (opcion)
      {
      case 1:
         llenar();
         break;
      case 2:
         imprimir();
         getch();
         break;
      case 3:
         busqueda_cansada();
         getch();
         break;
      case 4:
         busqueda_con_centinela();
         getch();
         break;
      case 5:
         busqueda_binaria();
         getch();
         break;
      case 6:
         modificar();
         getch();
         break;
      case 7:
         eliminar();
         getch();
         break;
      default:
         printf("No es una opcion valida");
      }
      fflush(stdin);
      // clrscr();//system("cls");
   } while (opcion != 6);

   getch();
}

void menu(void)
{
   system("cls");
   printf("1) Crear archivo\n");
   printf("2) Leer archivo\n");
   printf("3) Busqueda cansada\n");
   printf("4) Busqueda con centinela\n");
   printf("5) Busqueda binaria\n");
   printf("6) Salir\n");
   printf("7) Modificar\n");
   printf("8) Eliminar\n");
   printf("\t\t\tOpcion: ");
}

// DEFINICION DE FUNCIONES
void llenar(void)
{
   int i;
   archivo = fopen("C:\\prueba\\libros.bin", "wb");
   for (i = 0; i < n; i++)
   {
      printf("Clave del libro: \n");
      scanf("%d", &libros[i].clave);
      fflush(stdin);
      printf("Titulo del libro: \n");
      gets(libros[i].titulo);
      printf("Autor del libro: \n");
      gets(libros[i].autor);
      printf("Editorial del libro \n");
      gets(libros[i].editorial);
      printf("Editado en: \n");
      scanf("%d", &libros[i].anio);
      fwrite(&libros[i], sizeof(struct libro), 1, archivo);
   }
   fclose(archivo);
}

void imprimir(void)
{
   int i;
   archivo = fopen("C:\\prueba\\libros.bin", "rb");
   for (i = 0; i < n; i++)
   {
      fread(&libros[i], sizeof(struct libro), 1, archivo);
      printf("Clave del libro:%d\n", libros[i].clave);
      printf("Titulo del libro:%s\n", libros[i].titulo);
      printf("Autor del libro: %s\n", libros[i].autor);
      printf("Editorial del libro %s\n", libros[i].editorial);
      printf("Editado en: %d\n", libros[i].anio);
      printf("\n\n");
   }
   fclose(archivo);
}

void busqueda_cansada(void)
{
   int i, valor;
   printf("Da una clave a buscar");
   scanf("%d", &valor);
   archivo = fopen("C:\\prueba\\libros.bin", "rb");
   for (i = 0; i < n; i++)
   {
      fread(&libros[i], sizeof(struct libro), 1, archivo);
      if (valor == libros[i].clave)
         printf("\nEncontrado\n");
      else
         printf("\nNo Encontrado\n");
   }
   fclose(archivo);
}

void busqueda_con_centinela(void)
{
   int i, valor, encontro = -1, pos;
   printf("Da una clave a buscar");
   scanf("%d", &valor);
   archivo = fopen("C:\\prueba\\libros.bin", "rb");
   // COMPARAR, ENCONTRAR Y MARCAR LA POSICION DEL VALOR ENCONTRADO
   for (i = 0; i < n; i++)
   {
      fread(&libros[i], sizeof(struct libro), 1, archivo);
      if (valor == libros[i].clave) // SE HAGA VERDADERO
      {
         encontro = 1; // ESTE ES EL CENTINELA, SEMAFORO O BANDERA
         pos = i;
      }
   }
   fclose(archivo);

   // **************VALIDA QUE SI SE ENCONTRO E IMPRIME EL MENSAJE APROPIADO
   if (encontro == 1)
   {
      printf("\n******************Encontrado en la posicion %d***************\n", pos);
      printf("Clave del libro:%d\n", libros[pos].clave);
      printf("Titulo del libro:%s\n", libros[pos].titulo);
      printf("Autor del libro: %s\n", libros[pos].autor);
      printf("Editorial del libro %s\n", libros[pos].editorial);
      printf("Editado en: %d\n", libros[pos].anio);
      printf("\n\n");
   }
   else
      printf("\nNo Encontrado\n");
}

void busqueda_binaria(void)
{

   int i, clave, inf = 0, sup = n, mitad;
   char band = 'F';
   archivo = fopen("C:\\prueba\\libros.bin", "rb");
   printf("\nProporciona la clave del libro a buscar: ");
   scanf("%i", &clave);

   for (i = 0; i < n; i++)
   {
      fread(&libros[i], sizeof(struct libro), 1, archivo);

      while (inf <= sup) // Este ciclo se usa para encontrar la mitad del arreglo
      {
         mitad = (inf + sup) / 2;
         if (libros[mitad].clave == clave)
            band = 'V';
         break;
      } // fin del while

      if (libros[mitad].clave > clave)
      {
         sup = mitad;
         mitad = (inf + sup) / 2;
      }

      if (libros[mitad].clave < clave)
      {
         inf = mitad;
         mitad = (inf + sup) / 2;
      }

   } // for

   if (band == 'V')
   {
      printf("\n\nClave del libro: %i", libros[mitad].clave);
      printf("\nTitulo del libro: %s", libros[mitad].titulo);
      printf("\nAutor del libro: %s", libros[mitad].autor);
      printf("\nEditorial del libro: %s", libros[mitad].editorial);
      printf("\nEditado en: %i", libros[mitad].anio);
   }
   else if (band == 'F')
   {
      printf("\n\nNo se encuentra");
   }
   fclose(archivo);

   // HACER EL GRUPO B
} // fin de la funcion

void modificar(void)
{
   int i, clave;
   archivo = fopen("C:\\prueba\\libros.bin", "a");
   printf("\nProporcione la clave del libro para modificar sus datos: ");
   scanf("%d", &clave);

   for (i = 0; i < n; i++)
   {
      printf("Nueva Clave del libro: \n");
      scanf("%d", &libros[i].clave);
      fflush(stdin);
      printf("Nuevo Titulo del libro: \n");
      gets(libros[i].titulo);
      printf("Nuevo Autor del libro: \n");
      gets(libros[i].autor);
      printf("Nuevo Editorial del libro \n");
      gets(libros[i].editorial);
      printf("Nuevo Editado en: \n");
      scanf("%d", &libros[i].anio);
      fwrite(&libros[i], sizeof(struct libro), 1, archivo);
   }
   fclose(archivo);
}

void eliminar()
{
   int i, clave;

   FILE *temporal;

   //*****************ELIMINACION *****************************
   printf("\nProporciona la clave del libro para eliminar sus datos:");
   scanf("%d", &clave);

   archivo = fopen("C:\\prueba\\libros.bin", "rb");
   for (i = 0; i < n; i++) // AQUI USO EL CICLO FOR PARA BUSCAR EL VECTOR DE ESTRUCTURAS
   {
      fread(&libros[i], sizeof(struct libro), 1, archivo);
      if (clave == libros[i].clave)
      {
         libros[i].clave = 0;
         strcpy(libros[i].titulo, "Nada");
         strcpy(libros[i].autor, "Nada");
         strcpy(libros[i].editorial, "Nada");
         libros[i].anio = 0;
      }
   }

   temporal = fopen("C:\\prueba\\temporal.bin", "wb");
   for (i = 0; i < n; i++)
   {
        fread(&libros[i], sizeof(struct libro, 1, archivo);
        if(libros[i].clave != 0)
        {
         fwrite(&hoteles[i], sizeof(struct libro), 1, temporal);
        }
   }
   fclose(archivo);
   fclose(temporal);
   remove("C:\\prueba\\libros.bin");
   rename("C:\\prueba\\temporal.bin", "C:\\prueba\\libros.bin");

   for (i = 0; i < n; i++)
   {
      fread(&libros[i], sizeof(struct libro), 1, archivo);
      printf("Clave del libro:%d\n", libros[i].clave);
      printf("Titulo del libro:%s\n", libros[i].titulo);
      printf("Autor del libro: %s\n", libros[i].autor);
      printf("Editorial del libro %s\n", libros[i].editorial);
      printf("Editado en: %d\n", libros[i].anio);
      printf("\n\n");
   }
   fclose(archivo);
   printf("\nOperacion finalizada. Presione cualquier tecla para continuar.");
   getch();
   system("cls");
}
