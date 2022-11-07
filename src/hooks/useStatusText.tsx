import { useState } from "react";
const useStatusText = (ShasError: boolean, SstatusText: string, SLoading: boolean) => {
  const [hasError, setHasError] = useState<boolean>(ShasError);
  const [statusText, setStatusText] = useState<string>(SstatusText);
  const [isLoading, setIsLoading] = useState<boolean>(SLoading);
  const setStatus = (x: { hasError?: boolean; statusText?: string; isLoading?: boolean }) => {
    if (x.hasError !== undefined) setHasError(x.hasError);
    if (x.statusText !== undefined) setStatusText(x.statusText);
    if (x.isLoading !== undefined) setIsLoading(x.isLoading);
  };
  const status = { hasError, statusText, isLoading };
  return { status, setStatus };
};

export default useStatusText;
