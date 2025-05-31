const http = require('http');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');

const AppError = require('./utils/app-error');
const userRouter = require('./routes/user');
const lostItemRouter = require('./routes/lost-item');
const foundItemRouter = require('./routes/found-item');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));

app.use('/users', userRouter);
app.use('/lost-item', lostItemRouter);
app.use('/found-item', foundItemRouter);

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.log('🌟🌟🌟', err);

  res.status(500).json({
    status: 500,
    message: 'Something Went Wrong.',
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*', // update for security
  },
});

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  // Join user to their unique room
  socket.on('join', userId => {
    socket.join(userId);
  });

  // Handle private messages
  socket.on('private_message', async ({ from, to, message }) => {
    io.to(to).emit('private_message', { from, message });
    console.log({ from, to, message });
    await Message.create({ from, to, message });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

module.exports = server;
