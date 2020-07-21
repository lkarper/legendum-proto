import React from 'react';

const BackgroundImage = (props) => {

    const { classPrefix, imgUrl, imageAltText, children } = props;

    return (
        <div className={`${classPrefix}__background-container`}>
            <span 
                className={`${classPrefix}__background-image`}
                role='img'
                aria-label={imageAltText}
                style={{
                    backgroundImage: `url( ${imgUrl} )`,
                    backgroundSize: 'cover',
                    backgroundPositionY: 'bottom',
                    backgroundPositionX: 'center'
                }}
            ></span>
            {children}
        </div>
    )
}

export default BackgroundImage;