import java.util.Scanner;

public class OperacionesAritmeticas {
   public static void main(String[] args) {
      
      Scanner scanner = new Scanner(System.in);
      double num1, num2, resultado;
      char operacion;
      
      System.out.println("Ingrese el primer número:");
      num1 = scanner.nextDouble();
      
      System.out.println("Ingrese el segundo número:");
      num2 = scanner.nextDouble();
      
      System.out.println("Ingrese la operación a realizar (+,-,*,/):");
      operacion = scanner.next().charAt(0);
      
      switch (operacion) {
         case '+':
            resultado = num1 + num2;
            System.out.println(num1 + " + " + num2 + " = " + resultado);
            break;
         case '-':
            resultado = num1 - num2;
            System.out.println(num1 + " - " + num2 + " = " + resultado);
            break;
         case '*':
            resultado = num1 * num2;
            System.out.println(num1 + " * " + num2 + " = " + resultado);
            break;
         case '/':
            resultado = num1 / num2;
            System.out.println(num1 + " / " + num2 + " = " + resultado);
            break;
         default:
            System.out.println("Operación inválida.");
            break;
      }
      
      scanner.close();
   }
}