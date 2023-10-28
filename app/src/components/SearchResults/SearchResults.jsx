const SearchResults = ({ Data, BASE_URL }) => {
  return (
    <foodsection className="relative flex flex-wrap items-center justify-center text-white h-[70vh]">
      <card className="flex flex-wrap items-center justify-center">
        {Data?.map(({ name, price, text, image }) => (
          <footer key={name} className="flex items-center justify-center">
            <div className="sm:w-[380px] flex sm:ml-[20px] sm:mt-5 sm:px-5 w-[180px] ml-[10px] mt-2 px-2 py-2 bg-inherit backdrop-blur-lg border border-gray-400 rounded-2xl">
              <img
                className="mt-2 sm:h-[144px] h-[84px]"
                src={BASE_URL + image}
                alt={name}
              />
              <div className="flex flex-col">
                <h1 className="font-bold sm:mt-3 sm:text-lg sm:ml-4 mt-1 text-sm font-serif ">
                  {name}
                </h1>
                <p className="font-poppins font-thin sm:mt-3 sm:ml-4 sm:text-sm mt-1 ml-2 text-xs">
                  {text}
                </p>
                <div className="flex justify-end sm:mt-5 mt-2">
                  <button className="bg-[#FF7272] sm:text-base text-xs capitalize rounded-md py-0 font-poppins sm:w-[73px] w-[54px] font-bold hover:bg-[#f23b3b] duration-500">
                    ${price.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </footer>
        ))}
      </card>
    </foodsection>
  );
};
export default SearchResults;
