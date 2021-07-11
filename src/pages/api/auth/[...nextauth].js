import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

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
    database: process.env.MONGODB_URI,
    callbacks: {
        async redirect(url, baseUrl) {
            return url.startsWith(baseUrl)
                ? 'http://localhost:3000'
                : baseUrl
        },
        async session(session, token) {
            const { id, province, address, phoneNumber } = token;
            console.log(token);
            session.user.id = id;
            session.user.province = province;
            session.user.address = address;
            session.user.phoneNumber = phoneNumber;

            return session;
        }
    },

    pages: {
        newUser: '/signup'
    }

}

export default (req, res) => NextAuth(req, res, options);