import React, {useRef, useState, useEffect} from 'react';
import { useKeyListener } from '@fremtind/jkl-react-hooks';
import cn from 'classnames';

import './typeahead.scss';

import suggestions from '../mockdata/suggestions';

const Typeahead = () => {
    const [value, setValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [capitalSuggestions, setCapitalSuggestions] = useState(suggestions.suggestions);

    const ref = useRef(null);
    const keys = ['ArrowUp', 'ArrowDown', 'Enter', 'Escape'];

    const onKeyPressed = (event) => {
        switch (event.key) {
            case 'ArrowDown':
                console.log("cevriye");
                if (selectedIndex < capitalSuggestions.length) {
                    setSelectedIndex(selectedIndex + 1);
                }
                break;
            case 'ArrowUp':
                if (selectedIndex !== 0) {
                    setSelectedIndex(selectedIndex - 1);
                }
                break;
            case 'Enter':
                if (capitalSuggestions.length > 0) {
                    if (selectedIndex === 0) {
                        setValue(value);
                    } else {
                        setValue(capitalSuggestions[selectedIndex - 1]);
                    }
                    setShowSuggestions(false);
                    setSelectedIndex(0);
                }
                break;
            case 'Escape':
                setValue('');
                setShowSuggestions(false);
                break;
        }
    };
    useKeyListener(ref, keys, onKeyPressed);

    return (
        <div className="typeahead">
            <input
                ref={ref}
                type="text"
                className="typeahead__input"
                value={value}
                placeholder="Type to see some suggestions"
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setShowSuggestions(false)}
            />
            <ul className="typeahead__list">
                {showSuggestions &&
                capitalSuggestions.map((suggestion, i) => {
                    const city = suggestion.capital;
                    return (
                        <li
                            className={cn('typeahead__list-item', {
                                typeahead__selected_li: i === selectedIndex - 1,
                            })}
                            key={i}
                            onMouseDown={() => {
                                setValue(city);
                                setShowSuggestions(false);
                            }}
                        >
                            {city}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Typeahead;