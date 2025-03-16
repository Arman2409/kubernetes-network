import { CIcon } from "@coreui/icons-react"
import { cilDoubleQuoteSansLeft } from "@coreui/icons"

import type { Quote } from "../../../types/global";

const QuoteCard = ({ author, text }: Quote) => {
    return (
        <div className="h-[200px] w-[350px] p-4 relative flex flex-column justify-center items-center border border-red-200 rounded-xl">
            <p className="text-2xl mb-5">
                {text}
            </p>
            <a  
            href={`https://www.google.com/search?q=${author}`}
            target="_blank"
            className="text-xl ml-auto">
                {author}
            </a>
            <CIcon 
              icon={cilDoubleQuoteSansLeft} 
              size="xxl"
              className="absolute top-[45%] left-[95%]"/>
        </div>
    )
}

export default QuoteCard;