import java.util.Scanner;

public class CalculadoraPreciosEnvio {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in)){
            System.out.print("Inserta el peso del paquete en kilogramos: ");
            double weight = input.nextDouble();
            System.out.print("Inserta la distancia del envio en kilometros: ");
            double distancia = input.nextDouble();

            double costoPorKg = 0.0;
            if (distancia >= 0 && distancia <= 500) {
                costoPorKg = 50.0;
            } else if (distancia > 500 && distancia <= 10000) {
                costoPorKg = 100.0;
            } else if (distancia > 10000) {
                costoPorKg = 500.0;
            }
    
            double costoTotal = weight * costoPorKg;
            System.out.println("El costo de envio para un paquete que pesa " + weight + " kg y que recorre " + distancia + " km es " + costoTotal + " MXN.");
        }
    }
}