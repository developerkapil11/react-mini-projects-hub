import { useState } from "react";
import FaqItem from "./FaqItem";
import "./Faq.css";

const IT_FAQs = [
  {
    question: "What is Information Technology (IT)?",
    answer:
      "Information Technology (IT) refers to the use of computers, storage, networking, and other devices to create, process, store, and secure electronic data."
  },
  {
    question: "What are common IT job roles?",
    answer:
      "Common IT job roles include Software Developer, Network Engineer, Data Analyst, IT Support Specialist, and Cybersecurity Analyst."
  },
  {
    question: "What is cloud computing?",
    answer:
      "Cloud computing is the delivery of computing services (servers, storage, databases, networking, software) over the internet to offer faster innovation and flexible resources."
  },
  {
    question: "What is the difference between hardware and software?",
    answer:
      "Hardware is the physical part of a computer (like CPU, RAM, keyboard), while software is a set of instructions (programs) that tells hardware what to do."
  },
  {
    question: "What skills are important in IT?",
    answer:
      "Important IT skills include problem-solving, programming, networking, cybersecurity, database management, and cloud platforms like AWS or Azure."
  }
];

const FaqComp = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => {
      return prev === index ? null  : index;
    });
  };
  return (
    <div className="faq-page">
      <div className="faq-list">
        {IT_FAQs.map((item, index) => (
          <FaqItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex == index}
            onToggle = {()=>handleToggle(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqComp;