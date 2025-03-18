import { CIcon } from "@coreui/icons-react"
import { cilDoubleQuoteSansLeft } from "@coreui/icons"

import type { Quote } from "../../../types/global";
import { useEffect, useState } from "react";

interface QuoteCardProps {
    quote?: Quote;
    loading?: boolean;
}

const QuoteCard = ({ quote, loading }: QuoteCardProps) => {
    const [loadingPoints, setLoadingPoints] = useState<number>(0);

    const { author, text } = { ...quote };

    useEffect(() => {
        let updateInterval = null;

        if (loading) {
            setLoadingPoints(1);
            updateInterval = setInterval(() => {
                setLoadingPoints(curr => {
                    if (curr < 4) {
                        return curr + 1;
                    } else {
                        return 1;
                    }
                })
            }, 500)
        } else {
            if (updateInterval) clearInterval(updateInterval);
            setLoadingPoints(0)
        }

        return () => {
            if (updateInterval) clearInterval(updateInterval)
        };
    }, [setLoadingPoints, loading])

    return (
        <div 
        className="h-[200px] w-[350px] p-4 relative flex flex-column !text-purple-500 justify-center items-center border rounded-xl !border-green-500"
        >
            {loading ? <p className="text-4xl text-green-600">
                {".".repeat(loadingPoints)}
            </p> :
                <>
                    <p className="text-2xl !text-blue-400 mb-5">
                        {text}
                    </p>
                    <a
                        href={`https://www.google.com/search?q=${author}`}
                        target="_blank"
                        className="text-xl ml-auto">
                        {author}
                    </a>

                </>
            }
            <CIcon
                icon={cilDoubleQuoteSansLeft}
                size="xxl"
                className="absolute top-[45%] left-[95%]" />
        </div>
    )
}

export default QuoteCard;