/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ejercicio001;

/**
 *
 * @author Reiso
 */
public class Metodos {
    public Metodos(){}
    
    public float getOperacionesCelsiusF(float x){
        return (float)((x*1.8) + 32.0);
    }
    
    public float getOperacionesFahrenheitC(float x){
        return (float)((x - 32) / 1.8);
    }
    
}

