import { CButton as Button } from "@coreui/react"
import { useState } from "react";

import { Request } from "../../../api/request";
import QuoteCard from "../../shared/QuoteCard/QuoteCard";
import type { Quote } from "../../../types/global";

const Generator = () => {
    const [generatedQuote, setGeneratedQuote] = useState<Quote>({} as Quote);
    const [loading, setLoading] = useState<boolean>(false);

    const getNewGenerated = async () => {
        setLoading(true)
        const result = await Request.getInstance().getRandom();

        if (result) {
            if (result?.error) {
                return;
            }

            if (typeof result === "object") {
                setGeneratedQuote(result);
                setLoading(false);
            }
        }
    }

    return (
        <div className="w-[100%] flex justify-center">
            <div className="w-[90%] p-4 flex  justify-evenly  min-h-[274px] items-center border-t border-b border-purple-300 ">
                <Button
                    color="primary"
                    variant="outline"
                    className="!text-2xl"
                    onClick={getNewGenerated}>
                    Get Random Quote
                </Button>
                {generatedQuote.text &&
                    <QuoteCard
                        loading={loading}
                        quote={generatedQuote} />}
            </div>
        </div>
    )
}

export default Generator;