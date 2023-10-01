public class Persona {
    private String nombre;
    private int edad;
    private String RFC;
    private char sexo;
    private double peso;
    private double altura;

    // Default constructor
    public Persona() {
        nombre = "";
        edad = 0;
        RFC = "";
        sexo = 'H';
        peso = 0;
        altura = 0;
    }

    // Constructor con nombre, edad, y sexo
    public Persona(String nombre, int edad, char sexo) {
        this.nombre = nombre;
        this.edad = edad;
        this.sexo = sexo;
        RFC = "";
        peso = 0;
        altura = 0;
    }

    // Constructor con todos los atributos
    public Persona(String nombre, int edad, String RFC, char sexo, double peso, double altura) {
        this.nombre = nombre;
        this.edad = edad;
        this.RFC = RFC;
        this.sexo = sexo;
        this.peso = peso;
        this.altura = altura;
    }

    // Metodos Setters y Getters
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

    public int getEdad() {
        return edad;
    }

    public void setRFC(String RFC) {
        this.RFC = RFC;
    }

    public String getRFC() {
        return RFC;
    }

    public void setSexo(char sexo) {
        this.sexo = sexo;
    }

    public char getSexo() {
        return sexo;
    }

    public void setPeso(double peso) {
        this.peso = peso;
    }

    public double getPeso() {
        return peso;
    }

    public void setAltura(double altura) {
        this.altura = altura;
    }

    public double getAltura() {
        return altura;
    }
}
