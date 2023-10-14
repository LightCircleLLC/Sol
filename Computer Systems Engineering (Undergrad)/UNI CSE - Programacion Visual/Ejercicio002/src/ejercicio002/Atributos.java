/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ejercicio002;

/**
 *
 * @author Reiso
 */
public class Atributos {

    // Atributos para las tasas de cambio
    private double cantidadDolares;
    private double cantidadEuros;
    private double tasaDolarAPeso;
    private double tasaEuroAPeso;

    // Constructor para inicializar las tasas de cambio
    public Atributos(double cantidadDolares, double cantidadEuros, double tasaDolarAPeso, double tasaEuroAPeso) {
        this.cantidadDolares = cantidadDolares;
        this.cantidadEuros = cantidadEuros;
        this.tasaDolarAPeso = tasaDolarAPeso;
        this.tasaEuroAPeso = tasaEuroAPeso;
    }
    
    public double getCantidadDolares(){
        return cantidadDolares;
    }
    
    public double getCantidadEuros(){
        return cantidadEuros;
    }

    public double getTasaDolarAPeso() {
        return tasaDolarAPeso;
    }

    public double getTasaEuroAPeso() {
        return tasaEuroAPeso;
    }
}
