import React from "react";
import { Link } from "wouter";

import "./index.css"

function Nav (props){
    return(
        <div>
            <Link href="/dishes"><a>dishes</a></Link>
            <Link href="/drinks"><a>drinks</a></Link>
            <Link href="/singIn"><a>sign in</a></Link>
            <Link href="/signUp"><a>sign up</a></Link>
        </div>
    )
}

export default React.memo(Nav);