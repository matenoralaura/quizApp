import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { PassportStatic } from 'passport';
import { User } from '../model/User';
import { Quiz } from '../model/Quiz';
import { Types } from 'mongoose';


export const configureRoutes = (passport: PassportStatic, router: Router): Router => {

    router.get('/', (req: Request, res: Response) => {
        res.status(200).send('Hello, World!');
    });

    router.get('/callback', (req: Request, res: Response) => {
        let myClass = new MainClass();
        myClass.monitoringCallback((error, result) => {
            if (error) {
                res.write(error);
                res.status(400).end();
            } else {
                res.write(result);
                res.status(200).end();
            }
        });
    });

    router.post('/login', (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', (error: string | null, user: typeof User) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if (!user) {
                    res.status(400).send('User not found.');
                } else {
                    req.login(user, (err: string | null) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Internal server error.');
                        } else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    });

    router.post('/register', (req: Request, res: Response) => {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const address = req.body.address;
        const nickname = req.body.nickname;
        const user = new User({email: email, password: password, name: name, address: address, nickname: nickname, points: 0});
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/new-quiz', (req: Request, res: Response) => {

        console.log(req, "req")

        const quizName = req.body.quizName;
        const question = req.body.question;
        const answer1 = JSON.parse(req.body.answer1);
        const answer2 = JSON.parse(req.body.answer2);
        const answer3 = JSON.parse(req.body.answer3);
        const answer4 = JSON.parse(req.body.answer4);
        const createdAt = new Date();

        const quiz = new Quiz({
            quizName: quizName,
            question: question,
            answer1: answer1,
            answer2: answer2,
            answer3: answer3,
            answer4: answer4,
            createdAt: createdAt
        });
        quiz.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });

    router.post('/logout', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Internal server error.');
                }
                res.status(200).send('Successfully logged out.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/getAllUsers', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = User.find();
            query.then(data => {
                res.status(200).send(data.sort((a, b) => b.points - a.points));
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/quizzes', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const query = Quiz.find();
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    router.get('/checkAuth', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    router.get('/currentUserRole', async (req: Request, res: Response) => {
        const u = await User.findOne({
            _id: req.user
        })

        if (u?.role === "admin") {
            res.status(200).send(true);            
        } else {
            res.status(500).send(false);
        }
    });

    router.patch('/updatePoints', async (req: Request, res: Response) => {
        try {
            await User.updateOne(
                { _id: req.user },
                { $inc: { points: 1 } }
            );
            res.status(200).send("Points updated successfully");
        } catch (error) {
            console.error("Error updating points:", error);
            res.status(500).send("An error occurred while updating points");
        }
    });

    router.delete('/deleteUser', (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
            const id = req.query.id;
            const query = User.deleteOne({_id: id});
            query.then(data => {
                res.status(200).send(data);
            }).catch(error => {
                console.log(error);
                res.status(500).send('Internal server error.');
            })
        } else {
            res.status(500).send('User is not logged in.');
        }
    });

    return router;
}