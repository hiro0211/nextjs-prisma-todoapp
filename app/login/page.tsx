// "use client";

// eslint-disable-next-line @next/next/no-async-client-component
async function Login() {
  return (
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <button className="bg-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full">
              <svg
                role="img"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-2"
                fill="currentColor"
              >
                <title>Google icon</title>
                <path fill="#4285F4" d="M24 9.5c3.04 0 5.59 1.06 7.67 2.82l5.6-5.6C33.68 3.07 29.11 1 24 1 14.98 1 7.49 6.93 4.25 14.98l6.7 5.22c1.67-4.99 6.27-8.7 12.05-8.7z" />
                <path fill="#34A853" d="M46.5 24.56c0-1.45-.13-2.84-.36-4.19H24v8.33h12.81c-.58 2.99-2.27 5.52-4.82 7.21l7.41 5.73c4.32-3.98 6.83-9.83 6.83-17.08z" />
                <path fill="#FBBC05" d="M10.96 28.53a14.75 14.75 0 01-.8-4.53c0-1.57.28-3.09.8-4.53L3.25 14.98A23.75 23.75 0 000 24c0 3.7.87 7.2 2.45 10.28l8.51-5.75z" />
                <path fill="#EA4335" d="M24 47c5.95 0 10.94-1.97 14.58-5.35l-7.41-5.73c-2.03 1.37-4.63 2.19-7.17 2.19-5.78 0-10.37-3.71-12.05-8.7l-6.7 5.22C7.49 41.07 14.98 47 24 47z" />
              </svg>
              <span>Googleでログイン</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;