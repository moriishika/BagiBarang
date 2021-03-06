import Link from "next/link";
import React from "react";
import axios from "axios";
import { signIn, signOut, useSession } from 'next-auth/client'
class Login extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                user: {},
                fields: { email: '', password: '' },
                isLoggedIn: false,
            }
            this.handleLogin = this.handleLogin.bind(this);
            this.fieldHandler = this.fieldHandler.bind(this);
            this.login = this.login.bind(this)
            this.signIn = signIn.bind(this);
            this.signOut = signOut.bind(this)
        }

        async handleLogin(e) {
            e.preventDefault();
            const email = this.state.fields.email;
            const password = this.state.fields.password;
            await this.setState({
                user: {
                    email,
                    password
                }
            })

            this.login(email, password);
        }

        login(email, password) {

            axios.post('/api/auth/login', {
                email,
                password
            })
                .then((res) => {
                    this.setState({
                        fields: {
                            email: '',
                            password: ''
                        }
                    })
                }).catch((err) => {
                    alert(err)
                })
        }

        async fieldHandler(e) {
            const fieldName = e.target.getAttribute('name');
            await this.setState({
                fields: {
                    ...this.state.fields,
                    [fieldName]: e.target.value
                }
            })
        }

        render() {
            return (
                <div className="h-screen w-full">
                    <div className="bg-white h-20 flex justify-items-center">
                        <Link href='/'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="ml-4 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                        </Link>
                    </div>
                    <div className="w-full p-4 flex flex-col justify-center justify-items-center">
                        <h1 className="text-center my-4 font-semibold text-lg">Mau Barang? <br></br>Login Dulu Gak lama kok</h1>
                        <form onSubmit={this.handleLogin}>
                            <input type="text" name="email" onChange={this.fieldHandler} value={this.state.fields.email} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" placeholder="Email"></input>
                            <input type="password" name="password" onChange={this.fieldHandler} value={this.state.fields.password} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-black rounded-md my-3" placeholder="Password"></input>
                            <button className="bg-transparent block border border-blue-500 w-full py-2 rounded-md mt-4 text-blue-500 font-semibold hover hover:bg-blue-500 hover:text-white">Masuk</button>
                        </form>
                        <p className="text-center mt-8 font-medium">Atau</p>
                        <div className="flex flex-col mt-6">
                            <button onClick={this.signIn} className="text-center my-1 bg-red-500 text-white p-2 font-medium rounded-md hover:bg-red-600">Masuk dengan Google</button>
                            <button onClick={this.signIn} className="text-center my-1 bg-blue-500 text-white p-2 font-medium rounded-md hover:bg-blue-600">Masuk dengan Facebook</button>
                        </div>
                    </div>
                </div>
            );
        }
    }

export default Login;