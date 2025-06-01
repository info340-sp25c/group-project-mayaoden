import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CheckboxGroup from '../components/CheckboxGroup';
import PageHeader from '../components/PageHeader';
import DateInput from '../components/DateInput';
import SelectDropdown from '../components/SelectDropdown';
import TextInput from '../components/TextInput';
import TextareaInput from '../components/TextareaInput';
import FileUploadInput from '../components/FileUpload';
import FormButtons from '../components/FormButtons';
import { saveLog, updateLog } from '../firebase/Database';

function InputLog() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const entry = location.state?.entry || {};
    const isEdit = Boolean(entry.id);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const wasteTypeOptions = [
        { label: 'Plastic', value: 'plastic' },
        { label: 'Paper', value: 'paper' },
        { label: 'Food', value: 'food' },
        { label: 'Glass', value: 'glass' },
        { label: 'Other', value: 'other' },
    ];

    const wasteActionOptions = [
        { label: 'Recycled', value: 'recycled' },
        { label: 'Composted', value: 'composted' },
        { label: 'Landfill', value: 'landfill' }
    ];

    const amountOptions = [
        { label: 'Small (fits in your hand)', value: 'small' },
        { label: 'Medium (fills a small bag)', value: 'medium' },
        { label: 'Large (fills a bin or more)', value: 'large' },
    ];

    const itemDetailsInput = {
        label: "Items Involved + Actions Taken:",
        id: "items",
        placeholder: "e.g. composted food scraps, reused glass jar"
    };

    const notesInput = {
        label: "Notes (optional):",
        id: "notes",
        placeholder: "Any extra info you'd like to add..."
    };

    const uploadField = {
        label: "Upload a photo (optional):",
        id: "upload"
    };

    function formatDateForInput(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toISOString().split('T')[0];
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (isSubmitting) return;
        
        const form = e.target.form || e.target.closest('form');
        const formData = new FormData(form);

        const date = formData.get("date");
        const tagType = formData.getAll("wasteType");
        const amount = formData.get("amount");
        const action = formData.get("wasteAction");
        const items = formData.get("items");
        const notes = formData.get("notes");

        const newErrors = {};
        if (!date) newErrors.date = "Date is required.";
        if (!tagType.length) newErrors.tagType = "Please select a type of waste.";
        if (!amount) newErrors.amount = "Please select an amount.";
        if (!action) newErrors.action = "Please select an action.";
        if (!items) newErrors.items = "This field is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (!currentUser) {
            alert('You must be logged in to submit entries.');
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const newEntry = {
            id: entry.id || uuidv4(),
            userId: currentUser.uid,
            date,
            tagType,
            tagLabel: tagType.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
            amount,
            action,
            items,
            notes,
            timestamp: Date.now()
        };

        try {
            let result;
            if (isEdit) {
                result = await updateLog(entry.id, newEntry);
            } else {
                result = await saveLog(newEntry);
            }

            if (result.success) {
                navigate('/log');
            } else {
                console.error('Error saving entry:', result.error);
                alert('Error saving entry. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error saving entry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleCancel() {
        navigate('/log');
    }

    return (
        <>
            <PageHeader
                title="🌱 Waste Reduction Input Log"
                subtitle="Log your waste to reduce your impact and gain points!"
            />
            <main>
                <form>
                    <div className="form-group date-field-gap">
                        <DateInput
                            defaultValue={formatDateForInput(entry.date)}
                            className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <p className="error-text">{errors.date}</p>}
                    </div>

                    <div className="form-group">
                        <CheckboxGroup
                            title="Type of Waste:"
                            name="wasteType"
                            options={wasteTypeOptions}
                            defaultValue={entry.tagType}
                            className={errors.tagType ? 'error' : ''}
                        />
                        {errors.tagType && <p className="error-text">{errors.tagType}</p>}
                    </div>

                    <div className="form-group">
                        <SelectDropdown
                            label="Approximate Amount:"
                            name="amount"
                            options={amountOptions}
                            defaultValue={entry.amount}
                            className={errors.amount ? 'error' : ''}
                        />
                        {errors.amount && <p className="error-text">{errors.amount}</p>}
                    </div>

                    <div className="form-group">
                        <SelectDropdown
                            label="What did you do with it?"
                            name="wasteAction"
                            options={wasteActionOptions}
                            defaultValue={entry.action}
                            className={errors.action ? 'error' : ''}
                        />
                        {errors.action && <p className="error-text">{errors.action}</p>}
                    </div>

                    <div className="form-group">
                        <TextInput
                            {...itemDetailsInput}
                            defaultValue={entry.items}
                            className={errors.items ? 'error' : ''}
                        />
                        {errors.items && <p className="error-text">{errors.items}</p>}
                    </div>

                    <TextareaInput
                        {...notesInput}
                        defaultValue={entry.notes || ''}
                    />

                    {/* <FileUploadInput {...uploadField} /> */}

                    <FormButtons
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        submitLabel={isSubmitting ? "Saving..." : "Submit Log Entry"}
                        disabled={isSubmitting}
                    />
                </form>
            </main>
        </>
    );
}

export default InputLog;