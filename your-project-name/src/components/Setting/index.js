import React, { useCallback, useState } from 'react';

const URL = 'http://localhost:3001/category';

function Setting(props) {
    const [value, setValue] = useState('');

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
                name: value,
            }),
        });

        props.setIndicator(Math.random());
        setValue('');
    }, [value]);

    return (
        <div>
            <p>Add new category:</p>
            <input type="text" value={value} onChange={change} />
            <button onClick={click}>add</button>
        </div>
    );
}

export default React.memo(Setting);
