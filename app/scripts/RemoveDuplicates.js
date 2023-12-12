import Airline from "@/db/models/airline";
import { connectDB } from "@/db/mongodb";

export const removeDuplicates = async () => {
  try {
    await connectDB()
    // Identifica documentos duplicados basados en IATA_code
    const duplicates = await Airline.aggregate([
      {
        $group: {
          _id: "$IATA_code",
          count: { $sum: 1 },
          docs: { $push: "$_id" },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ]);

    // Elimina documentos duplicados
    for (const duplicate of duplicates) {
      const [toKeep, ...toDelete] = duplicate.docs;
      await Airline.deleteMany({ _id: { $in: toDelete } });
      console.log(
        `Documentos eliminados para ${duplicate._id}: ${toDelete.length}`
      );
    }

    console.log("Proceso completado. Documentos duplicados eliminados.");
  } catch (error) {
    console.error("Error durante el proceso:", error);
  } finally {
  }
};
