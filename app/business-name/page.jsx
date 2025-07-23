"use client";

import { GoogleGenAI } from "@google/genai";
import Sidebar from "@/components/Sidebar";
import { generatePrompt } from "@/helpers/function";
import { useQueryContext } from "@/context/BusinessNameContext";
import { useEffect, useRef, useState } from "react";
import DomainStatus from "@/components/DomainStatus";

// Nextjs has file based routing, so we have a different page.jsx for each route.
function BusinessName() {
    const {query, updateQuery} = useQueryContext();
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const observerDivRef = useRef();
    const [page, setPage] = useState(1);
    const [refresh, setRefresh] = useState(false);
    const [refreshId, setRefreshId] = useState(0);

    const [domainDialogOpen, setDomainDialogOpen] = useState(false);
    const [domain, setDomain] = useState("");

    // The client gets the API key from the environment variable `GEMINI_API_KEY`.
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

    const fetchBusinessName = async () => {
        try {
            setLoading(true);
            const inputs = {...query, names};

            // console.log(generatePrompt(inputs));

            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: generatePrompt(inputs),
            });

            const unfilteredJsonString = response.text;
            const jsonString = unfilteredJsonString.replace(/```json|```/g, "");
            const jsonData = JSON.parse(jsonString);  // json object
            if(jsonData && jsonData.names){
                const newNames = jsonData.names;
                setNames([...names, ...newNames]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (refresh) {
            setNames([]);
            setPage(1);
            setRefreshId(prev => prev + 1); // trigger re-fetch
            setRefresh(false); // prevent loop
        }
    }, [refresh]);

    useEffect(() => {
        fetchBusinessName();
    }, [page]);

    useEffect(() => {
        fetchBusinessName();
    }, [refreshId]);


    // for infinite scroll, we will use intersection observer to detect when the user scrolls to the bottom of the page
    // and then we will fetch more business names from the AI model.

    const handleIntersection = (entries) =>{
        const entry = entries[0];
        if(entry.isIntersecting){
            setPage((prev) => prev + 1);
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // use the viewport as the root
            rootMargin: "-10px", // margin to trigger the observer
            threshold: [0, 0.5, 1] // 0 means when the element is not visible, 0.5 means when half of the element is visible, and 1 means when the element is fully visible
        })

        if(observerDivRef.current) observer.observe(observerDivRef.current);

        return () => {
            if (observerDivRef.current) observer.unobserve(observerDivRef.current);  // cleanup the observer when the component unmounts
        };
    }, [])

    const getDomainStatus = (businessName) => {
        // we want just the alphabetic characters and numbers, and then we will append .com to it.
        // remove all non-alphanumeric characters
        const domainName = businessName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() + ".com";
        setDomain(domainName);
        setDomainDialogOpen(!domainDialogOpen);
    }

    return (
        <div className="md:px-20 px-5 mb-10">
            <h1 className="mt-32 text-center text-4xl font-semibold text-white border-b pb-10 border-gray-500">
                Business Name
            </h1>

            <div className="md:flex justify-center gap-10 mt-10 items-start">
                <div className="md:w-[25%] md:mb-0 mb-10">
                    <Sidebar refresh={refresh} setRefresh={setRefresh} />
                </div>
                <div className="md:w-[75%]">
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-10">
                        {names && names.length > 0 && names.map((singleName, index) => (
                            <div onClick={() => getDomainStatus(singleName)} key={index} className="border border-gray-600 rounded p-4 cursor-pointer text-white hover:bg-primary hover:text-black">
                                {singleName}
                            </div>
                        ))}
                    </div>
                    
                    
                    {loading && <div className="text-center text-primary pt-5 text-xl">Loading...</div>}
                    <div ref={observerDivRef} className="h-2"></div>
                </div>
            </div>

            <DomainStatus open={domainDialogOpen} setOpen={setDomainDialogOpen} domain={domain} />
        </div>
    );
}

export default BusinessName;
