import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface Props { img: StaticImageData, title1?: string, title2?: string, title3?: string }
const HeroSecton = ({ img, title1, title2, title3 }: Props) => {
  return (
    <div className="relative w-full h-[50dvh]">
      <Image
        src={img}
        alt="Events Banner"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-left bg-black/70">

        <div className="container px-4 py-12 mx-auto md:px-0">
          <h1 className="text-3xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
            <span className="my-2 text-[#3B82F6]">{title1}</span> <br />
            <span >{title2}</span><br />
            <span >{title3}</span><br />

          </h1>
        </div>
      </div>
    </div>

  );
};

export default HeroSecton;