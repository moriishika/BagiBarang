import router from "next/router";

const Backbar = ({link}) => {
  return (
    <div className="bg-white h-20 flex justify-items-center sticky top-0 z-50">
      <a onClick={() => link ? router.push(link) : router.back()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-4 w-14 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16l-4-4m0 0l4-4m-4 4h18"
          />
        </svg>
      </a>
    </div>
  );
};

export default Backbar;
