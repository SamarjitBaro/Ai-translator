import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const Text = () => {
  const container = useRef();

  useEffect(() => {
    const textElement = container.current.querySelector(".animated-text");
    const text = textElement.innerText;

    const characters = text.split("");

    textElement.innerHTML = characters
      .map(
        (char) =>
          `<span class="char" style="display: inline-block;  opacity: 0;">${
            char === " " ? "&nbsp;" : char
          }</span>`
      )
      .join("");

    gsap.fromTo(
      textElement.querySelectorAll(".char"),
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.14,
        stagger: 0.012,
        delay: 1.5,
      }
    );
    gsap.fromTo(
      ".h1",
      { opacity: 0, x: -120 },
      {
        opacity: 1,
        x: 0,
        duration: 1.1,
        stagger: 0.5,
      }
    );
    gsap.fromTo(
      ".h2",
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.5,
      }
    );
  }, []);

  return (
    <div ref={container} className="relative">
      <div className="h-[90px] mt-5 items-center flex justify-center py-5">
        <h1 className=" h1 font-[anzo1] bg-white text-[36px]">AI Translator</h1>
      </div>
      <div className="h-[20px] flex justify-center  relative py-6">
        <span className=" h2 px-5 font-[anzo2] h-[40px] flex items-center justify-center font-bold absolute top-0 bg-white text-[24px]">
          Translate Text to Local Language and Speech
        </span>
      </div>
      <div className="h-auto flex justify-center relative">
        <p className="animated-text font-[anzo3] tracking-wide leading-loose px-7  py-4 break-words  max-w-[1200px] rounded-md  bg-white inline-block  absolute top-0 text-[16px]">
          Transform any text into a natural, locally spoken language and bring
          it to life with our advanced Text-to-Speech Translator. This powerful
          tool effortlessly translates and vocalizes AI-generated content,
          making it sound as if it were spoken by a native speaker. Perfect for
          enhancing communication, accessibility, and personalization, this
          translator bridges language barriers with authenticity. Get accurate
          translations and lifelike speech synthesis, giving your content the
          power to reach and resonate with diverse audiences.
        </p>
      </div>
    </div>
  );
};
