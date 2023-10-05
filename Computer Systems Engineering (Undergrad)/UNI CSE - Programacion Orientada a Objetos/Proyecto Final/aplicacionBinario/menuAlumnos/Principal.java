/*PROYECTO FINAL DE PROGRAMACION ORIENTADA A OBJETOS
<<Sistema de Control con Altas, Bajas, Consultas y Modificaciones en Java>>
*/
import java.io.*;
import java.util.*;

public class Principal {
   static Scanner stdIn;
   static String input;

   public static void main(String[] args) throws IOException {
      stdIn = new Scanner(System.in);
      File file = new File("Codigo804.dat");
      File ftemp = new File("archTmp.dat");

      ManejoArchivo ma = new ManejoArchivo();
      int opcion;

      RandomAccessFile archivo = null; // Variable para almacenar el archivo

      try {
         archivo = new RandomAccessFile(file, "rw"); // Abrir el archivo
         do {
            opcion = menu();
            switch (opcion) {
               case 1:
                  ma.Agregar(archivo);
                  break;
               case 2:
                  ma.Buscar(archivo);
                  break;
               case 3:
                  ma.Editar(archivo);
                  break;
               case 4:
                  ma.Mostrar(archivo);
                  break;
               case 5:
                  try {
                     if (ma.Abrir(1, "Codigo804.dat", "rw") && ma.Abrir(2, "archTmp.dat", "rw")) {
                        try {
                           ma.pasaReg(ManejoArchivo.archivo, ManejoArchivo.archTemp);
                        } finally {
                           ManejoArchivo.archivo.close();
                           ManejoArchivo.archTemp.close();
                        }
                        ma.elimArc(file, ftemp);
                     }
                  } catch (IOException e) {
                     System.out.println("Ocurrió un error: " + e.getMessage());
                  }
                  break;
               case 6:
                  ma.ElimLogica(archivo);
                  break;
            } // fin de switch
         } while (opcion != 7);
      } finally {
         if (archivo != null) {
            archivo.close(); // Cerrar el archivo al finalizar
         }
      }

      System.out.println("Bye");
   }// fin de main

   public static int menu() {
      int opc = 7;
      System.out.print("\n\t1)Agregar\n\t2)Buscar\n\t3)Editar\n\t4)Mostrar");
      System.out.println("\n\t5)Eliminar Fis\n\t6)EliminarLog\n\t7)Salir");
      System.out.print("Elige opcion: ");
      opc = stdIn.nextInt();
      return opc;
   } // fin de menu
}// fin de clase Principal