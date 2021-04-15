import React from 'react';
import { Link } from 'wouter';

import './index.css';

function Nav(props) {
    return (
        <div>
            {props.status &&
                props.tupes.map((currentValue) => (
                    <Link href={currentValue.category} key={Math.random()}>
                        <a>{currentValue.category}</a>
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
