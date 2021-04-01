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
        console.log(picture)
        console.log(picture[0])
        if (picture[0]) {
            reader.readAsDataURL(picture[0]);
            reader.onload = function (e) {
                setPictures(reader.result);
            };
        }
    };

    const click = useCallback(() => {
        axios({
            method: 'post',
            url: URL,
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('id')
            },
            data: {
                id: '',
                type: params.id,
                name: value,
                link: pictures,
            }
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
                            <li key={Math.random()}>
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
                        singleImage="false"
                    />
                </div>
            )}
        </div>
    );
}

export default React.memo(Article);
