import java.io.*;
import java.util.*;

public class ManejoArchivo {
   static RandomAccessFile archivo, archTemp;
   static Scanner stdIn = new Scanner(System.in);
   static String input;

   // ========================================================================
   public boolean Abrir(int na, String nomArch, String modo) {
      try {
         if (na == 1)
            archivo = new RandomAccessFile(nomArch, modo);
         else
            archTemp = new RandomAccessFile(nomArch, modo);
         return true;
      } catch (FileNotFoundException e) {
         System.out.println("No existe archivo");
         return false;
      }
   } // Metodo para abrir archivos

   // ========================================================================
   private boolean Escribe(RandomAccessFile archivo, Persona a) {
      try {
         archivo.writeInt(a.getNumeroIdentificacion());
         archivo.writeUTF(a.getNombre());
         archivo.writeUTF(a.getApellido());
         archivo.writeInt(a.getEdad());
         archivo.writeLong(a.getTelefono());
         return true;
      } catch (IOException e) {
         System.out.println("IOE: " + e);
         return false;
      }
   } // Escribe Archivo

   // ========================================================================
   private void Imprime(Persona a) {
      System.out.print(a.getNumeroIdentificacion() + ",");
      System.out.print(a.getNombre() + ",");
      System.out.print(a.getApellido() + ",");
      System.out.print(a.getEdad() + ",");
      System.out.println(a.getTelefono());
   } // Imprime todos los datos de la persona

   // ========================================================================
   public String getCadena(String sdato, int n) {
      if ((sdato.length() > 0) && (sdato.length() < n)) {
         for (int i = sdato.length(); i < n; i++)
            sdato += " ";
      } else {
         if (sdato.length() > n)
            sdato = sdato.substring(0, n);
      }
      return sdato;
   } // getCadena - Metodo para leer Strings

   // ========================================================================
   public void Agregar(RandomAccessFile archivo) {
      Persona a = new Persona();
      try {
         archivo.seek(archivo.length());// Se agrega al final del archivo
         System.out.print("Numero de Identificacion (ID): ");
         input = stdIn.nextLine();
         a.setNumeroIdentificacion(Integer.parseInt(input));
         System.out.print("Nombre: ");
         a.setNombre(getCadena(stdIn.nextLine(), 30));
         System.out.print("Apellido: ");
         a.setApellido(getCadena(stdIn.nextLine(), 30));
         System.out.print("Edad: ");
         input = stdIn.nextLine();
         a.setEdad(Integer.parseInt(input));
         System.out.print("Telefono: ");
         input = stdIn.nextLine();
         a.setTelefono(Long.parseLong(input));
         Escribe(archivo, a);
      } catch (IOException e) {
         System.out.println("IOException " + e);
      }
   } // Agregar - Agrega nuevas entradas al archivo binario

   // ========================================================================
   public void Buscar(RandomAccessFile archivo) throws IOException {
      int numeroIdentificacion = 0;
      Persona a = new Persona();
      try {
         System.out.print("Numero de Identificacion (ID): ");
         input = stdIn.nextLine();
         numeroIdentificacion = Integer.parseInt(input);

         if (numeroIdentificacion > 0) {
            archivo.seek(0);
            while (numeroIdentificacion != a.getNumeroIdentificacion()) {
               a.setNumeroIdentificacion(archivo.readInt());
               a.setNombre(archivo.readUTF());
               a.setApellido(archivo.readUTF());
               a.setEdad(archivo.readInt());
               a.setTelefono(archivo.readLong());
            }
            Imprime(a);
         }
      } catch (EOFException e) {
         System.out.println("No se encontro el numero de identificacion: " + numeroIdentificacion);
      }
   } // Buscar - Busca registros basados en su ID

   // ========================================================================
   public void Mostrar(RandomAccessFile archivo) throws IOException {
      Persona a = new Persona();
      try {
         archivo.seek(0);
         while (true) {
            a.setNumeroIdentificacion(archivo.readInt());
            a.setNombre(archivo.readUTF());
            a.setApellido(archivo.readUTF());
            a.setEdad(archivo.readInt());
            a.setTelefono(archivo.readLong());
            if (a.getNumeroIdentificacion() != -1) {
               Imprime(a);
            }
            archivo.seek(archivo.getFilePointer());
         } // while
      } catch (EOFException e) {// Encontro fin de archivo
         System.out.println("Fin de archivo");
      }
   }// Mostrar - Muestra UNICAMENTE los registros que NO han sido marcados como eliminados

