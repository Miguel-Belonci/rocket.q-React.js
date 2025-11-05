import Room from "./Room.js";
import Question from "./Question.js";

// Define associations
Room.hasMany(Question, {
  foreignKey: "roomId",
  as: "questions",
});

Question.belongsTo(Room, {
  foreignKey: "roomId",
  as: "room",
});

export { Room, Question };




