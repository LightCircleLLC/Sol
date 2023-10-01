import java.util.Scanner;

public class AsignacionFamiliar {
   public static void main(String[] args) {
      
      Scanner scanner = new Scanner(System.in);
      int numHijos;
      double asignacion = 0;
      
      System.out.println("Ingrese el número de hijos:");
      numHijos = scanner.nextInt();
      
      if (numHijos == 1) {
         asignacion = 500;
      } else if (numHijos == 2) {
         asignacion = 750;
      } else if (numHijos > 2) {
         asignacion = 1000;
      }
      
      System.out.println("La asignación familiar es: $" + asignacion);
      
      scanner.close();
   }
}