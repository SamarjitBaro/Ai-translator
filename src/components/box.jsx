import { useState, useEffect } from "react";
import { GiSpeaker } from "react-icons/gi";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CiLinkedin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

gsap.registerPlugin(useGSAP);

export const Box = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [language, setLanguage] = useState("hi");
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = fetchVoices;
    fetchVoices();
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleTextToSpeech = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = language;

      const voice = voices.find((v) => v.lang === language);
      if (voice) {
        utterance.voice = voice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-Speech is not supported in this browser.");
    }
  };

  const translateText = async () => {
    // event.preventDefault();
    console.log("button clicked");
    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${text}&langpair=en|${language}`
      );
      setTranslatedText(response.data.responseData.translatedText);
      console.log(translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap mt-60 justify-center">
        <div className="p-5 bg-blue-100 rounded-tl-2xl rounded-bl-2xl h-[400px] border-black w-[650px]">
          <textarea
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="resize-none bg-transparent outline-none w-full h-full"
            type="text"
            placeholder="Type here or paste"
          />
        </div>
        <div className="p-5 relative bg-blue-200 rounded-tr-2xl rounded-br-2xl h-[400px]  border-black w-[650px]">
          <div className="h-10 border-black border rounded-b-md px-9 py-2 flex justify-center items-center ">
            <label htmlFor="lang" className="w-full h-full ">
              Choose your language:
            </label>
            <select
              id="lang"
              name="lang"
              onChange={(e) => setLanguage(e.target.value)}
              className="w-auto h-full outline-none rounded-lg bg-slate-200"
            >
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
              <option value="kn">Kannada</option>
              <option value="as">Assamese</option>
              <option value="mr">Marathi</option>
              <option value="ur">Urdu</option>
            </select>
          </div>
          <textarea
            readOnly
            value={translatedText}
            className="bg-transparent resize-none mt-6 outline-none w-full  h-[300px]"
            type="text"
          />
          <GiSpeaker
            onClick={handleTextToSpeech}
            onTouchEnd={handleTextToSpeech}
            title="Click to listen"
            className="absolute bottom-0 right-5 h-10 w-10 "
          />
        </div>
      </div>
      <button
        onClick={translateText}
        onTouchEnd={translateText}
        className="p-2 m-0 mx-auto text-white w-36 h-10 rounded-b-md bg-slate-700 "
      >
        Generate
      </button>

      <div className="h-auto bg-white px-10 py-20 flex justify-center flex-col ">
        <h1 className="font-[anzo1] mb-4 text-[20px]"> How to use</h1>
        <h2 className="font-[anzo1]">1. Choose Your Source Text</h2>
        <p className="font-[anzo2] px-5 mb-4">
          Select or type the text you want to translate and convert to speech.
          Make sure it’s in the language you need to translate from.
        </p>
        <h2 className="font-[anzo1]">2. Select Source and Target Languages</h2>
        <p className="font-[anzo2] px-5 mb-4">
          Choose the language your text is currently in (source language).
          Choose the language you want to translate the text into (target
          language).
        </p>
        <h2 className="font-[anzo1]">3. Preview Translation</h2>
        <p className="font-[anzo2] px-5 mb-4">
          Preview the translated text before converting it to speech to ensure
          accuracy. Make adjustments if needed, especially for unique names,
          phrases, or regional terms.
        </p>
        <h2 className="font-[anzo1]">4. Convert Text to Speech</h2>
        <p className="font-[anzo2] px-5 mb-4">
          Click the button to convert the translated text to speech. The tool
          will generate an audio output in the target language.
        </p>
      </div>
      <footer className=" flex items-center justify-center h-28 bg-slate-950 text-white">
        <p className="mr-7">Connect with me</p>
        <div className="flex  gap-6">
          <a
            href="https://www.linkedin.com/in/samarjit-baro-b33734239"
            target="blank"
          >
            <CiLinkedin className="w-7 h-10 " />
          </a>
          <a href="https://samarjitbaro.netlify.app/" target="blank">
            <CgProfile className="w-6 h-10 " />
          </a>
        </div>
      </footer>
    </>
  );
};
