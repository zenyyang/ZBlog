import Footer from "@/components/root/Footer";
import Navbar from "@/components/root/Navbar";
const Latest = dynamic(() => import("@/components/root/Latest"));
const Recent = dynamic(() => import("@/components/root/Recent"));
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";

export default function Home() {
  return (
    <div>
      <div className=" w-full h-screen z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
        <video
          src="/videos/bg.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
        />
        <Navbar />
        <div className="absolute w-full h-full top-0 pb-40 flex flex-col justify-center items-center text-white">
          <p className="font-semibold font-serif text-6xl pt-10"> ZEN's Blog</p>
          <p className="pt-3 text-base font-medium">
            dives into the tech world with me.
          </p>
        </div>
        <div className="relative w-full h-fit -mt-[250px] justify-center items-center ">
          <Latest />
        </div>
      </div>
      <div className="h-screen" />
      <div className="lg:-mt-32 -mt-80 mx-5">
        <p className="text-3xl font-medium md:mb-10 lg:mb-0 mx-5 ">
          Recent Blogs
        </p>
        <Recent />
      </div>
      {/* <div className="mt-32 mb-20">
        <p className="text-3xl font-medium mx-5">Other News</p>
        <RecentNews />
      </div> */}
      <div className="mt-20">
        <Separator />
        <Footer />
      </div>
    </div>
  );
}
