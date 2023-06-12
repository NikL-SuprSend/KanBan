const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

});

const TaskSchema = new Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  comments: [{ name: String, text: String, id: String }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// const BoardSchema = new Schema({
//   title: { type: String, required: true },
//   createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
//   members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }]
// });

// const ColumnSchema = new Schema({
//   title: { type: String, required: true },
//   tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
// });

// const TaskSchema = new Schema({
//   title: { type: String, required: true },
//   description: String,
//   dueDate: Date,
//   assignedTo: [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   labels: [String],
//   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
// });

// const CommentSchema = new Schema({
//   text: String,
//   createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
//   createdAt: { type: Date, default: Date.now }
// });

const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);
// const Board = mongoose.model('Board', BoardSchema);
// const Column = mongoose.model('Column', ColumnSchema);
// const Task = mongoose.model('Task', TaskSchema);
// const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { User,Task  };
