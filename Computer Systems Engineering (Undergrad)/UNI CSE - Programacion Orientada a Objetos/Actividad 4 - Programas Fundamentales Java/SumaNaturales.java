public class SumaNaturales {
    public static void main(String[] args) {
       
       int n = 100;
       int suma = 0;
       
       for (int i = 1; i <= n; i++) {
          suma += i;
          System.out.println("Suma parcial hasta " + i + ": " + suma);
       }
    }
 }