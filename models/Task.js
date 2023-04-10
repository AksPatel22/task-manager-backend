const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxlength: 25,
      trim: true,
    },
    completed: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
    description: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    deadline: {
      type: Date,
      validate: {
        validator: function (value) {
          const currentDate = new Date().setHours(0, 0, 0, 0);
          const inputDate = new Date(value).setHours(0, 0, 0, 0);
          return inputDate >= currentDate;
        },
        message:
          "Please provide a valid deadline (dd-mm-yyyy) greater than or equal to today",
      },
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
