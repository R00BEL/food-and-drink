import React, { useCallback, useState } from 'react';
import { useRoute } from 'wouter';

const URL = 'http://localhost:3002/addFoodAndDrinks';

function Article(props) {
    const [value, setValue] = useState('');
    const [match, params] = useRoute('/:id');

    const change = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const click = useCallback(() => {
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('id'),
            },
            body: JSON.stringify({
                id: '',
                type: params.id,
                name: value,
                link: 'images/crash.jpg',
            }),
        });
        props.setIndicator(Math.random());
        setValue('');
    }, [value]);

    const preference = props.data.filter((currentValue) => currentValue.type === params.id);

    return (
        <div>
            {props.types.find((currentValue) => currentValue.name === params.id) && match && (
                <div>
                    <h2>{params.id}:</h2>
                    <ul>
                        {preference.map((currentValue) => (
                            <li key={currentValue.name}>
                                <p>{currentValue.name}</p>
                                <img src={currentValue.link} alt={currentValue.name} />
                            </li>
                        ))}
                    </ul>
                    <p>add {params.id}:</p>
                    <input type="text" value={value} onChange={change} />
                    <button onClick={click}>add</button>
                </div>
            )}
        </div>
    );
}

export default React.memo(Article);
