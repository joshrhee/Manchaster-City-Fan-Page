import React from 'react';
import {Link} from 'react-router-dom';
import {firebase} from '../../firebase';
import mcitylogo from '../../Resources/images/logos/manchester_city_logo.png';

import { FormHelperText } from '@material-ui/core';

import { toast } from 'react-toastify';

export const CityLogo = (props) => {
    const template = 
    <div 
        className="img_cover" 
        style={{
            width: props.width,
            height: props.height,
            background:`url(${mcitylogo}) no-repeat`
        }}>
    </div>

    if (props.link) {
        return (
            <Link className="link_logo" to={props.linkTo }>
                {template}
            </Link>
        )
    } else {
        return template
    }
}

export const Tag = (props) => {
    const template = 
    <div
        style={{
            background: props.bck ? props.bck : '#ffffff',
            fontSize: props.size ? props.size : '15px',
            color: props.color ? props.color : '#000000',
            padding: '5px 10px',
            display: 'inline-block',
            fontFamily: 'Righteous',
            ...props.add
        }}
    >
        {props.children}
    </div>

    if (props.link) {
        return(
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    }
    return template
}

export const showToastError = (message) => {
    toast.error(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const showToastSuccess = (message) => {
    toast.success(message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
}

export const logOutHandler = () => {
    firebase.auth().signOut()
    .then(() => {
        showToastSuccess('Good bye!!')
    }).catch( error => {
        showToastError(error.message)
    })
}

export const textErrorHelper = (formik, values) => ({
    error:formik.errors[values] && formik.touched[values],
    helperText:formik.errors[values] && formik.touched[values] 
        ? formik.errors[values] 
        : null
})

export const selectErrorHelper = (formik, values) => {
    if (formik.errors[values] && formik.touched[values]) {
        return (<FormHelperText>{formik.errors[values]}</FormHelperText>)
    } 
    return false;
}

export const selectIsError = (formik, values) => {
    return formik.errors[values] && formik.touched[values];
}