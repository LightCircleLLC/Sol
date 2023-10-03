package JerarquiaClases2;

public class Taxi extends Vehiculo {
    private String numeroLicencia;
    
    public Taxi(String matricula, String modelo, int potenciaCV, String numeroLicencia) {
        super(matricula, modelo, potenciaCV);
        this.numeroLicencia = numeroLicencia;
    }
    
    public void setNumeroLicencia(String numeroLicencia) {
        this.numeroLicencia = numeroLicencia;
    }
    
    public String getNumeroLicencia() {
        return numeroLicencia;
    }
}