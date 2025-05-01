import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, require: true, minLength: 1, maxLength: 100 },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
