import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from "formik";
import axios from 'axios';
import * as Yup from 'yup';



const OnboardForm = ({errors, touched, values, status }) => {
    const [people, setPeople] = useState([]);
    console.log("Writing", touched);
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
            )}

            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && <p className="error">{errors.email}</p>}

            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && <p className="error">{errors.password}</p>}
            
            <label className="checkbox-container">
                Terms of Services
                <Field 
                type="checkbox"
                name="terms_of_service"
                checked={values.terms_of_service}
                />
                <span className="checkmark"/>
            </label>
            
            <button type="submit">Submit!</button>

        </Form>

        {people.map(person => (
            <ul key={person.id}>
                <li>Name: {person.name}</li>
                <li>Email: {person.email}</li>
                <li>Password: {person.password}</li>
                <li>Terms of Services: {person.terms_of_service}</li>
            </ul>
        ))}
    </div>
);
};

const FormikPeopleForm = withFormik ({
    mapPropsToValues({name, email, password,}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("This is required"),
        email: Yup.string().required("This is required"),
        password: Yup.string().required("This is required"),
        terms_of_service: Yup.string().required("This is required")
    }),



    handleSubmit(values, {setStatus}) {
        axios
            .post("https://reqres.in/api/users_", values)
            .then(response => {
                setStatus(response.data)
            })
            .catch(err => console.log("error"));
    }
})(OnboardForm);

export default FormikPeopleForm;