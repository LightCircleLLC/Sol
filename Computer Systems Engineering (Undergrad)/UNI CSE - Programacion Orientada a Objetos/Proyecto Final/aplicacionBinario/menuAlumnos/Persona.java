public class Persona {
   private String nombre, apellido;
   private int edad, numeroIdentificacion;
   private long telefono;

   public Persona() {
      numeroIdentificacion = 0;
      nombre = "";
      apellido = "";
      edad = 0;
      telefono = 0;
   } // Constructor

   public Persona(int numeroIdentificaciion, String nombre, String apellido, int edad, int telefono) {
      this.numeroIdentificacion = numeroIdentificacion;
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.telefono = telefono;
   } // Constructor

   // Métodos get y set

   public void setNumeroIdentificacion(int numeroIdentificacion){
      this.numeroIdentificacion = numeroIdentificacion;
   }

   public void setNombre(String nombre) {
      this.nombre = nombre;
   }

   public void setApellido(String apellido) {
      this.apellido = apellido;
   }

   public void setEdad(int edad) {
      this.edad = edad;
   }

   public void setTelefono(long telefono) {
      this.telefono = telefono;
   }

   public void setTodo(String nombre, String apellido, int edad, int telefono) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.edad = edad;
      this.telefono = telefono;
   }

   public String getNombre() {
      return nombre;
   }

   public String getApellido() {
      return apellido;
   }

   public int getEdad() {
      return edad;
   }

   public long getTelefono() {
      return telefono;
   }

   public int getNumeroIdentificacion(){
      return numeroIdentificacion;
   }
}