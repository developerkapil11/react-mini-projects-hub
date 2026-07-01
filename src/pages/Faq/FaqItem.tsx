type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: ()=>void;
};

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle
}) => {
    return (
        <div className={`faq-card ${isOpen ? "active" : ""}`}>
        <div
            className="faq-question"
            onClick={onToggle}
        >
            <h3>{question}</h3>

            <span className={`faq-icon ${isOpen ? "rotate" : ""}`}>
                {isOpen ? "−" : "+"}
            </span>
        </div>

        <div
            className={`faq-answer-wrapper ${isOpen ? 'show' : ''}`}
        >
            <div className="faq-answer">
            <p>{answer}</p>
            </div>
        </div>
        </div>
    );
};

export default FaqItem;