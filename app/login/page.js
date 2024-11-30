"use client";
import { useState } from "react";
import Link from "next/link";
import EyeButton from "@/components/eyeButton";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";

export default function Login() {
  let [role, setrole] = useState("student");
  function handleroleChange(e) {
    setrole(e.target.value);
  }

  let [loginStatus, setLoginStatus] = useState(null);
  let [loginMessage, setLoginMessage] = useState("");
  let [isLoading, setIsLoading] = useState(false);

  function formSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.status === 200) {
          setLoginStatus("success");
        } else {
          setLoginStatus("error");
          setLoginMessage([
            data.error.message,
            "Details: " + data.error.details,
          ]);
        }
        setTimeout(() => {
          setLoginStatus(null);
          setLoginMessage(null);
        }, 10000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoginStatus("error");
        setIsLoading(false);
        setTimeout(() => {
          setLoginStatus(null);
          setLoginMessage(null);
        }, 10000);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
            Welcome Again
          </h2>
        </div>
        {loginStatus === "success" ? (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">
              Success! Click here to &nbsp;
              <Link href="/dashboard" className="underline">
                Dashboard
              </Link>
            </strong>
          </div>
        ) : loginStatus === "error" ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">
              Error! <br />
              {loginMessage &&
                loginMessage.length > 0 &&
                loginMessage.map((msg, index) => (
                  <span key={index}>
                    {msg}
                    <br />
                  </span>
                ))}
            </strong>
          </div>
        ) : null}
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={formSubmit}
        >
          <Input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="role" className="sr-only">
                Account Type
              </label>
              <Select
                id="role"
                name="role"
                value={role}
                label="Select an account type"
                className="max-w"
                onChange={handleroleChange}
              >
                <SelectItem value="student" key="student">
                  Student
                </SelectItem>
                <SelectItem value="teacher" key="teacher">
                  Teacher
                </SelectItem>
              </Select>
            </div>

            {role === "student" && (
              <div>
                <label htmlFor="roll" className="sr-only">
                  Roll
                </label>
                <Input
                  id="roll"
                  name="roll"
                  label="Roll"
                  min={0}
                  type="number"
                  autoComplete="roll"
                  required
                  isRequired
                />
              </div>
            )}

            {role === "teacher" && (
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Input
                  id="email-address"
                  name="email"
                  type="email"
                  label="Email address"
                  autoComplete="email"
                  required
                  isRequired
                />
              </div>
            )}

            <div className="flex">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                radius="xs"
                required
                isRequired
                endContent={<EyeButton passwordID="password" />}
              />
            </div>
          </div>
          <div>
            <Button
              isLoading={isLoading}
              // disabled={isLoading}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </form>
        <small className="block text-center text-gray-500">
          Don&apos;t have an account?&nbsp;
          <Link href="/registration" className="text-blue-500">
            Register
          </Link>
        </small>
        <small className="block text-center text-gray-500">
          <Link href="/admin/login" className="text-purple-500">
            Admin Login
          </Link>
        </small>
      </div>
    </div>
  );
}
