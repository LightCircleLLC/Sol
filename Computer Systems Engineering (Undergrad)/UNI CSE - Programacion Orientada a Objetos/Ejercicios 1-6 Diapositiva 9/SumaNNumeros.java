import java.util.Scanner;

public class SumaNNumeros {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in)){
            System.out.print("Inserte el valor de N (entero positivo): ");
            int n = input.nextInt();
            int sum = (n * (n + 1)) / 2;
            System.out.println("La suma de los primeros " + n + " numeros es " + sum);
        }
    }
}