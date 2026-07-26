import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  console.error('Falta la variable MONGODB_URI en .env.local');
  process.exit(1);
}

const usuariosEjemplo = [
  { nombre: "Carlos", apellido: "Arbey", cedula: "1001001", celular: "3001111111", email: "carlos.ar@example.com", fechaNacimiento: "1995-05-12", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Bogotá", password: "Password123*" },
  { nombre: "Ana María", apellido: "Gómez", cedula: "1001002", celular: "3002222222", email: "ana.gomez@example.com", fechaNacimiento: "1998-08-20", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Luna", password: "Password123*" },
  { nombre: "Juan Esteban", apellido: "Pérez", cedula: "1001003", celular: "3003333333", email: "juan.perez@example.com", fechaNacimiento: "1992-03-15", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Bandeja paisa", password: "Password123*" },
  { nombre: "Luisa Fernanda", apellido: "Torres", cedula: "1001004", celular: "3004444444", email: "luisa.torres@example.com", fechaNacimiento: "1996-11-05", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Medellín", password: "Password123*" },
  { nombre: "Andrés Felipe", apellido: "Ruiz", cedula: "1001005", celular: "3005555555", email: "andres.ruiz@example.com", fechaNacimiento: "1990-01-30", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Max", password: "Password123*" },
  { nombre: "María Camila", apellido: "Rojas", cedula: "1001006", celular: "3006666666", email: "maria.rojas@example.com", fechaNacimiento: "1999-07-22", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Pizza", password: "Password123*" },
  { nombre: "Mateo Alejandro", apellido: "Ríos", cedula: "1001007", celular: "3007777777", email: "mateo.rios@example.com", fechaNacimiento: "1994-09-10", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Cali", password: "Password123*" },
  { nombre: "Valeria Sofía", apellido: "Castro", cedula: "1001008", celular: "3008888888", email: "valeria.castro@example.com", fechaNacimiento: "1997-12-03", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Coco", password: "Password123*" },
  { nombre: "David Santiago", apellido: "Morales", cedula: "1001009", celular: "3009999999", email: "david.morales@example.com", fechaNacimiento: "1993-04-18", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Hamburguesa", password: "Password123*" },
  { nombre: "Daniela Alejandra", apellido: "Ortiz", cedula: "1001010", celular: "3011010101", email: "daniela.ortiz@example.com", fechaNacimiento: "1995-06-25", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Barranquilla", password: "Password123*" },
  { nombre: "Alejandro José", apellido: "Herrera", cedula: "1001011", celular: "3011122233", email: "alejandro.herrera@example.com", fechaNacimiento: "1991-02-14", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Rocky", password: "Password123*" },
  { nombre: "Gabriela Nicole", apellido: "Medina", cedula: "1001012", celular: "3012233344", email: "gabriela.medina@example.com", fechaNacimiento: "1998-10-09", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Pasta", password: "Password123*" },
  { nombre: "Samuel David", apellido: "Vargas", cedula: "1001013", celular: "3013344455", email: "samuel.vargas@example.com", fechaNacimiento: "1996-05-19", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Cartagena", password: "Password123*" },
  { nombre: "Mariana Alejandra", apellido: "Rojas", cedula: "1001014", celular: "3014455566", email: "mariana.rojas@example.com", fechaNacimiento: "1999-03-27", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Nala", password: "Password123*" },
  { nombre: "Nicolás Andrés", apellido: "Castro", cedula: "1001015", celular: "3015566677", email: "nicolas.castro@example.com", fechaNacimiento: "1992-08-31", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Sushi", password: "Password123*" },
  { nombre: "Isabella Sofía", apellido: "Silva", cedula: "1001016", celular: "3016677788", email: "isabella.silva@example.com", fechaNacimiento: "1997-01-04", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Bucaramanga", password: "Password123*" },
  { nombre: "Lucas Daniel", apellido: "Guzmán", cedula: "1001017", celular: "3017788899", email: "lucas.guzman@example.com", fechaNacimiento: "1994-11-21", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Zeus", password: "Password123*" },
  { nombre: "Martina Valentina", apellido: "Peña", cedula: "1001018", celular: "3018899900", email: "martina.pena@example.com", fechaNacimiento: "1995-07-16", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Ajiaco", password: "Password123*" },
  { nombre: "Joaquín Emilio", apellido: "Molina", cedula: "1001019", celular: "3019900011", email: "joaquin.molina@example.com", fechaNacimiento: "1990-10-12", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Manizales", password: "Password123*" },
  { nombre: "Catalina Andrea", apellido: "Soto", cedula: "1001020", celular: "3020011122", email: "catalina.soto@example.com", fechaNacimiento: "1998-04-02", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Kira", password: "Password123*" },
  { nombre: "Emiliano José", apellido: "Cruz", cedula: "1001021", celular: "3021122233", email: "emiliano.cruz@example.com", fechaNacimiento: "1993-12-28", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Lentejas", password: "Password123*" },
  { nombre: "Renata Victoria", apellido: "Vega", cedula: "1001022", celular: "3022233344", email: "renata.vega@example.com", fechaNacimiento: "1996-09-08", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Pereira", password: "Password123*" },
  { nombre: "Vicente Alejandro", apellido: "Campos", cedula: "1001023", celular: "3023344455", email: "vicente.campos@example.com", fechaNacimiento: "1991-06-17", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Thor", password: "Password123*" },
  { nombre: "Antonia Beatriz", apellido: "León", cedula: "1001024", celular: "3024455566", email: "antonia.leon@example.com", fechaNacimiento: "1999-02-24", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Ensalada", password: "Password123*" },
  { nombre: "Maximiliano Daniel", apellido: "Ríos", cedula: "1001025", celular: "3025566677", email: "maximiliano.rios@example.com", fechaNacimiento: "1995-10-30", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Armenia", password: "Password123*" },
  { nombre: "Julieta Esperanza", apellido: "Navarro", cedula: "1001026", celular: "3026677788", email: "julieta.navarro@example.com", fechaNacimiento: "1997-05-11", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Lola", password: "Password123*" },
  { nombre: "Thiago Gabriel", apellido: "Fuentes", cedula: "1001027", celular: "3027788899", email: "thiago.fuentes@example.com", fechaNacimiento: "1994-01-25", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Pescado", password: "Password123*" },
  { nombre: "Elena Lucía", apellido: "Salgado", cedula: "1001028", celular: "3028899900", email: "elena.salgado@example.com", fechaNacimiento: "1998-08-14", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Santa Marta", password: "Password123*" },
  { nombre: "Benjamín Mateo", apellido: "Paredes", cedula: "1001029", celular: "3029900011", email: "benjamin.paredes@example.com", fechaNacimiento: "1992-03-09", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Bobby", password: "Password123*" },
  { nombre: "Emma Sofía", apellido: "Benítez", cedula: "1001030", celular: "3030011122", email: "emma.benitez@example.com", fechaNacimiento: "1996-12-19", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Tacos", password: "Password123*" },
  { nombre: "Felipe Santiago", apellido: "Duarte", cedula: "1001031", celular: "3031122233", email: "felipe.duarte@example.com", fechaNacimiento: "1993-07-06", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Villavicencio", password: "Password123*" },
  { nombre: "Olivia Valentina", apellido: "Solano", cedula: "1001032", celular: "3032233344", email: "olivia.solano@example.com", fechaNacimiento: "1999-11-13", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Mia", password: "Password123*" },
  { nombre: "Agustín Mateo", apellido: "Espinoza", cedula: "1001033", celular: "3033344455", email: "agustin.espinoza@example.com", fechaNacimiento: "1991-04-26", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Carne asada", password: "Password123*" },
  { nombre: "Mia Isabella", apellido: "Cárdenas", cedula: "1001034", celular: "3034455566", email: "mia.cardenas@example.com", fechaNacimiento: "1997-09-01", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Ibagué", password: "Password123*" },
  { nombre: "Dante Sebastián", apellido: "Ponce", cedula: "1001035", celular: "3035566677", email: "dante.ponce@example.com", fechaNacimiento: "1995-02-18", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Bruno", password: "Password123*" },
  { nombre: "Zoe Victoria", apellido: "Pacheco", cedula: "1001036", celular: "3036677788", email: "zoe.pacheco@example.com", fechaNacimiento: "1998-06-22", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Arroz con pollo", password: "Password123*" },
  { nombre: "Bruno Alejandro", apellido: "Bravo", cedula: "1001037", celular: "3037788899", email: "bruno.bravo@example.com", fechaNacimiento: "1994-10-05", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Pasto", password: "Password123*" },
  { nombre: "Luciana Belén", apellido: "Meza", cedula: "1001038", celular: "3038899900", email: "luciana.meza@example.com", fechaNacimiento: "1996-01-29", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Princesa", password: "Password123*" },
  { nombre: "Gael Esteban", apellido: "Figueroa", cedula: "1001039", celular: "3039900011", email: "gael.figueroa@example.com", fechaNacimiento: "1992-05-08", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Sancocho", password: "Password123*" },
  { nombre: "Bianca Antonella", apellido: "Lara", cedula: "1001040", celular: "3040011122", email: "bianca.lara@example.com", fechaNacimiento: "1999-08-17", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Neiva", password: "Password123*" },
  { nombre: "Camilo Andrés", apellido: "Parra", cedula: "1001041", celular: "3041122233", email: "camilo.parra@example.com", fechaNacimiento: "1991-12-04", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Negro", password: "Password123*" },
  { nombre: "Regina Monserrat", apellido: "Acuña", cedula: "1001042", celular: "3042233344", email: "regina.acuna@example.com", fechaNacimiento: "1997-03-23", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Tamal", password: "Password123*" },
  { nombre: "Simón Ezequiel", apellido: "Ovalle", cedula: "1001043", celular: "3043344455", email: "simon.ovalle@example.com", fechaNacimiento: "1995-07-11", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Popayán", password: "Password123*" },
  { nombre: "Alma Florencia", apellido: "Calderón", cedula: "1001044", celular: "3044455566", email: "alma.calderon@example.com", fechaNacimiento: "1998-11-29", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Canela", password: "Password123*" },
  { nombre: "Dominic Emmanuel", apellido: "Arias", cedula: "1001045", celular: "3045566677", email: "dominic.arias@example.com", fechaNacimiento: "1993-04-15", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Lasagna", password: "Password123*" },
  { nombre: "Amelia Celeste", apellido: "Zúñiga", cedula: "1001046", celular: "3046677788", email: "amelia.zuniga@example.com", fechaNacimiento: "1996-09-02", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Tunja", password: "Password123*" },
  { nombre: "Francisco Javier", apellido: "Beltrán", cedula: "1001047", celular: "3047788899", email: "francisco.beltran@example.com", fechaNacimiento: "1990-02-10", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Sultán", password: "Password123*" },
  { nombre: "Paulina Jimena", apellido: "Quevedo", cedula: "1001048", celular: "3048899900", email: "paulina.quevedo@example.com", fechaNacimiento: "1999-06-18", preguntaSeguridad: "¿Cuál es tu comida favorita?", respuestaSeguridad: "Patacón", password: "Password123*" },
  { nombre: "Leonardo Manuel", apellido: "Roldán", cedula: "1001049", celular: "3049900011", email: "leonardo.roldan@example.com", fechaNacimiento: "1994-12-25", preguntaSeguridad: "¿Cuál es tu ciudad de nacimiento?", respuestaSeguridad: "Valledupar", password: "Password123*" },
  { nombre: "Valery Dayana", apellido: "Meléndez", cedula: "1001050", celular: "3050011122", email: "valery.melendez@example.com", fechaNacimiento: "1997-08-07", preguntaSeguridad: "¿Cuál es el nombre de tu primera mascota?", respuestaSeguridad: "Chispa", password: "Password123*" }
];

async function seedDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('viaja_colombia');
    const collection = db.collection('users');

    await collection.deleteMany({});
    const result = await collection.insertMany(usuariosEjemplo);
    console.log(`¡${result.insertedCount} usuarios insertados con éxito con todos los campos del formulario!`);
  } catch (error) {
    console.error("Error al insertar usuarios:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();