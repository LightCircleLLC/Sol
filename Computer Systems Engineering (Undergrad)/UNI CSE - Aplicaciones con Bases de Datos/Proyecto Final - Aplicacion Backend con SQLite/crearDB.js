import { crearDB } from "./src/helpers/crearDB.js";

console.log("\n🗄️  Creando base de datos CDAS...");
console.log("─".repeat(40));

try {
    crearDB();
    console.log("─".repeat(40));
    console.log("✅ Base de datos creada y poblada correctamente.\n");
} catch (error) {
    console.error("❌ Error al crear la base de datos:", error.message);
    process.exit(1);
}
