/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package practica004;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;

/**
 *
 * @author Reiso
 */
public class Metodos {

    public class ModeloDeDatosCompartido {

        private static DefaultTableModel modelo = new DefaultTableModel();

        public static DefaultTableModel getModelo() {
            return modelo;
        }
    }

    private static void cargarDatosDesdeArchivoTabla(String archivo, JTable table) {
        DefaultTableModel model = (DefaultTableModel) table.getModel();
        try (BufferedReader br = new BufferedReader(new FileReader(archivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                // Dividir la línea en columnas (por ejemplo, utilizando tabuladores como separadores)
                String[] columnas = linea.split("\t");

                // Añadir fila al modelo de la tabla
                model.addRow(columnas);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}