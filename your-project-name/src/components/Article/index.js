import React, { useCallback, useState } from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';
import { useRoute } from 'wouter';

const URL = 'http://localhost:3001/lists';

function Article(props) {
    const [value, setValue] = useState('');
    const [match, params] = useRoute('/:id');
    const [pictures, setPictures] = useState('');

    const change = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onDrop = (picture) => {
        var reader = new FileReader();
        if (picture[0]) {
            reader.readAsDataURL(picture[0]);
            reader.onload = async function (e) {
                let a = await setPictures(reader.result);
                return a;
            };
        }
    };

    const click = useCallback(() => {
        axios({
            method: 'post',
            url: URL,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('id'),
            },
            data: {
                category: params.id,
                name: value,
                photo: pictures,
            },
        }).then(() => {
            props.setIndicator(Math.random() * Math.random() * Math.random());
            setValue('');
        });
    }, [value]);

    let preference = [];
    if (match) {
        preference = props.data.filter((currentValue) => currentValue.category === params.id);
    }

    return (
        <div>
            {match && props.types.find((currentValue) => currentValue.category === params.id) && (
                <div>
                    <h2>{params.id}:</h2>
                    <ul>
                        {preference.map((currentValue) => (
                            <li key={Math.random()}>
                                <p>{currentValue.name}</p>
                                <img src={currentValue.photo} alt={currentValue.name} />
                            </li>
                        ))}
                    </ul>
                    <p>add {params.id}:</p>
                    <input type="text" value={value} onChange={change} />
                    <button onClick={click}>add</button>
                    <ImageUploader
                        onChange={onDrop}
                        buttonText={'Choose images'}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        withPreview={false}
                        singleImage={false}
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(Article);
