import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice/auth-slice";
import { useToast } from "@/hooks/use-toast";

function Login() {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
  });

  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((res) => {
        if (res?.payload?.status == "Success") {
          toast({
            title: "Success!",
            description: res.payload?.message,
          });
        } else {
          toast({
            title: "Error!",
            description: res.payload?.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: err.message,
        });
      });
  };

  return (
    <>
      {/* Right Pane */}
      <div>
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Login
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Start Shopping From A Wide Range Of Clothes
          </h1>

          <form className="space-y-4" onSubmit={(e) => handleOnSubmit(e)}>
            {/* Email input */}
            <div>
              <label
                htmlFor="userEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                value={formData.userEmail}
                onChange={(e) =>
                  setFormData({ ...formData, userEmail: e.target.value })
                }
                type="text"
                id="userEmail"
                name="userEmail"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            {/* Password input */}
            <div>
              <label
                htmlFor="userPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                value={formData.userPassword}
                onChange={(e) =>
                  setFormData({ ...formData, userPassword: e.target.value })
                }
                type="password"
                id="userPassword"
                name="userPassword"
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                to={"/auth/register"}
                className="text-black hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;