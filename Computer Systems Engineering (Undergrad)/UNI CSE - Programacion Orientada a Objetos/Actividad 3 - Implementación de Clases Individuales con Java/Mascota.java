public class Mascota {
    private String propietario;
    private String nombreMascota;
    private int edadEnMeses;

    public Mascota() {
        this.propietario = "";
        this.nombreMascota = "";
        this.edadEnMeses = 0;
    }

    public Mascota(String propietario, String nombreMascota, int edadEnMeses) {
        this.propietario = propietario;
        this.nombreMascota = nombreMascota;
        this.edadEnMeses = edadEnMeses;
    }

    public void setPropietario(String propietario) {
        this.propietario = propietario;
    }

    public String getPropietario() {
        return propietario;
    }

    public void setNombreMascota(String nombreMascota) {
        this.nombreMascota = nombreMascota;
    }

    public String getNombreMascota() {
        return nombreMascota;
    }

    public void setEdadEnMeses(int edadEnMeses) {
        this.edadEnMeses = edadEnMeses;
    }

    public int getEdadEnMeses() {
        return edadEnMeses;
    }
}
