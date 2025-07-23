import Search from "@/components/Search";
import { Lightbulb, Filter, SearchCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="pt-40 md:h-screen md:w-screen">
      <div className="md:px-0 px-5">
        <h1 className="md:text-5xl text-4xl text-white capitalize font-semibold text-center">Business Name Generator</h1>
        <p className="text-center text-white text-xl mt-3">Generate unique business names with our AI-powered Business Name Generator Tool!</p>
        <Search />
      </div>

      <div className="md:flex justify-between gap-10 md:px-56 px-5 mt-28">
        <div className="md:mb-0 mb-10">
          <Lightbulb className="text-primary mb-3" size={30} />
          <h4 className="text-white text-xl font-semibold">Generate Idea</h4>
          <p className="text-white">Get inspired with unique business name ideas generated just for you! . Make your choice easier with our smart filtering options.</p>
        </div>
        <div className="md:mb-0 mb-10">
          <Filter className="text-primary mb-3" size={30} />
          <h4 className="text-white text-xl font-semibold">Filter Result</h4>
          <p className="text-white">Filter results based on your preferences. Get multiple choices to find the perfect business name that resonates with your brand vision.</p>
        </div>
        <div className="md:mb-0 mb-10">
          <SearchCheck className="text-primary mb-3" size={30} />
          <h4 className="text-white text-xl font-semibold">Check Domain Availability</h4>
          <p className="text-white">Verify if your AI-generated business names are available as domains. Easily spot what’s available and what’s already taken.</p>
        </div>
      </div>
    </div>
  );
}
