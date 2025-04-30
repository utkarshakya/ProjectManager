import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
