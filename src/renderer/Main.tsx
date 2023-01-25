export default function Main() {
  return (
    <main className="w-full h-full flex flex-row">
      <div className="bg-slate-300 basis-20 flex">
        <nav className="w-full">
          <ul className="flex flex-col space-y-8 items-center">
            <li>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 place-content-center"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Icon description</span>
              </button>
            </li>
            <li>템2</li>
          </ul>
        </nav>
      </div>
      <div className="bg-red-600 basis-full">main</div>
    </main>
  );
}
