const tfnode = require("@tensorflow/tfjs-node");
const mobilenet = require("@tensorflow-models/mobilenet");

let mobilenetModel;

const initMobileNetModel = async () => {
  if (mobilenetModel) return;
  mobilenetModel = await mobilenet.load();
};

const handler = async (req, res) => {
  try {
    await initMobileNetModel();
    const data = req.body.image.split(",")[1];
    const image = tfnode.node.decodeImage(new Buffer.from(data, "base64"));
    const predictions = await mobilenetModel.classify(image);
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "50mb",
    },
  },
};
