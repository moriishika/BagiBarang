import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from "next-auth/adapters"
import Models from '../../../models';

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
    ],
    adapter: Adapters.TypeORM.Adapter(
        process.env.MONGODB_URI+process.env.DB_NAME,
        // The second argument can be used to pass custom models and schemas
        {
            models: {
                User: Models.User,
            }
        }),
    callbacks: {
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl)
                ? 'http://localhost:3000'
                : baseUrl
        },
        async session(session, token) {
            console.log(token);
            const { id, province, address, phoneNumber, isVerified } = token;
            session.user.id = id;
            session.user.province = province;
            session.user.address = address;
            session.user.phoneNumber = phoneNumber;
            session.user.isVerified = isVerified;

            return session;
        }
    },

    pages: {
        newUser: '/accounts/edit'
    }

}

export default (req, res) => NextAuth(req, res, options);