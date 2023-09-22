#include<stdio.h>
#include<conio.h>
#include<string.h>
#include<stdlib.h>

void menu();
void altas();
void mostrar();
void buscar();
void modificar();
void eliminar();
void salir();

FILE *archivo;

//USANDO LA DEFINICION #1
struct hotel
{
    int clave_huesped;
    int numero_piso;
    int numero_habitacion;
    int numero_diashospedar;
    char huesped[50];
} hoteles[2]; //AQUI DEFINO EL VECTOR DE ESTRUCTURAS QUE ME PERMITA ALMANCENAR MAS DATOS (2 Elementos)

int main()
{
    while(1)
        menu();

    getch();
}

void menu ()
{
    int opcion;
    system("COLOR 2");
    system("cls");
    printf("HOTEL LAS ESTRELLAS");
    printf("\nSERVICIOS DEL HOTEL - SISTEMA DE CONTROL DE HUESPEDES");
    printf("\n\n1.ALTAS");
    printf("\n2.MOSTRAR TODOS");
    printf("\n3.BUSCAR");
    printf("\n4.MODIFICAR");
    printf("\n5.ELIMINAR");
    printf("\n6.SALIR");

    printf("\n\nElija una opcion.\n");
    scanf("%d",&opcion);

    switch(opcion)
    {
    case 1:
    {
        altas();
        break;
    }

    case 2:
    {
        mostrar();
        break;
    }

    case 3:
    {
        buscar();
        break;
    }

    case 4:
    {
        modificar();
        break;
    }

    case 5:
    {
        eliminar();
        break;
    }

    case 6:
    {
        salir();
        break;
    }
    }
}

void altas ()
{
    //*****************LLENADO*****************************
    int i; //Declaracion local de contador

    archivo = fopen("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin", "wb");

    for(i=0; i<2; i++)// AQUI USO EL CICLO FOR PARA LLENAR EL VECTOR DE ESTRUCTURAS
    {
        printf("\nInserte la clave del huesped[%d]:\n", i+1);
        scanf("%d",&hoteles[i].clave_huesped);
        getchar();
        printf("\nNombre del huesped[%d]:\n", i+1); //Llenado por el usuario
        gets(hoteles[i].huesped); // get string
        printf("Numero del piso:\n");
        scanf("%d",&hoteles[i].numero_piso);
        printf("Numero de habitacion:\n");
        scanf("%d",&hoteles[i].numero_habitacion);
        printf("Numero de dias a hospedar:\n");
        scanf("%d",&hoteles[i].numero_diashospedar);
        fwrite(&hoteles[i], sizeof(struct hotel), 1, archivo);
    }fclose(archivo);
    printf("\nOperacion finalizada. Presione cualquier tecla para continuar.");
    getch();
}

void mostrar ()
{
    int i;
    
    archivo = fopen("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin", "rb");
    //*****************IMPRIMIR*****************************
    for(i=0; i<2; i++)// AQUI USO EL CICLO FOR PARA IMPRIMIR EL VECTOR DE ESTRUCTURAS
    {
        fread(&hoteles[i], sizeof(struct hotel), 1, archivo);
        printf("\nClave del huesped[%d]: %d\n", i+1, hoteles[i].clave_huesped);
        printf("Nombre del huesped[%d]: %s\n",i+1, hoteles[i].huesped);
        printf("Numero del piso: %d\n", hoteles[i].numero_piso);
        printf("Numero de habitacion: %d\n", hoteles[i].numero_habitacion);
        printf("Numero de dias a hospedar: %d\n", hoteles[i].numero_diashospedar);
    }
    fclose(archivo);
    printf("\nOperacion finalizada. Presione cualquier tecla para continuar.");
    getch();
    system("cls");
}

void buscar ()
{
    int i, clave_huesped;

    archivo = fopen("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin", "rb");
    //*****************BUSCAR*****************************
    printf("\nProporcione la clave del huesped a buscar: ");
    scanf("%d",&clave_huesped);
    for(i=0; i<2; i++)// AQUI USO EL CICLO FOR PARA BUSCAR EL VECTOR DE ESTRUCTURAS
    {
        fread(&hoteles[i], sizeof(struct hotel), 1, archivo);
        if(clave_huesped == hoteles[i].clave_huesped)
        {
            printf("\nNombre del huesped: %s\n", hoteles[i].huesped);
            printf("Numero del piso: %d\n", hoteles[i].numero_piso);
            printf("Numero de la habitacion: %d\n", hoteles[i].numero_habitacion);
            printf("Numero de dias a hospedar: %d\n", hoteles[i].numero_diashospedar);
        }
        else
            printf("\nNo se encuentra.\n");
    } fclose(archivo);
    printf("\nOperacion finalizada. Presione cualquier tecla para continuar.");
    getch();
    system("cls");
}

