const errors = {
    Signin: "Mohon untuk menggunakan akun yang lain",
    OAuthSignin: "Mohon untuk menggunakan akun yang lain",
    OAuthCallback: "Mohon untuk menggunakan akun yang lain",
    OAuthCreateAccount: "Mohon untuk menggunakan akun yang lain",
    EmailCreateAccount: "Mohon untuk menggunakan akun yang lain",
    Callback: "Mohon untuk menggunakan akun yang lain",
    OAuthAccountNotLinked:
      "Email dari akun yang anda coba gunakan sudah terdaftar, anda bisa gunakan akun anda yang lain",
    EmailSignin: "Tolong periksa Email anda",
    CredentialsSignin:
      "Login gagal, mohon untuk memeriksa email dan password yang anda berikan",
    default: "Login gagal",
  };

const LoginError = ({error}) => {
    const errorMessage = error && (errors[error] ?? errors.default);
    return <h1 className="my-2 text-red-500 font-bold text-center">{errorMessage}</h1>;
}

export default LoginError;