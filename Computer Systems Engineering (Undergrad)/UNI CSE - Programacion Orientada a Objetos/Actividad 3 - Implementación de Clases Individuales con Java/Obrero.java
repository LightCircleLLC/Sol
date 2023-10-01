public class Obrero {
    private int numEmp;
    private int numHrsTra;
    private float pagoXhora;

    public Obrero() {
        this.numEmp = 0;
        this.numHrsTra = 0;
        this.pagoXhora = 0.0f;
    }

    public Obrero(int numEmp, int numHrsTra, float pagoXhora) {
        this.numEmp = numEmp;
        this.numHrsTra = numHrsTra;
        this.pagoXhora = pagoXhora;
    }

    public void setnumEmp(int numEmp) {
        this.numEmp = numEmp;
    }

    public int getNumEmp() {
        return numEmp;
    }

    public void setnumHrsTra(int numHrsTra) {
        this.numHrsTra = numHrsTra;
    }

    public int getNumHrsTra() {
        return numHrsTra;
    }

    public void setpagoXhora(float pagoXhora) {
        this.pagoXhora = pagoXhora;
    }

    public float getPagoXhora() {
        return pagoXhora;
    }
}
