package CalculadoraMain;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Reiso
 */
import java.lang.Math;

// Clase base para representar figuras geométricas
public class FigurasGeometricas {
    // Atributo común para todas las figuras: Nombre de la figura
    private String nombre;

    // Constructor
    public FigurasGeometricas(String nombre) {
        this.nombre = nombre;
    }

    // Método getter para obtener el nombre de la figura
    public String getNombre() {
        return nombre;
    }
}

// Clase para representar un Cuadrado
class Cuadrado extends FigurasGeometricas {
    // Atributo específico del Cuadrado: Lado
    private double lado;

    // Constructor
    public Cuadrado(String nombre, double lado) {
        super(nombre);
        this.lado = lado;
    }

    // Método para calcular el área del Cuadrado
    public double calcularArea() {
        return lado * lado;
    }
}

// Clase para representar un Círculo
class Circulo extends FigurasGeometricas {
    // Atributo específico del Círculo: Radio
    private double radio;

    // Constructor
    public Circulo(String nombre, double radio) {
        super(nombre);
        this.radio = radio;
    }

    // Método para calcular el área del Círculo
    public double calcularArea() {
        return Math.PI * radio * radio;
    }
}

// Clase para representar un Triángulo
class Triangulo extends FigurasGeometricas {
    // Atributos específicos del Triángulo: Base y Altura
    private double base;
    private double altura;

    // Constructor
    public Triangulo(String nombre, double base, double altura) {
        super(nombre);
        this.base = base;
        this.altura = altura;
    }

    // Método para calcular el área del Triángulo
    public double calcularArea() {
        return (base * altura) / 2.0;
    }
}

// Clase para representar un Trapecio
class Trapecio extends FigurasGeometricas {
    // Atributos específicos del Trapecio: Base Mayor, Base Menor y Altura
    private double baseMayor;
    private double baseMenor;
    private double altura;

    // Constructor
    public Trapecio(String nombre, double baseMayor, double baseMenor, double altura) {
        super(nombre);
        this.baseMayor = baseMayor;
        this.baseMenor = baseMenor;
        this.altura = altura;
    }

    // Método para calcular el área del Trapecio
    public double calcularArea() {
        return ((baseMayor + baseMenor) * altura) / 2.0;
    }
}
