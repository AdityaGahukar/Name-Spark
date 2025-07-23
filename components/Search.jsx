// If a component uses React hooks like useState, useEffect, useRef, or handles browser events (like onClick) — it must be a "Client Component".
"use client";

import React, { use, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QueryDialog from "./QueryDialog";
import { useQueryContext } from "@/context/BusinessNameContext";

function Search() {
    const { query, updateQuery } = useQueryContext(); // Using the custom hook to access query and updateQuery from context
    // console.log(query);
    const [keyword, setKeyword] = useState("");
    const [queryDialog, setQueryDialog] = useState(false);

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const showQueryDialog = () => {
        if (!keyword) {
            return toast(
                "Failed to generate business name", // title
                {
                    description:
                        "Please enter a keyword to generate a business name.",
                }
            );
        }

        // Update the query in context
        updateQuery({ keyword });

        // if keyword is not empty, show the query modal
        setQueryDialog(!queryDialog);
    };

    return (
        <div className="flex justify-center items-center pt-5">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    showQueryDialog();
                }}
                className="w-[600px] flex gap-5"
            >
                <Input
                    onChange={handleKeywordChange}
                    placeholder="Enter a keyword..."
                    className="h-14 text-white md:text-md border-primary"
                    value={keyword}
                />
                <Button
                    type="submit"
                    className="h-14 text-white px-5 text-lg hover:cursor-pointer"
                >
                    Generate
                </Button>
            </form>
            <QueryDialog
                queryDialog={queryDialog}
                setQueryDialog={setQueryDialog}
            />
        </div>
    );
}

export default Search;
