import React, { useState, useCallback } from 'react'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        lastname: '',
        events: '',
        notes: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const changeHandler = useCallback((e) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }, [errors]);

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "براہ کرم اپنا نام درج کریں";
        }
        if (!formData.email.trim()) {
            newErrors.email = "براہ کرم اپنا ای میل درج کریں";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "براہ کرم درست ای میل درج کریں";
        }
        if (!formData.subject.trim()) {
            newErrors.subject = "براہ کرم اپنا موضوع درج کریں";
        }
        if (!formData.lastname.trim()) {
            newErrors.lastname = "براہ کرم اپنا خاندانی نام درج کریں";
        }
        if (!formData.events.trim()) {
            newErrors.events = "اپنی تقریب کی فہرست منتخب کریں";
        }
        if (!formData.notes.trim()) {
            newErrors.notes = "براہ کرم اپنا نوٹ درج کریں";
        }
        
        return newErrors;
    }, [formData]);

    const submitHandler = useCallback(async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }
        
        try {
            // Here you would typically send the data to your backend
            console.log('Form submitted:', formData);
            
            // Reset form on successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                lastname: '',
                events: '',
                notes: '',
                message: ''
            });
            setErrors({});
            
                // You might want to show a success message here
                alert('پیغام کامیابی سے بھیجا گیا!');
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'پیغام بھیجنے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔' });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm]);

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div className="form-field">
                            <input
                                value={formData.name}
                                onChange={changeHandler}
                                type="text"
                                name="name"
                                placeholder="نام"
                                disabled={isSubmitting}
                            />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                    <div className="form-field">
                        <input 
                            value={formData.lastname} 
                            onChange={changeHandler} 
                            type="text" 
                            name="lastname" 
                                placeholder="خاندانی نام"
                            disabled={isSubmitting}
                        />
                        {errors.lastname && <p className="error-text">{errors.lastname}</p>}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-field">
                        <input 
                            onChange={changeHandler} 
                            value={formData.email} 
                            type="email" 
                            name="email" 
                                placeholder="ای میل"
                            disabled={isSubmitting}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-field">
                        <input 
                            onChange={changeHandler} 
                            value={formData.subject} 
                            type="text" 
                            name="subject" 
                                placeholder="موضوع"
                            disabled={isSubmitting}
                        />
                        {errors.subject && <p className="error-text">{errors.subject}</p>}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-field">
                        <textarea 
                            name="message" 
                                placeholder="پیغام"
                            value={formData.message}
                            onChange={changeHandler}
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-submit">
                        <button 
                            type="submit" 
                            className="theme-btn"
                            disabled={isSubmitting}
                        >
                                {isSubmitting ? 'بھیجا جا رہا ہے...' : 'پیغام بھیجیں'}
                        </button>
                    </div>
                </div>
                {errors.submit && (
                    <div className="col-lg-12">
                        <p className="error-text">{errors.submit}</p>
                    </div>
                )}
            </div>
        </form>
    );
};

export default ContactForm;