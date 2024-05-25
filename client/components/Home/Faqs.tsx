import { faqs } from "@/data/data";
import { useState, FC } from "react";
import { monst } from "@/public/fonts/f";
import { P } from "@/components/Typography";
import { MinusIcon, PlusIcon } from "@/public/svgs/svg";

const FaqItem: FC<FaqItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`block`} id="faqs">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`lg:max-w-[1000px] flex flex-row justify-between  items-center text-[15px] rounded-[2px] p-[17px] md:pl-[10px] md:text-[20px] font-semibold ${
          isOpen ? "bg-memo/5" : "bg-white text-black"
        }`}
      >
        {faq.question}
        {isOpen ? (
          <figure className="bg-memo rounded-full p-1 md:p-2">
            <MinusIcon
              className={`transition-all duration-200 w-[14px] h-[14px] md:w-[24px] md:h-[24px]`}
            />
          </figure>
        ) : (
          <figure className="border border-memo rounded-full p-1 md:p-2 ">
            <PlusIcon
              className={`transition-all duration-200 w-[14px] h-[14px] md:w-[24px] md:h-[24px]`}
            />
          </figure>
        )}
      </div>

      <div
        className={`transition-all duration-300 border-b-2 border-b-[#CECECE] ${
          isOpen
            ? "md:backdrop:max-h-[255px] pt-[14px] pb-[20px] md:pb-[40px] md:pt-[25px]"
            : "h-0 pb-0 pt-0"
        } overflow-hidden bg-white pr-[14px] pl-[10px] md:pr-[25px]`}
      >
        <p className="text-[#363636] text-[15px] max-w[360px] text-base font-medium md:max-w-3xl md:text-[18px] lg:font-normal">
          {faq?.answer}
        </p>
      </div>
    </div>
  );
};

const Faqs: React.FC<FaqsProps> = () => {
  return (
    <section
      className={`${monst.className} flex flex-col items-center mt-[40px] mx-[32px] md:mx-[66px] md:mt-[55px]`}
    >
      <div>
        <h2
          className={`text-black mx-auto block text-center font-semibold  text-[25px] leading-[34px] md:text-[45px] md:leading-[64px]`}
        >
          Frequently Asked <span className="text-memo">Questions</span>
        </h2>
        <P className="text-[#959595] leading-[64px]text-[18px] md:text-[20px] font-semibold mx-auto text-center ">
          Have question? we are here to help
        </P>

        <div className="lg:cursor-pointer mt-[37px] space-y-3 lg:space-y-0 lg:flex lg:flex-col items  lg:mx-[97px] lg:gap-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
