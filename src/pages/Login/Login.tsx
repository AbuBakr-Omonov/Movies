import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google"
import { useStore } from "@/Zustand/Store"

export default function LoginForm() {
    const GOOGLE_CLIENT_ID = "460354480812-6rftmglhjvh7macsog9n7gt4ppuh7osq.apps.googleusercontent.com"

    const setAuth = useStore((state) => state.setAuth)
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black p-4">
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <form
                    action="#"
                    method="POST"
                    className="w-full max-w-md rounded-lg border-gray-300 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-[#1d1d1d]"
                >
                    <div className="space-y-1 text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Login</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your username and password to sign in to your account.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-[#3f3d3d] dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-[#3f3d3d] dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
                            />
                        </div>

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-gray-900 text-gray-50 hover:bg-gray-900/90 h-10 px-4 py-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 transition-colors"
                        >
                            Sign In
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500 dark:bg-[#1d1d1d] dark:text-gray-400">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <GoogleLogin
                                onSuccess={(credentialResponse) => {
                                    console.log("Google Login Success:", credentialResponse)
                                    if (credentialResponse.credential) {
                                        setAuth({ credential: credentialResponse.credential }) 
                                    }
                                }}
                                onError={() => {
                                    console.error("Google Login Failed")
                                }}
                            />
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account?{" "}
                        <a
                            href="#"
                            className="underline text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                        >
                            Sign up
                        </a>
                    </div>
                </form>
            </GoogleOAuthProvider>
        </div>
    )
}
