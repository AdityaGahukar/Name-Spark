"use client";

import { createContext, useContext, useEffect, useState } from "react"

// Using Context API to manage business name state (as it is used across multiple components)
const QueryContext = createContext();

export const BusinessNameContext = ({ children }) => {
    const [query, setQuery] = useState({});

    useEffect(() => {
        const sessionQuery = sessionStorage.getItem("query");
        if(sessionQuery) setQuery(JSON.parse(sessionQuery));  // parse to get the object from string
    }, [])
    
    // eg. { keyword: "web"}
    const updateQuery = (newQuery) => {
        setQuery((prevQuery) => {
            const newQueryData = { ...prevQuery, ...newQuery };
            // we want to persist the data even if we reload the page (by using sessionStorage the data gets cleared when we close the browser)
            sessionStorage.setItem("query", JSON.stringify(newQueryData));   // stringify to convert object to string
            return newQueryData;
        })
    }

    return (
        <QueryContext.Provider value={{ query, updateQuery }}>
            {children}
        </QueryContext.Provider>
    )
}

// Custom hook to use the QueryContext
// This allows us to access the context in any component that is a child of BusinessNameContext
// Just call useQueryContext() to get the query and updateQuery functions
export function useQueryContext() {
    return useContext(QueryContext);
}