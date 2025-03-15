import { useEffect, useState } from "react";
import { Quote } from "../../../types/global";
import { Request } from "../../../api/request";

const DaysQuote = () => {
  const [todaysQuote, setTdaysQuote] = useState<Quote>();

  const getTodays = async () => {
    const result = await Request.getInstance().getTodays();

    console.log(result);
    
    if (result) {
      setTdaysQuote({
        Author: result?.Author,
        Text: result?.Text
      })
    }
  }

  useEffect(() => {
    getTodays();
  }, [])

  return (
    <div className="h-[100px] flex justify-center items-center">
      <h2>
        Today's Quote
      </h2>
      <p>
        {todaysQuote?.Text || "Hello World"}
      </p>
    </div>
  )
}

export default DaysQuote;