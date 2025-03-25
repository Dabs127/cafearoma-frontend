"use client";

import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type Props = {
  slides: any[];
};

const Carousel = (props: Props) => {
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    setCurrent(current === 0 ? props.slides.length - 1 : current - 1);
  };

  let nextSlide = () => {
    setCurrent(current === props.slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    let interval = setInterval(() => {
        setCurrent(current === props.slides.length - 1 ? 0 : current + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="overflow-hidden w-1/4 relative max-h-1/2 bg-primary border-8 border-secondary rounded-4xl">
      <div
        className={`flex items-center transition duration-1000 ease-in-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {props.slides.map((slide, index) => (
          <div className="min-w-full w-full h-full py-10 flex flex-col justify-center items-center " key={index}>
            <img
              src={slide.src}
              alt={slide.alt}
              className=" object-contain mb-4"
              width={300}
              height={300}
            />
            <h1 className="text-5xl text-white font-extrabold tracking-wider" style={{WebkitTextStroke: "3px #6C4E31"}}>{slide.title}</h1>
            <p className="text-white text-2xl text-center">{slide.description}</p>
          </div>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-accent px-10 text-3xl">
        <button onClick={previousSlide}>
          <FaArrowAltCircleLeft />
        </button>
        <button onClick={nextSlide}>
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
