import React from "react";
export const Email=()=>
{
    const Submit=()=>
    {
        let ebody=`
        <b>Name::<b>${"Teja"}
        <br/>
        <b>Gmail::<b>${"mail"}
        <br>
        <b>Code::<b>${"code"}
        `
            window.Email.send({
                SecureToken : "67d18f85-7e11-4af3-b78a-ae6af55623e4",
                To : 'tejasimma36@gmail.com',
                From : "aolsrkr2002@gmail.com",
                Subject : "This is the subject",
                Body : ebody
            }).then(
              message => alert(message)
            );
    }
    return(
        <>
        <form method="post">
            <input type="button" value="send mail" onClick={Submit}></input>
        </form>
        </>
    )
}