void modificar ()
{
    int i, clave_huesped;

    archivo = fopen("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin", "wb");
    //*****************MODIFICACION *****************************
    printf("\nProporcione la clave del huesped para modificar sus datos:");
    scanf("%d",&clave_huesped);
    for(i=0; i<2; i++)//AQUI USO EL CICLO FOR PARA BUSCAR EL VECTOR DE ESTRUCTURAS
    {
        fwrite(&hoteles[i], sizeof(struct hotel), 1, archivo);
        if(clave_huesped == hoteles[i].clave_huesped)
        {
            printf("\nProporcione la nueva clave del huesped:\n"); //Llenado por el usuario
            scanf("%d",&hoteles[i].clave_huesped);
            getchar();
            printf("Proporcione el nuevo nombre del huesped:\n");
            gets(hoteles[i].huesped);
            printf("Proporcione el nuevo numero del piso:\n");
            scanf("%d",&hoteles[i].numero_piso);
            printf("Proporciona el nuevo numero de la habitacion:\n");
            scanf("%d",&hoteles[i].numero_habitacion);
            printf("Proporcione el nuevo numero de dias a hospedar:\n");
            scanf("%d",&hoteles[i].numero_diashospedar);
        }
    }fclose(archivo);

    for(i=0; i<2; i++)// AQUI USO EL CICLO FOR PARA IMPRIMIR EL VECTOR DE ESTRUCTURAS
    {
        printf("\nClave del huesped: %d\n", hoteles[i].clave_huesped);
        printf("Nombre del huesped: %s\n", hoteles[i].huesped);
        printf("Numero del piso: %d\n", hoteles[i].numero_piso);
        printf("Numero de habitacion: %d\n", hoteles[i].numero_habitacion);
        printf("Numero de dias a hospedar: %d\n", hoteles[i].numero_diashospedar);
    }
    printf("\nOperacion finalizada. Presione cualquier tecla para continuar.");
    getch();
    system("cls");
}

void eliminar ()
{
    int i, clave_huesped;

    FILE *temporal;

    //*****************ELIMINACION *****************************
    printf("\nProporciona la clave del huesped para eliminar sus datos:");
    scanf("%d",&clave_huesped);

    archivo = fopen("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin", "rb");
    for(i=0; i<2; i++)// AQUI USO EL CICLO FOR PARA BUSCAR EL VECTOR DE ESTRUCTURAS
    {
        fread(&hoteles[i], sizeof(struct hotel), 1, archivo);
        if(clave_huesped == hoteles[i].clave_huesped)
        {
            hoteles[i].clave_huesped = 0;
            hoteles[i].numero_piso = 0;
            hoteles[i].numero_habitacion = 0;
            hoteles[i].numero_diashospedar = 0;
            strcpy(hoteles[i].huesped, "Nada");
        }
    }

    temporal = fopen("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Temporal.bin", "wb");
    for(i = 0; i<2; i++)
    {
        fread(&hoteles[i], sizeof(struct hotel), 1, archivo);
        if(hoteles[i].clave_huesped != 0)
        {
            fwrite(&hoteles[i], sizeof(struct hotel), 1, temporal);
        }
    }
    fclose(archivo);
    fclose(temporal);
    remove("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin");
    rename("C:\\Users\\USERNAME\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Temporal.bin", "C:\\Users\\georg\\Documents\\Code Projects\\Programas de Funciones con el Sistema de Archivos Binarios\\Sistema_Hotel_Control_Huespedes.bin");

    for(i=0; i<2; i++)// AQUI USO EL CICLO FOR PARA IMPRIMIR EL VECTOR DE ESTRUCTURAS
    {
        printf("\nClave del huesped: %d\n", hoteles[i].clave_huesped);
        printf("Nombre del huesped: %s\n", hoteles[i].huesped);
        printf("Numero del piso: %d\n", hoteles[i].numero_piso);
        printf("Numero de habitacion: %d\n", hoteles[i].numero_habitacion);
        printf("Numero de dias a hospedar: %d\n", hoteles[i].numero_diashospedar);
    }
    printf("\nOperacion finalizada. Presione cualquier tecla para continuar.");
    getch();
    system("cls");
}

void salir ()
{
std:abort();
}
