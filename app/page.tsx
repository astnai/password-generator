"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generatePassword = (
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
) => {
  const upperCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCharset = "abcdefghijklmnopqrstuvwxyz";
  const numberCharset = "0123456789";
  const symbolCharset = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let charset = "";
  if (useUppercase) charset += upperCharset;
  if (useLowercase) charset += lowerCharset;
  if (useNumbers) charset += numberCharset;
  if (useSymbols) charset += symbolCharset;
  if (!charset) return "";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const passwordTips = [
  "Use a mix of uppercase and lowercase letters.",
  "Include numbers and symbols for a stronger password.",
  "Avoid using easily guessable information like birthdays.",
  "Make your password at least 12 characters long.",
  "Change your passwords regularly.",
];

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  useEffect(() => {
    const randomTip =
      passwordTips[Math.floor(Math.random() * passwordTips.length)];
    toast.info(randomTip, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: "var(--button-bg)",
        color: "white",
        borderRadius: "8px",
      },
      className: "toast-notification",
    });
  }, []);

  const handleGenerate = () => {
    setPassword(
      generatePassword(
        length,
        useUppercase,
        useLowercase,
        useNumbers,
        useSymbols
      )
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        backgroundColor: "var(--button-bg)",
        color: "white",
        borderRadius: "8px",
      },
      className: "toast-notification",
    });
  };

  const passwordStrength = getPasswordStrength(password);

  let strengthColor;
  if (passwordStrength <= 2) strengthColor = "bg-red-500";
  else if (passwordStrength <= 4) strengthColor = "bg-yellow-500";
  else strengthColor = "bg-green-500";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-neutral-light dark:bg-neutral-dark text-neutral-800 dark:text-gray-100">
      <ToastContainer />
      <div className="flex flex-col items-center w-11/12 md:w-1/2 lg:w-1/3 bg-box-bg dark:bg-neutral-800 p-6 rounded-lg shadow-lg">
        <div className={`w-full h-2 ${strengthColor} mb-4 rounded-lg`}></div>
        <div className="bg-input-bg dark:bg-neutral-700 p-2 rounded-lg mb-4 text-center w-full text-lg font-mono">
          {password || "Generate a password"}
        </div>
        <div className="flex items-center mb-4 w-full">
          <label htmlFor="length" className="mr-4">
            Length:
          </label>
          <input
            type="range"
            id="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="1"
            max="32"
            className="w-full"
          />
          <span className="ml-4">{length}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4 w-full">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
              className="mr-2"
            />
            Uppercase
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
              className="mr-2"
            />
            Lowercase
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="mr-2"
            />
            Numbers
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="mr-2"
            />
            Symbols
          </label>
        </div>
        <button
          onClick={handleGenerate}
          className="button text-white px-4 py-2 rounded-lg mb-4 w-full hover:bg-button-hover-bg transition-colors"
        >
          Generate Password
        </button>
        <button
          onClick={handleCopy}
          className="button text-white px-4 py-2 rounded-lg w-full hover:bg-button-hover-bg transition-colors"
        >
          Copy Password
        </button>
      </div>
      <a
        href="https://github.com/astnai/password-generator"
        className="fixed bottom-4 right-4 text-sm font-mono hover:underline"
      >
        source
      </a>
    </div>
  );
}
