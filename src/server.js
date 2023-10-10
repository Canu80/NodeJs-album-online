import express from "express";
import MongoStore from "connect-mongo";
import session from "express-session";
import cors from "cors";
import { PORT, MONGODB_URI, KEY } from "./config/config.js";
import videoModels from "./models/video.models.js";

//Inicializations
const app = express();
app.use(cors({
  origin: 'https://canu80.github.io/album-online/',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true,
}));

//Settings
app.set("port", PORT);
app.use(express.json());
app.use(
  session({
    store: new MongoStore({
      mongoUrl: MONGODB_URI,
      ttl: 3600,
    }),
    secret: KEY,
    resave: false,
    saveUninitialized: false,
  })
);

//Get videos
app.get("/api/videos", async (req, res) => {
  try {
    const videos = await videoModels.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error al obtener los videos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Save videos
app.post("/api/videos", async (req, res) => {
  try {
    const { id, title, description, duration, thumbnailUrl } = req.body;
    const nuevoVideo = new videoModels({
      id,
      title,
      description,
      duration,
      thumbnailUrl,
    });
    await nuevoVideo.save();
    res.status(201).json({ message: "Video guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar el video:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Delete videos
app.delete("/api/videos/:videoId", async (req, res) => {
  const { videoId } = req.params;
  try {
    const resultado = await videoModels.findOneAndDelete({ id: videoId });
    if (!resultado) {
      res.status(404).json({ error: "Video no encontrado" });
    } else {
      res.status(200).json({ message: "Video eliminado con éxito" });
    }
  } catch (error) {
    console.error("Error al eliminar el video:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
  

export default app;
