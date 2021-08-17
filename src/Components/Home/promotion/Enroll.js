import React, { useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { CircularProgress } from '@material-ui/core';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { showToastError, showToastSuccess } from '../../Utils/tools';
import { promotionsCollection } from '../../../firebase'

const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues:{ email:'' },
        validationSchema:Yup.object({
            email:Yup.string()
            .email('Invalid email')
            .required('The email is required')
        }),
        onSubmit:(values, {resetForm}) => {
            setLoading(true);
            submitForm(values)
        }
    });

    const submitForm = async(values) => {
        try {
            const emailAlreadyInDB = await promotionsCollection.where('email', 
            '==', values.email).get();

            if (emailAlreadyInDB.docs.length >= 1) {
                showToastError('Sorry you are already on our database');
                setLoading(false);
                return false;
            }

            await promotionsCollection.add({ email: values.email });
            formik.resetForm();
            setLoading(false);
            showToastSuccess('Congratulation! Now you are on the list')

        } catch(error) {
            showToastError(error)
        }
    }

    return (
        <Fade >
            <div className="enroll_wrapper">
                <form onSubmit={formik.handleSubmit}>
                    <div className="enroll_title">
                        Enter your email
                    </div>

                    <div className="enroll_input">
                        <input 
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Enter your email"
                        />

                        { formik.touched.email && formik.errors.email 
                            ?
                            <div className="error_label">
                                {formik.errors.email}
                            </div>
                            :
                            null
                         }

                        { loading 
                            ?
                            <CircularProgress 
                                color="secondary"
                                className="progress"
                            />
                            :
                            <button
                                type="submit"
                            >
                                Enroll
                            </button>
                        }

                        <div className="enroll_discl">
                            You can get Promotion to your email!
                        </div>
                    </div>
                </form>

            </div>
        </Fade>
    );
};

export default Enroll;