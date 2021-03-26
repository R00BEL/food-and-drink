import React, { useCallback, useState } from 'react';
import ImageUploader from 'react-images-upload';
import { useRoute } from 'wouter';

const URL = 'http://localhost:3002/addFoodAndDrinks';

function Article(props) {
    const [value, setValue] = useState('');
    const [match, params] = useRoute('/:id');
    const [pictures, setPictures] = useState('');

    const change = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onDrop = (picture) => {
        var reader = new FileReader();
        reader.readAsDataURL(picture[0]);
        reader.onload = function (e) {
            setPictures(reader.result);
        };
    };

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
                link: pictures,
            }),
        });
        props.setIndicator(Math.random());
        setValue('');
    }, [value]);

    let preference = [];
    if (match) {
        preference = props.data.filter((currentValue) => currentValue.type === params.id);
    }

    return (
        <div>
            {match && props.types.find((currentValue) => currentValue.name === params.id) && (
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
                    <ImageUploader
                        onChange={onDrop}
                        buttonText="Choose images"
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        withPreview="true"
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(Article);
