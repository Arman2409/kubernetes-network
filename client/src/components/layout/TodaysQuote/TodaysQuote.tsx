import { useEffect, useState } from "react";
import { Quote } from "../../../types/global";
import { Request } from "../../../api/request";
import QuoteCard from "../../shared/QuoteCard/QuoteCard";

const DaysQuote = () => {
  const [todaysQuote, setTdaysQuote] = useState<Quote>();
  const [loading, setLoading] = useState<boolean>(false);

  const getTodays = async () => {
    setLoading(true);
    const result = await Request.getInstance().getTodays();

    if (result) {
      if(result?.error) {
        return;
      }

      if(typeof result === "object") {
        setTdaysQuote(result)
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    getTodays();
  }, [])

  return (
    <div className="w-[100%] flex justify-center">
      <div className="w-[90%] text-green-500 p-4 flex justify-evenly items-center border-t border-purple-300">
        <h2>
          Today's Quote
        </h2>
        <QuoteCard
         loading={loading}
         quote={todaysQuote}/>
      </div>

    </div>
  )
}

export default DaysQuote;