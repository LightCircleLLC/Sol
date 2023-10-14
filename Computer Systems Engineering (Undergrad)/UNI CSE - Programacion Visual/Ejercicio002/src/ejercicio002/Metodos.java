/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ejercicio002;

/**
 *
 * @author Reiso
 */
public class Metodos {

    private double cantidadDolares;
    private double cantidadEuros;
    private double tasaDolarAPeso;
    private double tasaEuroAPeso;

    public double convertirDolaresAPesos(double cantidadDolares, double tasaDolarAPeso) {
        if (cantidadDolares < 0) {
            System.out.println("La cantidad de dólares no puede ser negativa.");
            return -1;
        }
        double pesos = cantidadDolares * tasaDolarAPeso;
        return pesos;
    }

    // Método para convertir euros a pesos
    public double convertirEurosAPesos(double cantidadEuros, double tasaEuroAPeso) {
        if (cantidadEuros < 0) {
            System.out.println("La cantidad de euros no puede ser negativa.");
            return -1;
        }
        double pesos = cantidadEuros * tasaEuroAPeso;
        return pesos;
    }

}
