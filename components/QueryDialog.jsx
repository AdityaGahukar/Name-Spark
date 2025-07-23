import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { nameStyle, Randomness } from "@/helpers/constant";
import { Button } from "./ui/button";
import { useQueryContext } from "@/context/BusinessNameContext";
import { useRouter } from "next/navigation";

function QueryDialog({ queryDialog, setQueryDialog }) {
    
    const router = useRouter();
    
    const {query, updateQuery} = useQueryContext();

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
        router.push(`/business-name`)
    }

    return (
        <Dialog open={queryDialog} onOpenChange={setQueryDialog}>
            <DialogContent className="max-h-[80vh] overflow-y-auto w-[90vw] sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="NameStyle">

                    <TabsList className="p-0 bg-transparent sm:gap-5 gap-1 mb-3">
                        <TabsTrigger
                            className="text-lg border data-[state=active]:bg-primary"
                            value="NameStyle"
                        >
                            Name Styles
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-lg border data-[state=active]:bg-primary"
                            value="Randomness"
                        >
                            Randomness
                        </TabsTrigger>
                        <TabsTrigger
                            className="text-lg border data-[state=active]:bg-primary"
                            value="BrandInfo"
                        >
                            Brand Information
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="NameStyle">
                        <h4 className="text-lg font-semibold mb-3">Select Name Style</h4>
                        <RadioGroup onValueChange={handleNameStyle} defaultValue="Auto" className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5 sm:w-[100%] w-[80%]">
                            {nameStyle.map((singleRandomness) => (
                              <Label htmlFor={`namestyle${singleRandomness.id}`} key={`namestyle${singleRandomness.id}`} className="p-4 rounded border flex items-center gap-3"> 
                                <RadioGroupItem value={singleRandomness.name} id={`namestyle${singleRandomness.id}`} />
                                <div>
                                  <p className="font-semibold text-lg/4 mb-1">{singleRandomness.name}</p>
                                  <p>{singleRandomness.description}</p>
                                </div>
                              </Label>
                            ))}
                        </RadioGroup>
                    </TabsContent>

                    <TabsContent value="Randomness">
                        <h4 className="text-lg font-semibold mb-3">Select Randomness Level</h4>
                      <RadioGroup onValueChange={handleRandomness} defaultValue="Medium">
                            {Randomness.map((singleRandomness) => (
                              <Label htmlFor={`randomness${singleRandomness.id}`} key={`randomness${singleRandomness.id}`} className="p-4 rounded border flex items-center gap-3 mb-3 sm:w-[100%] w-[80%]"> 
                                <RadioGroupItem value={singleRandomness.name} id={`randomness${singleRandomness.id}`} />
                                <div>
                                  <p className="font-semibold text-lg/4 mb-1">{singleRandomness.name}</p>
                                  <p>{singleRandomness.description}</p>
                                </div>
                              </Label>
                            ))}
                        </RadioGroup>
                    </TabsContent>

                    <TabsContent value="BrandInfo">
                        <h4 className="text-lg font-semibold mb-3">Enter Brand Information</h4>
                        <div className="mb-3">
                          <Label className="text-md px-1">Keyword</Label>
                          <Input className="sm:w-[100%] w-[80%]" value={query?.keyword || ""} onChange={handleFormField} name="keyword" placeholder="Enter keyword"></Input>
                        </div>
                        <div className="mb-3">
                          <Label className="text-md px-1">Description</Label>
                          <Input className="sm:w-[100%] w-[80%]" value={query?.description || ""} onChange={handleFormField} name="description" placeholder="Enter description"></Input>
                        </div>
                        <Button onClick={generateBusinessName} className="text-black mt-2">Generate</Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}

export default QueryDialog;
