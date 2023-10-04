import java.util.Scanner;

public class CelsiusAFahrenheit {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in)){
            System.out.print("Teclee una temperatura en Celsius: ");
            double tempCelsius = input.nextDouble();
            double tempFahrenheit = Celsius(tempCelsius);
            System.out.println(tempCelsius + " grados Celsius es igual a " + tempFahrenheit + " grados Fahreinheit.");
        }
    }

    public static double Celsius(double tempCelsius) {
        double tempFahrenheit = (tempCelsius * 9 / 5) + 32;
        return tempFahrenheit;
    }
}