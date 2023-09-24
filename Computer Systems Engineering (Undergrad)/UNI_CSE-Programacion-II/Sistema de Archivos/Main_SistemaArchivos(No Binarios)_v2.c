#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// OPERACIONES CON SISTEMA DE ARCHIVOS NO BINARIOS

// PROTOTIPOS
void crear_archivo(void);
void imprimir_archivo(void);
void anadir_archivo(void);
void eliminar_archivo(void);
void menu(void);

// VARIABLE GLOBAL
FILE *archivo;
char linea[80] = {00};

int main(void) //
{
	char opcion;

	do
	{
		menu();
		fflush(stdin);
		scanf("%c", &opcion);

		switch (opcion)
		{
		case 'A':
			crear_archivo();
			break;
		case 'a':
			crear_archivo();
			break;
		case 'B':
			imprimir_archivo();
			break;
		case 'b':
			imprimir_archivo();
			break;
		case 'C':
			anadir_archivo();
			break;
		case 'c':
			anadir_archivo();
			break;
		case 'D':
			eliminar_archivo();
			break;
		case 'd':
			eliminar_archivo();
			break;
		case 'E':
			printf("Elegiste salir, vuelva pronto!");
			break;
		case 'e':
			printf("Elegiste salir, vuelva pronto!");
			break;
		default:
			printf("Opcion no valida, intente de nuevo!");
			system("pause");
			break;
		}
		system("cls");
	} while (opcion != 'E' && opcion != 'e');

	getch();
}

// AQUI ES DONDE SE HACEN LOS CODIGOS
void crear_archivo(void)
{
	char ruta[60];
	char nombre[30];
	char linea[80];

	strcpy(ruta, "D:\\Documents\\");
	printf("Da el nombre del archivo a crear: ");
	fflush(stdin);
	scanf("%[^\n]", &nombre);
	strcat(ruta, nombre);
	strcat(ruta, ".txt");

	archivo = fopen(ruta, "w"); // crea el archivo de nuevo y pierde lo que tenga
	printf("Introduce tu texto: ");
	fflush(stdin);
	fgets(linea, 80, stdin);
	fputs(linea, archivo);
	fclose(archivo);
	puts("\nArchivo Creado\n");
	system("pause");
}

void imprimir_archivo(void)
{
	char ruta[60];
	char nombre[30];
	char linea[80];

	strcpy(ruta, "D:\\Documents\\");
	printf("Da el nombre del archivo a leer: ");
	fflush(stdin);
	scanf("%[^\n]", &nombre);
	strcat(ruta, nombre);
	strcat(ruta, ".txt");

	archivo = fopen(ruta, "r");

	// Condicional para revisar valor retornado por la funcion
	if ((archivo = fopen(ruta, "r")) == NULL)
	{
		printf("Error al abrir archivo.");
		exit(1);
	}

	fscanf(archivo, "%[^\n]", &linea);
	printf("Tu texto es: ", linea);
	puts(linea);
	fclose(archivo);
	system("pause");
}

void anadir_archivo(void)
{
	char ruta[60];
	char nombre[30];
	char linea[80];

	strcpy(ruta, "D:\\Documents\\");
	printf("Da el nombre del archivo a modificar (Se creara uno nuevo si no existe): ");
	fflush(stdin);
	scanf("%[^\n]", &nombre);
	strcat(ruta, nombre);
	strcat(ruta, ".txt");

	archivo = fopen(ruta, "a"); // Agrega a un archivo en una nueva linea, si no encuentra el archivo lo crea.
	printf("\nIntroduce tu texto: ");
	fflush(stdin);
	fgets(linea, 80, stdin);
	fprintf(archivo, " %s", linea);
	fclose(archivo);
	puts("\nArchivo modificado.\n");
	system("pause");
}

void eliminar_archivo(void)
{
	int valor_retorno;
	char ruta[60];
	char nombre[30];
	char linea[80];

	strcpy(ruta, "D:\\Documents\\");
	printf("Da el nombre del archivo a eliminar: ");
	fflush(stdin);
	scanf("%[^\n]", &nombre);
	strcat(ruta, nombre);
	strcat(ruta, ".txt");

	valor_retorno = remove(ruta); // Elimina un archivo permanentemente.

	if (valor_retorno == 0) // Condicional para revisar valor retornado por la funcion
	{
		printf("Archivo borrado correctamente.");
	}
	else
	{
		printf("Error: No se pudo borrar el archivo.");
	}

	system("pause");
}

void menu(void)
{
	printf("\n-----Menu de operaciones con archivos-----\n");
	printf("A) Crear archivo\n");
	printf("B) Leer archivo\n");
	printf("C) Editar archivo\n");
	printf("D) Eliminar archivo\n");
	printf("E) Salir\n");
	printf("\nOpcion: ");
}