   // ========================================================================
   public void Editar(RandomAccessFile archivo) throws IOException {
      int numeroIdentificacion = 0;
      int edad;
      long telefono, posicion;

      Persona a = new Persona();

      try {
         System.out.print("Numero de identificacion (): ");
         input = stdIn.nextLine();
         numeroIdentificacion = Integer.parseInt(input);

         if (numeroIdentificacion > 0) {
            archivo.seek(0);
            do {
               posicion = archivo.getFilePointer();
               archivo.seek(posicion);
               a.setNumeroIdentificacion(numeroIdentificacion);
               a.setNombre(archivo.readUTF());
               a.setApellido(archivo.readUTF());
               a.setEdad(archivo.readInt());
               a.setTelefono(archivo.readLong());
            } while (numeroIdentificacion != a.getNumeroIdentificacion());
            if (numeroIdentificacion == a.getNumeroIdentificacion()) {
               System.out.print("Datos encontrados para ID: " + numeroIdentificacion);
               System.out.print("\nNuevo nombre: ");
               input = getCadena(stdIn.nextLine(), 30);
               a.setNombre((input.length() > 0) ? input : a.getNombre());
               System.out.print("Nuevo apellido: ");
               input = getCadena(stdIn.nextLine(), 30);
               a.setApellido((input.length() > 0) ? input : a.getApellido());
               System.out.print("Nueva edad: ");
               input = stdIn.nextLine();
               edad = Integer.parseInt(input);
               a.setEdad((edad > 0) ? edad : a.getEdad());
               System.out.print("Nuevo telefono ");
               input = stdIn.nextLine();
               telefono = Long.parseLong(input);
               a.setTelefono((telefono > 0) ? telefono : a.getTelefono());
               archivo.seek(posicion);
               Escribe(archivo, a);
            }
         }
      } catch (EOFException e) {// Encontro fin de archivo
         System.out.println("No se encontro numero de identificacion: " + numeroIdentificacion);
      }
   }// Editar - Modifica entradas existentes basados en su ID

   // ========================================================================
   public void ElimLogica(RandomAccessFile archivo) throws IOException {
      int numeroIdentificacion = 0;
      long posicion;
      Persona a = new Persona();
      try {
         System.out.print("Numero de identificacion: ");
         input = stdIn.nextLine();
         numeroIdentificacion = Integer.parseInt(input);
         if (numeroIdentificacion > 0) {
            archivo.seek(0);
            do {
               posicion = archivo.getFilePointer();
               archivo.seek(posicion);
               a.setNumeroIdentificacion(archivo.readInt());
               a.setNombre(archivo.readUTF());
               a.setApellido(archivo.readUTF());
               a.setEdad(archivo.readInt());
               a.setTelefono(archivo.readLong());
            } while (numeroIdentificacion != a.getNumeroIdentificacion());
            if (numeroIdentificacion == a.getNumeroIdentificacion()) {
               Imprime(a);
               archivo.seek(posicion);
               a.setNumeroIdentificacion(-1);// El -1 indica eliminado
               Escribe(archivo, a);
            }
         }
      } catch (EOFException e) {// Encontro fin de archivo
         System.out.println("No se encontro numero de control: " + numeroIdentificacion);
      }
   }// Elim Logica - Marca registros como eliminados pero no los borra fisicamente

   public void pasaReg(RandomAccessFile archivo, RandomAccessFile archTemp) {
      Persona a = new Persona();
      try {
         if (Abrir(1, "Codigo804.dat", "rw") && Abrir(2, "archTmp.dat", "rw")) {
            archivo.seek(0);
            archTemp.seek(0);
            while (archivo.getFilePointer() < archivo.length()) {
               a.setNumeroIdentificacion(archivo.readInt());
               a.setNombre(archivo.readUTF());
               a.setApellido(archivo.readUTF());
               a.setEdad(archivo.readInt());
               a.setTelefono(archivo.readLong());
               if (a.getNumeroIdentificacion() != -1) {
                  Escribe(archTemp, a);
                  Imprime(a);
               } else { // Solo muestra en pantalla
                  System.out.print("Registro marcado como eliminado: ");
                  Imprime(a);
               }
            } // fin de while
         } // fin de if abrir
      } // fin de try
      catch (IOException ve) {
         System.out.println("Error I/O: " + ve);
      }
      try {
         System.out.println("Cerrando archivos");
         archivo.close();
         archTemp.close();
      } catch (IOException ve) {
         System.out.println("Ocurrio error: " + ve);
      }
   }// Elim Fisica - Borra archivos fisicamente

   public void elimArc(File file, File ftemp) {
      try {
         if (file.exists()) {
            System.out.println("Codigo804.dat= " + file.length());

            // Cerrar los archivos antes de renombrarlos
            archivo.close();
            archTemp.close();

            boolean renameSuccess = ftemp.renameTo(file);
            if (renameSuccess) {
               System.out.println("archTemp renombrado");
               System.out.println("Codigo804.dat=" + file.length());
               boolean deleteSuccess = file.delete();
               if (deleteSuccess) {
                  System.out.println("Codigo804.dat eliminado");
               } else {
                  System.out.println("No se pudo eliminar Codigo804.dat");
               }
            } else {
               System.out.println("No se pudo renombrar el archivo temporal");
            }
         }
      } catch (IOException e) {
         System.out.println("Ocurrió un error: " + e.getMessage());
      } finally {
         try {
            if (archivo != null) {
               archivo.close();
            }
            if (archTemp != null) {
               archTemp.close();
            }
         } catch (IOException e) {
            System.out.println("Error al cerrar los archivos: " + e.getMessage());
         }
      }
   } // Borrado de Archivos
}
// ManejoArchivo