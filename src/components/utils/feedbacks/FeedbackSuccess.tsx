import Link from 'next/link';
import { AiFillCheckCircle, AiOutlineArrowRight } from 'react-icons/ai';

type TypeData = {
  link?: string;
  textLink?: string;
  text: string;
};

export default function FeedbackSuccess({ link, text, textLink }: TypeData) {
  return (
    <div className="rounded-md bg-rede-green-700/50 p-2 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <AiFillCheckCircle
            className="h-5 w-5 text-rede-green"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-rede-green">{text}</p>

          {link && textLink && (
            <p className="mt-3 text-sm md:ml-6 md:mt-0 ">
              <Link
                href={link}
                className="whitespace-nowrap font-medium text-green hover:text-green-600 inline-flex items-center align-middle"
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
