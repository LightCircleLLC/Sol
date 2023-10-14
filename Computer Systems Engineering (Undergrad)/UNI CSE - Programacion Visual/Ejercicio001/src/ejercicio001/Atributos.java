/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ejercicio001;

/**
 *
 * @author Reiso
 */
public class Atributos {
    private float celsius = 0.0f;
    private float fahrenheit = 0.0f;

    public Atributos(float celsius) {
        this.celsius = celsius;
        this.fahrenheit = (celsius * 9/5) + 32;
    }

    public Atributos(float celsius, float fahrenheit) {
        this.celsius = celsius;
        this.fahrenheit = fahrenheit;
    }

    public float getCelsius() {
        return celsius;
    }

    public void setCelsius(float celsius) {
        this.celsius = celsius;
        this.fahrenheit = (celsius * 9/5) + 32;
    }

    public float getFahrenheit() {
        return fahrenheit;
    }

    public void setFahrenheit(float fahrenheit) {
        this.fahrenheit = fahrenheit;
        this.celsius = (fahrenheit - 32) * 5/9;
    }
}
