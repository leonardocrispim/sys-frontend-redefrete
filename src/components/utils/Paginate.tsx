'use client';
import {
  AiOutlineRight,
  AiOutlineLeft,
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
} from 'react-icons/ai';

function Pagebutton({
  x,
  func,
  currentPage,
}: {
  x: number;
  func: Function;
  currentPage: number;
}) {
  const classHover = ' hover:bg-rede-gray-700 text-rede-blue';
  const classButton =
    'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0';
  return (
    <button
      key={`page-${x}`}
      onClick={() => func(x)}
      className={
        classButton +
        (currentPage == x
          ? `  text-rede-gray-700 bg-rede-blue-100`
          : classHover)
      }
    >
      {x + 1}
    </button>
  );
}

export default function Paginate({
  currentPage,
  totalItems,
  itemsPerPage,
  hook,
}: {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  hook: Function;
}) {
  if (totalItems / itemsPerPage <= 1) {
    return <span></span>;
  }

  const pgTotal = Math.ceil(totalItems / itemsPerPage);

  let pages = [];
  const squares = Math.min(pgTotal, 7);
  const middle = Math.floor(squares / 2);

  for (let x = 0; x < squares; x++) {
    let xpage = 0;

    if (currentPage - middle > 0) {
      xpage = currentPage - middle;
    }

    if (currentPage + middle >= pgTotal) {
      xpage = pgTotal - squares;
    }

    if (xpage + x < 0) {
      continue;
    }

    pages.push(
      <Pagebutton
        key={`page-${xpage + x}`}
        x={xpage + x}
        func={hook}
        currentPage={currentPage}
      />
    );
  }

  return (
    <div>
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        {currentPage > 0 && (
          <>
            <button
              onClick={() => hook(0)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <AiOutlineDoubleLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => hook(currentPage - 1)}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <AiOutlineLeft className="h-5 w-5" />
            </button>
          </>
        )}

        {pages}

        {currentPage + 1 < pgTotal && (
          <>
            <button
              onClick={() => hook(currentPage + 1)}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <AiOutlineRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => hook(pgTotal - 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <AiOutlineDoubleRight className="h-5 w-5" />
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
