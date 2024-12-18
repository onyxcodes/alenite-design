import React from 'react';
import './index.scss';
import Button from '../Button';
import { InputRefType } from './types';

interface FormProps {
    children: JSX.Element | JSX.Element[];
    name?: string;
    submit: JSX.Element;
    onSubmit?: ( formData: {} ) => void;
    fieldsClass?: string;
    className?: string;
}
const Form = ( props: FormProps ) => {
    const { children, name, submit, onSubmit, fieldsClass, className } = props;
    const inputsRef = React.useRef<(InputRefType)[]>([]);
    const [ isInvalid, markInvalid ] = React.useState(false);

    let _className = 'alenite-form';
    if (className) _className = `${className} ${_className}`;

    let _fieldClass = 'alenite-form-fields f fd-row fw jcb my05';
    if (fieldsClass) _fieldClass = `${_fieldClass} ${fieldsClass}`;

    // Assures that _children is an array, event when it's not
    const _children = ([] as JSX.Element[]).concat(children);

    // Clears inputs ref list when children changes
    React.useEffect( () => {
        inputsRef.current = inputsRef.current.slice(0, _children.length);
    }, [_children]);

    /* Callback ref that filters, accepting only references
     * having isInputRefType as property, or rather InputRefTypes
     */
    const addInputRef = (element: JSX.Element | InputRefType, i: number) => {
        if ( element && element.hasOwnProperty('isInputRefType') ) {
            return inputsRef.current[i] = element as InputRefType;
        }
    }

    /* Renders all given child while using callback ref to dinamically populate ref array
     */
    const renderedChildren = React.useMemo( () => _children.map( (child, i) => {
        return <child.type key={i}
            ref={(el: JSX.Element | InputRefType) => addInputRef(el,i)}
        {...child.props} />
    }), [_children]);
    
    const submitForm = () => {
        let validity = [],
            /* formData is an object with field's mapped to their values
             */
            formData: {
                [fieldName: string]: string | undefined
            } = {};

        for ( const inputRef of inputsRef.current ) {

            // Checks field's validity and adds error, if present
            let inputValidity = inputRef.checkValidity();
            if ( inputValidity.length ) validity.push(inputValidity);

            // Append field's data to form's data
            if (inputRef.current?.name)
                formData[inputRef.current?.name] = inputRef.current?.value;
        }

        // Marks the form as invalid when there is at least one field error
        if ( validity.length ) {
            markInvalid(true);
        } else {
            markInvalid(false);
            // When provided, executes callback 'onSubmit' with form's data
            onSubmit && onSubmit(formData)
        }
    }
    
    const submitComponent = React.useMemo( () => {
        if (!submit) {
            return <Button 
                type='primary' 
                className='alenite-form-submit f-right' onClick={submitForm}>
                    Submit
            </Button>
        } else {
            return <submit.type {...submit.props} onClick={() => {
                submit.props.onClick && submit.props.onClick();
                submitForm();
            }}/>
        }
    },[submit]);

    return <form name={name} className={_className}>
        <div className={_fieldClass}>{renderedChildren}</div>
        { submitComponent }
        { isInvalid ?
            <span className='form-error t6 my05'>Check the fields for errors</span> : null
        }
    </form>
}

export default Form;