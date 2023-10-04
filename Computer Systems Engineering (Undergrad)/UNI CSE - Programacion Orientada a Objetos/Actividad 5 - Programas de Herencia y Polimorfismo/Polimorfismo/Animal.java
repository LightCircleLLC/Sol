package Polimorfismo;

class Animal {
    public void makeSound() {
      System.out.println("Grr...");
    }
  }
  class Cat extends Animal {
    public void makeSound() {
      System.out.println("Meow");
    }
  }
  class Dog extends Animal {
    public void makeSound() {
      System.out.println("Woof");
    }
  }