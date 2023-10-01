import java.util.Scanner;

public class CalculoEdad {
   public static void main(String[] args) {
      
      Scanner scanner = new Scanner(System.in);
      int anioNacimiento, anioActual, edad;
      
      System.out.println("Ingrese el año de nacimiento:");
      anioNacimiento = scanner.nextInt();
      
      System.out.println("Ingrese el año actual:");
      anioActual = scanner.nextInt();
      
      edad = anioActual - anioNacimiento;
      
      System.out.println("La edad es: " + edad);
      
      scanner.close();
   }
}