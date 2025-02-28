import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import User, { IUser } from '../models/user';

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user as IUser | null);
    } catch (error) {
        done(error, null);
    }
});

// Configuração do Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'default_google_client_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'default_google_client_secret',
    callbackURL: '/auth/google/callback'
},
    async (token: string, tokenSecret: string, profile: any, done: (error: any, user?: any) => void) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: '',
                    role: 'USER',
                } as IUser);
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

// Configuração do Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || 'default_facebook_app_id',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'default_facebook_app_secret',
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
},
    async (token: string, tokenSecret: string, profile: any, done: (error: any, user?: any) => void) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: '',
                    role: 'USER',
                } as IUser);
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

// Configuração do LinkedIn Strategy
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY || 'default_linkedin_key',
    clientSecret: process.env.LINKEDIN_SECRET || 'default_linkedin_secret',
    callbackURL: '/auth/linkedin/callback',
    scope: ['r_emailaddress', 'r_liteprofile'],
},
    async (token: string, tokenSecret: string, profile: any, done: (error: any, user?: any) => void) => {
        try {
            let user = await User.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: '',
                    role: 'USER',
                } as IUser);
                await user.save();
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

export default passport;
