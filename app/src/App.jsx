import { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults/SearchResults";

const BASE_URL = "http://localhost:9000";

const App = () => {
  const [Data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  const [FilteredData, setFilteredData] = useState(null);
  const [SelectedFood, setSelectedFood] = useState("All");
  const [IsSelected, setIsSelected] = useState(false);

    // useEffect use to avoid infinite loops, cuz react does not support many times rendering variable.
  useEffect(() => {
    // here asynchronous function is used to perform a task without blocking the execution of the rest of our program.
    setLoading(true);
    const fetchFoodData = async () => {
      try {
        // the "await" keyword pause the execution of function until the Promise is resolved.
        // "fetch()" returns the Promise that represents the response to the request.
        const res = await fetch(BASE_URL);
        // converting "response" data into "json()" file.
        const data = await res.json();
        setData(data);
        setFilteredData(data);
        setLoading(false);
      } catch (error) {
        setError("An error occured", error);
      }
    };

    fetchFoodData();
  }, []);

  // this is filtering food from input search value.
  // Like if user write "boiled" then "boiled name" of menu appears in the list, if it is not appearing, means that food item is not available.
  const SearchFood = (e) => {
    const searchVal = e.target.value;
    if (searchVal === "") setFilteredData(null);

     // here "food.name" checks if it contains "searchValue", then only those "food name" will be filtered.
    // here "searchValue" is nothing but the name written by an user.
    // "food.name" which contains all food names in the list of data.
    const filter = Data.filter((food) =>
      food.name.toLowerCase().includes(searchVal.toLowerCase())
    );
    setFilteredData(filter);
  };

  // this arrow funciton works when user click on button categories, like, "all, breakfast,lunch & dinner".
  const filteredFood = (type) => {
    if (type === "All") {
      setFilteredData(Data);
      setSelectedFood("All");
      return;
    }

    const filter = Data.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedFood(type);

    setIsSelected(type);
  };

  // this is for all buttons categories included all, breakfast, lunch and dinner.
  const selectBtns = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  // it shows an error, if program does not execute successfully.
  if (Error) return <div>{Error}</div>;

  // this is the loading page while page fetching the data.
  if (Loading) {
    return (
      <div className="mt-[40px] ml-[55px]">
        <h1 className="font-bold text-4xl text-[#FF7272]">Loading.....</h1>
        <span className="flex ml-[15px] items-center justify-center animate-spin border rounded-full mt-10 border-y-[10px] border-x-[10px] border-y-[#FF7272] border-x-rose-700 h-[60px] w-[60px]"></span>
      </div>
    );
  }

  return (
    <mainpage className="flex flex-col h-[100vh]">
      <topsection className="flex flex-col items-center justify-between h-[180px] bg-[#323334] pb-[20px]">
        <div className="flex sm:justify-between sm:flex-row w-full h-full sm:px-[10%] sm:mt-[2%] sm:items-center px-[5%] mt-[5%] flex-col">
          <img src="/logo.svg" alt="logo" className="sm:w-[205px] w-[105px]" />
          <input
            onChange={SearchFood}
            type="text"
            placeholder="Search Food..."
            className="sm:py-2 sm:text-2xl sm:mt-[1%] border border-[#FF7272] text-white font-mono outline-none sm:px-4 rounded-md bg-transparent mt-[3%] px-2 py-1 text-lg"
          />
        </div>
        <span className="text-white">
          {selectBtns.map(({ name, type }) => (
            <button
              onClick={() => filteredFood(type)}
              key={name}
              className={`bg-[#FF7272] sm:text-xl capitalize rounded-md sm:px-4 py-0 px-2 text-base font-poppins hover:bg-[#f23b3b] duration-500 sm:ml-5 ml-3 ${
                IsSelected === type ? "bg-[#f23b3b]" : "bg-[#FF7272]"
              }`}
            >
              {name}
            </button>
          ))}
        </span>
      </topsection>

      <section className="min-h-[calc(100vh-180px)] relative">
        <div
          alt="background-image"
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url(/bg.png)" }}
        ></div>
        <SearchResults Data={FilteredData} BASE_URL={BASE_URL} />
      </section>
    </mainpage>
  );
};
export default App;
