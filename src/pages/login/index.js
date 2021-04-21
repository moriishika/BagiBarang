import Link from "next/link";

const Login = (props) => {
    return (
        <div className="bg-gray-100 h-screen w-full">
            <div className="bg-white h-20">
                <Link href='/'>
                    <svg className="h-20 w-20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

export default Login;