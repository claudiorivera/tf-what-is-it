import * as tfnode from "@tensorflow/tfjs-node";
import * as mobilenet from "@tensorflow-models/mobilenet";

const handler = async (req, res) => {
  try {
    const base64 = req.body.image.split(",")[1];
    const model = await mobilenet.load();
    const image = tfnode.node.decodeImage(new Buffer.from(base64, "base64"));
    const predictions = await model.classify(image);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
