import React from "react";
import { Link } from "wouter";

import "./index.css"

function Nav (props){
    return(
        <div>
            <Link href="/dishes"><a>dishes</a></Link>
            <Link href="/drinks"><a>drinks</a></Link>
            <Link href="/logIn"><a>log in</a></Link>
            <Link href="/checkIn"><a>check in</a></Link>
        </div>
    )
}

export default React.memo(Nav);