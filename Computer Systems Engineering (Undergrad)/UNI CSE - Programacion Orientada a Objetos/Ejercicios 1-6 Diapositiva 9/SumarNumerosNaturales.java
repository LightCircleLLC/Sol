public class SumarNumerosNaturales {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            sum += i;
            System.out.println("Suma parcial para " + i + " numeros naturales: " + sum);
        }
    }
}