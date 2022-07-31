import { GitHubStrategy } from "../utils/strategy";
import passport from "passport";

passport.serializeUser((user: any, done: any) => done(null, user));
passport.deserializeUser((obj: any, done: any) => done(null, obj));

passport.use(GitHubStrategy);