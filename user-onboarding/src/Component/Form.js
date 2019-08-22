import { Form, Field, withFormik } from "formik";
import { useState, useEffect} from 'react';
import axios from 'axios';
import * as yup from 'yup';


const onboardForm = ({errors, touched, values, status }) => {
    const [people, setPeople] = useState([]);
    console.log("this is touched", touched);
    useEffect(() => {
        if (status) {
        setPeople([...people, status])
    }
}, [status]);

return (
    <div className="people-form">
        <h1>People Form</h1>
        <Form>
            <Field type="text" name="name" placeholder="Name" />
            {touched.name && errors.name && (
                <p className="errors">{errors.name}</p>
            )};

            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            
            <label className="checkbpx-container">
                Vaccination
                <Field 
                type="checkbox"
                name="terms_of_service"
                checked={values.terms_of_service}
                />
                <span className="checkmark"/>
            </label>
            
            <button type="submit">Submit!</button>

        </Form>
    </div>
)
}

export default onboardForm;