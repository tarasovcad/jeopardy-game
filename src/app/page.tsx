'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSound from 'use-sound';

const Page = () => {
  const [showPig, setShowPig] = useState(false);
  const [playPigSound] = useSound('/sounds/pig.ogg');

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPig(true);
      playPigSound();

      // Remove pig after animation completes (3 seconds)
      setTimeout(() => {
        setShowPig(false);
      }, 3000);
    }, 10000);

    return () => clearInterval(interval);
  }, [playPigSound]);

  return (
    <div className="relative">
      {showPig && (
        <div className="-bottom-12 z-50 fixed animate-run-across">
          <Image src="/images/pig-mine.gif" alt="Running Pig" width={200} height={200} />
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-10 h-screen">
        <h1 className="font-serif font-extrabold text-5xl">BLOCKPARDY</h1>
        <div className="flex flex-col gap-4">
          <Link href="/game/teams">
            <Button type="button" className="w-64 cursor-pointer">
              Start Game
            </Button>
          </Link>
          <Button type="button" className="w-64 cursor-pointer">
            About Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
