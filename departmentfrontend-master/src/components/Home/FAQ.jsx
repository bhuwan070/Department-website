// components/FAQ.js
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDropDownCircleSharp } from '@mui/icons-material';
import { faqs } from '../../data/faqs';
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  console.log(activeIndex);

  return (
    <div className={`md:w-[80%] mx-auto w-full py-8 md:p-8 font-[Montserrat]`}>
      <h2 className="text-xl md:text-4xl font-semibold mb-6 text-primary-400 text-center select-none ">
        Frequently Asked Questions
      </h2>

      <div className="flex flex-col gap-4 ">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="py-3 px-4 md:px-8 bg-neutral-100 flex flex-col justify-center rounded-lg"
            onClick={() => toggleFAQ(index)}
          >
            <div className="w-full flex justify-between">
              <button className="text-left md:text-xl font-medium focus:outline-none">
                {faq.question}
              </button>
              <motion.div
                initial="collapsed"
                animate={activeIndex === index ? 'open' : 'collapsed'}
                variants={{
                  open: { rotate: 180 },
                  collapsed: { rotate: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="text-[#245380] hover:text-primary-400 text-[1.6rem] flex items-center cursor-pointer transition-colors duration-300 "
              >
                <ArrowDropDownCircleSharp color="inherit" fontSize="inherit" />
              </motion.div>
            </div>
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate={activeIndex === index ? 'open' : 'collapsed'}
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                  exit={{ height: 0 }}
                  className={`cursor-default overflow-hidden text-[12px] md:text-base `}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
