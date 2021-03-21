import React from 'react';
import { Link } from 'wouter';

import './index.css';

function Nav(props) {
    return (
        <div>
            {props.status &&
                props.tupes.map((currentValue) => (
                    <Link href={currentValue.name} key={currentValue.name}>
                        <a>{currentValue.name}</a>
                    </Link>
                ))}
            <Link href="/singIn">
                <a>sign in</a>
            </Link>
            <Link href="/signUp">
                <a>sign up</a>
            </Link>
            <Link href="/setting">
                <a>setting</a>
            </Link>
        </div>
    );
}

export default React.memo(Nav);
