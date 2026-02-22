import React, { useState, useContext } from "react";
import arrowicon from "../assets/arrow_icon.png";
import logo from "../assets/favicon.png";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [currState, setCurrState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // ✅ NEW

  const { login } = useContext(AuthContext);

  const onSumbitHandler = async (e) => {
    e.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    try {
      setLoading(true); // 🔒 lock button
      await login(
        currState === "Sign Up" ? "signup" : "login",
        { fullName, email, password, bio }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // 🔓 unlock
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center 
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">

      <img src={logo} alt="" className="w-[min(30vw,250px)]" />

      <form
        onSubmit={onSumbitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 
        p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-xl flex justify-between items-center">
          {currState}
          {isDataSubmitted && !loading && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={arrowicon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
            disabled={loading}
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2"
              required
              disabled={loading}
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2"
              required
              disabled={loading}
            />
          </>
        )}

        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            rows={4}
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            className="p-2 border border-gray-500 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Provide A Short Bio..."
            required
            disabled={loading}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className={`py-3 bg-linear-to-r from-purple-400 to-violet-600 
          text-white rounded-md 
          ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {loading
            ? currState === "Sign Up"
              ? "Signing Up..."
              : "Logging In..."
            : currState === "Sign Up"
            ? "Create Account"
            : "Login Now"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" required disabled={loading} />
          <p>Agree to the Term of use & privacy policy</p>
        </div>

        <div className="flex flex-col gap-2">
          {currState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account{" "}
              <span
                onClick={() => {
                  if (!loading) {
                    setCurrState("Login");
                    setIsDataSubmitted(false);
                  }
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Don't have an account{" "}
              <span
                onClick={() => !loading && setCurrState("Sign Up")}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;