import { useEffect, useState } from "react";
import { Quote } from "../../../types/global";
import { Request } from "../../../api/request";
import QuoteCard from "../../shared/QuoteCard/QuoteCard";

const DaysQuote = () => {
  const [todaysQuote, setTdaysQuote] = useState<Quote>();

  const getTodays = async () => {
    const result = await Request.getInstance().getTodays();

    if (result) {
      if(result?.error) {
        return;
      }

      setTdaysQuote(result)
    }
  }

  useEffect(() => {
    getTodays();
  }, [])

  return (
    <div className="w-[100%] flex justify-center">
      <div className="w-[90%] p-4 flex justify-between items-center border-t border-b border-red-500">
        <h2>
          Today's Quote
        </h2>
        {todaysQuote && <QuoteCard {...todaysQuote}/>}
      </div>

    </div>
  )
}

export default DaysQuote;