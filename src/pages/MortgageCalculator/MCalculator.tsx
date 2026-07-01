import { useState } from "react";
import "./MCalculator.css";

export default function MortgageCalculator() {
    const [principal, setPrincipal] = useState("200000")
    const [interest, setInterest] = useState("10")
    const [year, setYear] = useState("5")

    const calculateEMI = () => {
        const p = Number(principal)
        const r = Number(interest) / 12 / 100
        const n = Number(year) * 12

        if(!p || !n) return 0;
        if(r === 0) return Math.round(p / n)

        const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1+r,n)-1) 

        return Math.round(emi)
    }

    //   (p * r * Math.pow(1 + r, n)) /
    //   (Math.pow(1 + r, n) - 1);

    return (
        <div className="app">
        <div className="card">
            <h2>Mortgage Calculator</h2>

            <div className="form-group">
            <label>Principal</label>
            <input
                type="number"
                value={principal}
                onChange={(e)=>setPrincipal(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label>Interest (%)</label>
            <input
                type="number"
                value={interest}
                onChange={(e)=>setInterest(e.target.value)}
            />
            </div>

            <div className="form-group">
            <label>Years</label>
            <input
                type="number"
                value={year}
                onChange={(e)=>setYear(e.target.value)}
            />
            </div>

            <div className="result">
            <p>Your EMI is</p>
            <h3>₹ {calculateEMI()}</h3>
            </div>
        </div>
        </div>
    );
}