import { useState } from "react";
import "./MCalculator.css";

export default function MortgageCalculator() {
    const [formData, setFormData] = useState({
        principal:200000,
        interest: 10,
        year: 5
    })
    
    const handleChange = (e:any) => {
        const {name, value} = e.target
        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const calculateEMI = () => {
        const p = formData.principal
        const r = formData.interest / 12 / 100
        const n = formData.year * 12

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
                name="principal"
                type="number"
                value={formData.principal}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Interest (%)</label>
            <input
                name="interest"
                type="number"
                value={formData.interest}
                onChange={handleChange}
            />
            </div>

            <div className="form-group">
            <label>Years</label>
            <input
                name="year"
                type="number"
                value={formData.year}
                onChange={handleChange}
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