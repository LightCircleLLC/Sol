import java.util.Scanner;

public class SubsidioAlquilerVivienda {
    public static void main(String[] args) {
        try (Scanner input = new Scanner(System.in)){
            System.out.print("Inserta el salario basico del empleado en MXN: ");
            double salario = input.nextDouble();
    
            double subsidio = 0.0;
            if (salario > 10000.0) {
                subsidio = 0.3 * salario;
            } else {
                subsidio = 0.2 * salario;
            }
            System.out.println("El subsidio del empleado por alquiler de vivienda es " + subsidio + " MXN.");
        }
    }
}