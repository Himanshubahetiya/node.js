const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { AdminJS } = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const User = require('./models/User');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/students', require('./routes/studentRoutes'));
app.use('/customers', require('./routes/customerRoutes'));
const { deleteUser } = require('./controllers/userController');
app.use('/login', require('./routes/loginRoutes'));



app.get('/', (req, res) => {
  res.send('HELLO guys');
});

// Connect to DB
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 

  // AdminJS setup
  const admin = new AdminJS({
    resources: [
      {
        resource: User,
        options: {
          properties: {
            _id: { isVisible: { edit: false, list: false, show: true } },
            createdAt: { isVisible: { edit: false, list: true, show: true } },
            updatedAt: { isVisible: { edit: false, list: true, show: true } }
          },
          actions: {
            delete: {
              actionType: 'record',
              handler: async (request, response, context) => {
                const { record } = context;
                if (!record) {
                  throw new Error('Record not found');
                }
  
                const userId = record.param('_id');
                await deleteUser({ params: { id: userId } }, response);
                return {
                  redirectUrl: '/admin/resources/User',
                };
              },
            },
          },
        },
      },
    ],

    rootPath: '/admin',
  });  

  
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      const ADMIN = {
        email: 'admin@example.com',
        password: 'password'
      };
  
      if (email === ADMIN.email && password === ADMIN.password) {
        return ADMIN;
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: 'some-super-secret-cookie'
  });
  
  app.use(admin.options.rootPath, adminRouter);

  console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
}).catch((err) => console.log(err));

AdminJS.registerAdapter(AdminJSMongoose);