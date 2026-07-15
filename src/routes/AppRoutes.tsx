import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home/Home";
import { CountdownTimer } from "../pages/CountdownTimer/CountdownTimer";
import FaqComp from "../pages/Faq/FaqComp";
import ModalFlow from "../pages/ModalFlow/ModalFlow";
import MortgageCalculator from "../pages/MortgageCalculator/MCalculator";
import UndoableCounter from "../pages/UndoableCounter/UndoableCounter";
import ShoppingList from "../pages/ShoppingList/ShoppingList";

const AppRoutes = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<Home />}
            />
            <Route path='/countdown-timer' element={<CountdownTimer />} />
            <Route path='/faq' element={<FaqComp />} />
            <Route path='/modal-flow' element={<ModalFlow />} />
            <Route path='/mortgage-calculator' element={<MortgageCalculator />} />
            <Route path='/undoable-counter' element={<UndoableCounter/>} />
            <Route path='/shopping-list' element={<ShoppingList/>} />
        </Routes>
    )
}

export default AppRoutes;