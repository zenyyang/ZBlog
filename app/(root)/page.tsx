import Footer from "@/components/root/Footer";
import Latest from "@/components/root/Latest";
import Navbar from "@/components/root/Navbar";
import Recent from "@/components/root/Recent";
import RecentNews from "@/components/root/RecentNews";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prisma";

export default async function Home() {
  const blogs = await prismadb.blog.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      category: true,
    },
  });

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
          <Latest blogs={blogs} />
        </div>
      </div>
      <div className="h-screen" />
      <div className="lg:-mt-32 -mt-80 mx-5">
        <p className="text-3xl font-medium md:mb-10 lg:mb-0 mx-5 ">
          Recent Blogs
        </p>
        <Recent blogs={blogs} />
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
