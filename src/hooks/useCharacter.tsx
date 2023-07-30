import { useState } from "react";
export const useCharacter = () => {
  const [event, setEvent] = useState("NONE");

  return { event, setEvent };
};
