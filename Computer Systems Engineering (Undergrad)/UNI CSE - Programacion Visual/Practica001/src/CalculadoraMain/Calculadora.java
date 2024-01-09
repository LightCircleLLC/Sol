package CalculadoraMain;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Reiso
 */
public class Calculadora {
    // Atributos
    private int entero1 = 0;
    private int entero2 = 0;
    private int entero3 = 0;
    private int entero4 = 0;
    private float flotante1 = 0.0f;
    private float flotante2 = 0.0f;
    private float flotante3 = 0.0f;
    private float flotante4 = 0.0f;

    // Resultados de operaciones
    private int resultadoSuma = 0;
    private float resultadoResta = 0.0f;
    private float resultadoMultiplicacion = 0.0f;
    private float resultadoDivision = 0.0f;

    // Constructor
    public Calculadora(int entero1, int entero2, int entero3, int entero4, float flotante1, float flotante2, float flotante3, float flotante4) {
        this.entero1 = entero1;
        this.entero2 = entero2;
        this.entero3 = entero3;
        this.entero4 = entero4;
        this.flotante1 = flotante1;
        this.flotante2 = flotante2;
        this.flotante3 = flotante3;
        this.flotante4 = flotante4;
    }
    
    public Calculadora(){
    }

    // Métodos para realizar operaciones
    public void realizarSuma(int entero1, int entero2) {
        resultadoSuma = entero1 + entero2;
    }

    public void realizarResta(int entero3, float flotante1) {
        resultadoResta = entero3 - flotante1;
    }

    public void realizarMultiplicacion(int entero4, float flotante2) {
        resultadoMultiplicacion = flotante2 * entero4;
    }

    public void realizarDivision(float flotante3, float flotante4) {
        if (flotante4 != 0) {
            resultadoDivision = flotante3 / flotante4;
        } else {
            System.out.println("Error: No se puede dividir entre cero.");
        }
    }
    
    public int getEntero1(){
        return entero1;
    }
    
    public int getEntero2(){
        return entero2;
    }
    
    public int getEntero3(){
        return entero3;
    }
    
    public int getEntero4(){
        return entero4;
    }
    
    public float getFlotante1(){
        return flotante1;
    }
    
    public float getFlotante2(){
        return flotante2;
    }
    
    public float getFlotante3(){
        return flotante3;
    }
    
    public float getFlotante4(){
        return flotante4;
    }

    // Métodos getter para obtener los resultados de las operaciones
    public int getResultadoSuma() {
        return resultadoSuma;
    }

    public float getResultadoResta() {
        return resultadoResta;
    }

    public float getResultadoMultiplicacion() {
        return resultadoMultiplicacion;
    }

    public float getResultadoDivision() {
        return resultadoDivision;
    }

    // Métodos setter si es necesario modificar los valores de los atributos
    public void setEntero1(int entero1) {
        this.entero1 = entero1;
    }

    public void setEntero2(int entero2) {
        this.entero2 = entero2;
    }

    public void setEntero3(int entero3) {
        this.entero3 = entero3;
    }

    public void setEntero4(int entero4) {
        this.entero4 = entero4;
    }

    public void setFlotante1(float flotante1) {
        this.flotante1 = flotante1;
    }

    public void setFlotante2(float flotante2) {
        this.flotante2 = flotante2;
    }

    public void setFlotante3(float flotante3) {
        this.flotante3 = flotante3;
    }

    public void setFlotante4(float flotante4) {
        this.flotante4 = flotante4;
    }
}