"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

type Props = {
  slides:   {
    src: string,
    alt: string,
    title: string,
    description: string,
  }[];
};

const Carousel = (props: Props) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent(current === 0 ? props.slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === props.slides.length - 1 ? 0 : current + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(current === props.slides.length - 1 ? 0 : current + 1);
    }, 7000);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="overflow-hidden w-full relative min-h-full bg-[rgba(255,219,181,0.6)] border-8 border-secondary rounded-4xl md:w-4/6 xl:max-w-2/6 xl:w-2/6">
      <div
        className={`flex items-center transition duration-1000 ease-in-out`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {props.slides.map((slide, index) => (
          <div
            className="min-w-full w-full h-full py-10 flex flex-col justify-center items-center "
            key={index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              className="object-contain mb-4 w-[150px] h-[150px] md:w-[250px] md:h-[250px] lg:w-[250px] lg:h-[250px]"
              width={0}
              height={0}
              sizes="100vw"
            />
            <h1
              className="text-4xl text-white font-extrabold tracking-wider"
              style={{ WebkitTextStroke: "3px #6C4E31" }}
            >
              {slide.title}
            </h1>
            <p className="text-secondary font-semibold text-xl text-center px-4">
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-secondary px-4 text-2xl md:text-3xl">
        <button className="cursor-pointer" onClick={previousSlide}>
          <FaArrowAltCircleLeft />
        </button>
        <button className="cursor-pointer" onClick={nextSlide}>
          <FaArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
