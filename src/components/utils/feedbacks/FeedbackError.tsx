import Link from 'next/link';
import { AiFillCloseCircle, AiOutlineArrowRight } from 'react-icons/ai';

type TypeData = {
  link?: string;
  textLink?: string;
  text: string;
};

export default function FeedbackError({ link, text, textLink }: TypeData) {
  return (
    <div className="rounded-md bg-rede-red-800/50 p-2 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AiFillCloseCircle
            className="h-5 w-5 text-rede-red-500"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-rede-red-500">{text}</p>

          {link && textLink && (
            <p className="mt-3 text-sm md:ml-6 md:mt-0 ">
              <Link
                href={link}
                className="whitespace-nowrap font-medium text-red-700 hover:text-red-600 inline-flex items-center align-middle"
              >
                <span className="mr-1">{textLink}</span>
                <AiOutlineArrowRight />
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
