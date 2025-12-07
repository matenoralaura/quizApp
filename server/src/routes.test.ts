import request from 'supertest';
import express from 'express';
import { User } from './model/User';
import { configureRoutes } from './routes/routes';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed_password'),
  genSalt: jest.fn().mockResolvedValue('salt')
})); // mac-en dolgozok, a bcrypt valószínűleg linuxra fordult => not a mach-o file. Így nem száll el hibával a teszt.

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.user = "fake_user_id";
    next();
});

const router = express.Router();
app.use('/', configureRoutes({} as any, router));


describe('GET /currentUserRole', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 for user asd with admin role', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({
            _id: 'fake_user_id',
            username: 'asd',
            role: 'admin'
        } as any);

        const response = await request(app).get('/currentUserRole');

        expect(response.status).toBe(200);
        expect(response.body).toBe(true);
    });

    it('should return 500 for simple user (no role)', async () => {
        jest.spyOn(User, 'findOne').mockResolvedValue({
            username: 'Bela',
        } as any);

        const response = await request(app).get('/currentUserRole');

        expect(response.status).toBe(500);
        expect(response.body).toBe(false);
    });
});