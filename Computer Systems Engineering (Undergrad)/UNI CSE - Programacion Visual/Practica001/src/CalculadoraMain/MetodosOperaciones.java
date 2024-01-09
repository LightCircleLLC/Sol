package CalculadoraMain;

/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

/**
 *
 * @author Reiso
 */
public class MetodosOperaciones {
    public MetodosOperaciones(){}
    
    public int getOperaciones(int x, int y){
        return (x + y);
    }
    
    public float getOperaciones(int x, float y){
        return (float)(x - y);
    }
    
    public float getOperaciones(float x, int y){
        return (float)(x * y);
    }
    
    public float getOperaciones(float x, float y){
        return (x / y);
    }
    
}
