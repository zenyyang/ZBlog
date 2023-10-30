import Link from "next/link";
import { Instagram, Linkedin, Twitter } from "lucide-react";

export default function Subscribe() {
  return (
    <div className="bg-gray-100 p-6 mt-10">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold">Subscribe for more content</h2>

        <p className="mt-2 text-gray-600">
          Get notified when we publish new updates.
        </p>

        <form className="mt-4 flex">
          <input
            className="bg-white border border-gray-300 flex-1 px-4 py-2 rounded-tl rounded-bl focus:outline-none"
            type="email"
            placeholder="Enter email address"
          />

          <button
            className="px-6 py-2 rounded-tr rounded-br bg-gradient-to-r from-red-400 to-blue-400  hover:bg-indigo-600 text-white"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="mx-5 mt-5 flex flex-col justify-center items-center">
        <p className="text-base font-medium tracking-widest">Social Media</p>
        <div className="flex items-center gap-20 mt-5">
          <Link href="https://www.instagram.com/zenxai/">
            <Instagram className="w-7 h-7 text-red-300 " />
          </Link>
          <Link href="https://www.facebook.com/zenxai">
            <Twitter className="w-7 h-7  text-red-300  " />
          </Link>
          <Link href="https://www.linkedin.com/in/zenxai/">
            <Linkedin className="w-7 h-7 text-red-300 " />
          </Link>
        </div>
      </div>
    </div>
  );
}
