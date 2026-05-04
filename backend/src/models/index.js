import Room from "./Room.js";
import Question from "./Question.js";
import Users from "./Users.js";

// Define associations
Room.hasMany(Question, {
  foreignKey: "roomId",
  as: "questions",
});

Question.belongsTo(Room, {
  foreignKey: "roomId",
  as: "room",
});

Users.hasMany(Room, {
  foreignKey: "userId",
  as: "rooms",
});

Room.belongsTo(Users, {
  foreignKey: "userId",
  as: "user",
});

export { Room, Question, Users };




