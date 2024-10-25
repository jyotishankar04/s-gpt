import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

const HomePage = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 gap-10 xl:my-0 my-10 mb-10 xl:grid-cols-2 items-center justify-center">
      <div className="text-center flex justify-center items-center flex-col w-10/12 m-auto">
        <h1 className="text-6xl  font-bold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text">
          Nex GPT
        </h1>
        <h3 className="text-xl text-white mt-4">
          Supercharge your creativity and productivity
        </h3>
        <p className="text-sm w-8/12 text-gray-200 mt-2">
          Make your life easier and more productive with Nex GPT. A chatbot that
          can help you with everything you need. Just ask.
        </p>
        <p className="text-gray-400 mt-1">Powered by Gemini AI</p>
        <Link
          to="/auth/sign-up"
          className="btn bg-pink-300 text-white py-1 rounded-lg px-8  capitalize  text-lg mt-4"
        >
          Get Started
        </Link>
      </div>
      <div className="w-full h-full flex justify-center items-center m-auto">
        <div className="w-8/12 relative h-auto bg-base-300 rounded-lg p-10">
          <img
            className="w-full h-full object-cover animate-pulse"
            src="/public/ai.svg"
          />
          <div className="absolute -bottom-6  -right-6  bg-gradient-to-r from-rose-400/60 via-fuchsia-500/60 to-indigo-500/60  rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30  text-[10px] px-3 py-2">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "What is Nex GPT?",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "What is AI?",
                1000,
                "What is the future of AI?",
                1000,
                "Write a blog post about AI",
                1000,
              ]}
              wrapper="span"
              speed={50}
              className="text-sm"
              style={{ fontSize: "2em", display: "inline-block" }}
              repeat={Infinity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
