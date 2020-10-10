import React from 'react';
import PropTypes from 'prop-types';

const BackgroundImage = (props) => {
    const { 
        classPrefix, 
        imgUrl, 
        imageAltText, 
        children, 
    } = props;

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
            />
            {children}
        </div>
    );
}

BackgroundImage.defaultProps = {
    classPrefix: '', 
    imgUrl: '', 
    imageAltText: 'Default background.', 
};

BackgroundImage.propTypes = {
    classPrefix: PropTypes.string, 
    imgUrl: PropTypes.string,
    imageAltText: PropTypes.string, 
    children: PropTypes.element, 
};

export default BackgroundImage;
