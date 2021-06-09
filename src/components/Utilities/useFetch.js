import React from "react";
const useFetch = (url, dependency = []) => {
  const [data, setData] = React.useState(null);
  React.useEffect(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  }, dependency);
  return data;
};

export default useFetch;
