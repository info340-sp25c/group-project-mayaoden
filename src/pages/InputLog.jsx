import { useLocation } from 'react-router-dom';
import { saveLog, updateLog } from '../db';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CheckboxGroup from '../components/CheckboxGroup';
import PageHeader from '../components/PageHeader';
import DateInput from '../components/DateInput';
import SelectDropdown from '../components/SelectDropdown';
import TextInput from '../components/TextInput';
import TextareaInput from '../components/TextareaInput';
import FileUploadInput from '../components/FileUpload';
import FormButtons from '../components/FormButtons';

function InputLog() {
    const location = useLocation();
    const entry = location.state?.entry || {};
    const isEdit = Boolean(entry.id);

    const [errors, setErrors] = useState({});

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
        { label: 'Reused', value: 'reused' },
        { label: 'Repurposed', value: 'repurposed' },
        { label: 'Other', value: 'other' },
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

    function handleSubmit(e) {
        e.preventDefault();
        const form = e.target.form || e.target.closest('form');
        const formData = new FormData(form);

        const date = formData.get("date");
        const tagType = formData.getAll("wasteType");
        const amount = formData.get("amount");
        const action = formData.getAll("wasteAction");
        const items = formData.get("items");
        const notes = formData.get("notes");

        const newErrors = {};
        if (!date) newErrors.date = "Date is required.";
        if (!tagType.length) newErrors.tagType = "Please select a type of waste.";
        if (!amount) newErrors.amount = "Please select an amount.";
        if (action.length === 0) newErrors.action = "Please select an action.";
        if (!items) newErrors.items = "This field is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const newEntry = {
            id: entry.id || uuidv4(),
            date,
            tagType,
            tagLabel: tagType.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
            amount,
            action,
            items,
            notes,
            timestamp: Date.now()
        };

        if (isEdit) {
            updateLog(entry.id, newEntry);
        } else {
            saveLog(newEntry);
        }

        window.location.href = '/log';
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
                        <CheckboxGroup
                            title="What did you do with it?"
                            name="wasteAction"
                            options={wasteActionOptions}
                            defaultValue={entry.action || []}
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

                    <FileUploadInput {...uploadField} />

                    <FormButtons
                        onSubmit={handleSubmit}
                        onCancel={() => window.location.href = "/log"}
                        submitLabel="Submit Log Entry"
                    />
                </form>
            </main>
        </>
    );
}

export default InputLog;
