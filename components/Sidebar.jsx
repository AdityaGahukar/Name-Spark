"use client";

import { nameStyle, Randomness } from "@/helpers/constant"
import { Card, CardContent } from "./ui/card"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { useQueryContext } from "@/context/BusinessNameContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function Sidebar({refresh, setRefresh}) {
    const { query, updateQuery } = useQueryContext();

    const handleNameStyle = (nameStyle) => {
        updateQuery({nameStyle});
    }

    const handleRandomness = (randomness) => {
        updateQuery({randomness});
    }

    const handleFormField = (e) => {
        const { name, value } = e.target;
        updateQuery({ [name]: value });
    }  

    const generateBusinessName = () => {
        setRefresh(!refresh);  // toggle refresh state to trigger re-fetching of business names
    }

    return (
        <Card className="bg-transparent rounded-md pt-3 border-gray-600">
            <CardContent>
                <div className="mb-5">
                    <h4 className="text-white text-xl font-semibold mb-3">Name Style</h4>
                
                    <RadioGroup onValueChange={handleNameStyle} value={query?.nameStyle || "Auto"}>
                            {nameStyle.map((singleRandomness) => (
                              <Label htmlFor={`namestyle${singleRandomness.id}`} key={`namestyle${singleRandomness.id}`} className="flex items-center gap-3"> 
                                <RadioGroupItem value={singleRandomness.name} id={`namestyle${singleRandomness.id}`} />
                                  <p className="font-semibold text-lg/4 mb-1 text-white">{singleRandomness.name}</p>
                              </Label>
                            ))}
                        </RadioGroup>
                </div>

                <div className="mb-3">
                    <h4 className="text-white text-xl font-semibold mb-3">Randomness</h4>

                    <RadioGroup onValueChange={handleRandomness} value={query?.randomness || "Medium"}>
                            {Randomness.map((singleRandomness) => (
                              <Label htmlFor={`randomness${singleRandomness.id}`} key={`randomness${singleRandomness.id}`} className="flex items-center gap-3"> 
                                <RadioGroupItem value={singleRandomness.name} id={`randomness${singleRandomness.id}`} />
                                  <p className="font-semibold text-lg/4 mb-1 text-white">{singleRandomness.name}</p>
                              </Label>
                            ))}
                        </RadioGroup>
                </div>

                <div>
                    <div className="mb-3">
                          <Label className="text-md px-1 text-white">Keyword</Label>
                          <Input value={query?.keyword || ""} onChange={handleFormField} name="keyword" placeholder="Enter keyword" className="text-white"></Input>
                        </div>
                        <div className="mb-3">
                          <Label className="text-md px-1 text-white">Description</Label>
                          <Input value={query?.description || ""} onChange={handleFormField} name="description" placeholder="Enter description" className="text-white"></Input>
                        </div>
                        <Button onClick={generateBusinessName} className="text-black mt-2">Generate</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Sidebar
