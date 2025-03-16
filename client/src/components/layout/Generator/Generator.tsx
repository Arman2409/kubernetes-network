import { CButton as Button } from "@coreui/react"
import { useState } from "react";

import { Request } from "../../../api/request";
import QuoteCard from "../../shared/QuoteCard/QuoteCard";
import type { Quote } from "../../../types/global";

const Generator = () => {
    const [generatedQuote, setGeneratedQuote] = useState<Quote | "retrieving">({} as Quote);

    const showQuote = generatedQuote && generatedQuote !== "retrieving" && generatedQuote.author;

    const getNewGenerated = async () => {
        const result = await Request.getInstance().getRandom();

        if (result) {
            if (result?.error) {
                return;
            }

            setGeneratedQuote(result);
        }
    }

    return (
        <div className="w-[100%] flex justify-center">
            <div className="w-[90%] p-4 flex justify-between items-center border-t border-b border-red-500 min-h-[274px]">
                <Button
                    color="primary"
                    variant="outline"
                    className="!text-2xl"
                    onClick={getNewGenerated}>
                    Get Random One
                </Button>
                {showQuote && <QuoteCard {...generatedQuote} />}
            </div>
        </div>
    )
}

export default Generator;