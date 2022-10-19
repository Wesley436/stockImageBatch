import { createContext, useState } from 'react';

export const StockImageContext = createContext();

export default function StockImageContextProvider(props) {
    const [inputPrompt, setInputPrompt] = useState('');
    const [inputPrompts, setInputPrompts] = useState([]);

    return (
        <StockImageContext.Provider
            value={{
                inputPrompt, setInputPrompt,
                inputPrompts, setInputPrompts,
            }}
        >
            {props.children}
        </StockImageContext.Provider>
    );
}