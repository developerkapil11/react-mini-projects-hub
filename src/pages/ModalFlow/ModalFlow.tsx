import { useState } from "react";
import "./Modal.css";
function ModalFlow() {
    const [isModalShow, setIsModalShow] = useState(false)
    const [isOfferAccepted, setIsOfferAccepted] = useState(false)
    const handleOffer = () => {
        setIsModalShow(false)
        setIsOfferAccepted(true)
    }
    return (
        <>
            <section id="center">
                <div className="hero">  
                    {!isOfferAccepted ?
                        <button
                            className="offer-btn"
                            onClick={()=>setIsModalShow(true)}
                        >
                            Get Offer
                        </button>
                        :
                        <div className="offer-success">
                            <div className="success-icon">✅</div>

                            <h2>Offer Accepted!</h2>

                            <p>
                            Congratulations! Your Offer is Accepted.
                            </p>

                            <button
                            className="reset-btn"
                            onClick={()=>setIsOfferAccepted(false)}
                            >
                                Reset Offer
                            </button>
                        </div>
                    }
                </div>
            </section>
            {isModalShow &&
                <section id="spacer">
                    <div
                    className="modal-overlay"
                    onClick={()=>setIsModalShow(false)}
                    >
                        <div
                            className="modal"
                        >
                            <button
                            className="close-btn"
                            onClick={()=>setIsModalShow(false)}
                            >
                            ✕
                            </button>

                            <h2>🎉 Exclusive Offer</h2>

                            <p>
                            Congratulations! You've unlocked a special React +
                            Vite starter offer.
                            </p>

                            <p>
                            Get access to premium templates, reusable
                            components, project structures, and best
                            practices for modern frontend development.
                            </p>

                            <button
                            className="accept-btn"
                            onClick={handleOffer}
                            >
                            Accept Offer
                            </button>
                        </div>
                    </div>
                </section>
            }
        </>
    );
}

export default ModalFlow;