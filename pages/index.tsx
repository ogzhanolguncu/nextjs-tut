import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

type ChuckJoke = {
  categories: [];
  created_at: string;
  icon_url: string;
  id: string;
  updated_at: string;
  url: string;
  value: string;
};

const Home: NextPage = () => {
  const [joke, setJoke] = useState<ChuckJoke>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchAJoke = async () => {
    setIsLoading(true);
    const response = await axios.get<ChuckJoke>(
      "https://api.chucknorris.io/jokes/random"
    );
    setJoke(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchWithTimer = setInterval(fetchAJoke, 2000);

    return () => clearInterval(fetchWithTimer);
  }, []);

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        Loading!!!!!!
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
      }}
    >
      {joke?.value}
    </div>
  );
};

export default Home;
