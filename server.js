require('dotenv').config({ path: `${process.cwd()}/.env` });
const express = require('express');
const app = express();

const authRouter = require('./router/authRoute');
const projectRouter = require('./router/projectRoute');
const userRouter = require('./router/userRoute');

const catchAsync = require('./utils/catchAsync');
const { default: AppError } = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

app.use(express.json());

// all routes will be here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/users', userRouter);

app.use('*',
    catchAsync(
        async (req) => {
            throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
        }
    )
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});