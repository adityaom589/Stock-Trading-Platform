import React from 'react';
function RightSection({ productName, productDescription, imageUrl, learnMore }) {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 pt-5 mt-5'>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                     <a href={learnMore} style={{  textDecoration: "none" }}>Learn More<i class="fa-solid fa-arrow-right-long"></i></a>
                    </div>
                    <div className='col-6'>
                        <img src={imageUrl} style={{width:"98%"}}/>
                     </div>

                
            </div>
        </div>

    );
}

export default RightSection;