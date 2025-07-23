"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function DomainStatus({open, setOpen, domain}) {
    const [loading, setLoading] = useState(false);
    const [domainStatus, setDomainStatus] = useState();

    // https://domain-availability.whoisxmlapi.com/api/documentation/making-requests
    useEffect(() => {
        const getDomainStatus = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${process.env.NEXT_PUBLIC_DOMAIN_STATUS_API}&domainName=${domain}&credits=DA`);
                
                if(!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                setDomainStatus(data.DomainInfo.domainAvailability);
            } catch (error) {
                console.log(error);
                toast(
                    "Failed to fetch domain status",  // title
                    {description: error.message}
                );
            } finally {
                setLoading(false);
            }
        };

        if (domain) {
            getDomainStatus();
        }
    }, [domain]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-4xl font-semibold text-center mb-3">Domain Status</DialogTitle>
                    <DialogDescription></DialogDescription>
                        {loading ? <p>Getting status for domain: <b>{domain}</b></p> 
                            :
                            <div>
                                <p className="mb-3 text-center">Availability status for domain: <b>{domain}</b></p>
                                {domainStatus && domainStatus === "AVAILABLE" ?
                                    <div className="flex justify-center">
                                        <span className="bg-green-500 text-xl px-10 text-white rounded py-3">
                                            {domainStatus}
                                        </span>
                                    </div> 
                                    :
                                    <div className="flex justify-center">
                                        <span className="bg-red-500 text-xl px-10 text-white rounded py-3">
                                            {domainStatus}
                                        </span>
                                    </div>
                                }
                            </div>
                        }
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default DomainStatus;
