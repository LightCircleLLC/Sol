public class Libro {
    private String titulo;
    private String autor;
    private int numEjemplares;
    private int numPrestado;

    // Default constructor
    public Libro() {
    }

    // Constructor con parametros
    public Libro(String titulo, String autor, int numEjemplares, int numPrestado) {
        this.titulo = titulo;
        this.autor = autor;
        this.numEjemplares = numEjemplares;
        this.numPrestado = numPrestado;
    }

    // Metodos Setters y Getters
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getAutor() {
        return autor;
    }

    public void setNumEjemplares(int numEjemplares) {
        this.numEjemplares = numEjemplares;
    }

    public int getNumEjemplares() {
        return numEjemplares;
    }

    public void setNumPrestado(int numPrestado) {
        this.numPrestado = numPrestado;
    }

    public int getNumPrestado() {
        return numPrestado;
    }
}