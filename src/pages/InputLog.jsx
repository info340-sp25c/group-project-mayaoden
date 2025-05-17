import CheckboxGroup from '../components/CheckboxGroup';
import PageHeader from '../components/PageHeader';
import DateInput from '../components/DateInput';
import SelectDropdown from '../components/SelectDropdown';
import TextInput from '../components/TextInput';
import TextareaInput from '../components/TextareaInput';
import FileUploadInput from '../components/FileUpload';
import FormButtons from '../components/FormButtons';

function InputLog() {
    
    const handleRedirect = () => {
        window.location.href = '/log';
    };

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

    return (
        <>
            <PageHeader 
                title="🌱 Waste Reduction Input Log"
                subtitle="Log your waste to reduce your impact and gain points!"
            />
            <main>
                <form>
                    {/* Date */}
                    <DateInput />

                    {/* Type of Waste */}
                    <CheckboxGroup title="Type of Waste:" name="wasteType" options={wasteTypeOptions} />

                    {/* Amount */}
                    <SelectDropdown label="Approximate Amount:" name="amount" options={amountOptions} />

                    {/* Waste Reduction Actions */}
                    <CheckboxGroup title="What did you do with it?" name="wasteAction" options={wasteActionOptions} />

                    {/* Item Details */}
                    <TextInput {...itemDetailsInput} />

                    {/* Notes */}
                    <TextareaInput {...notesInput} />

                    {/* Upload */}
                    <FileUploadInput {...uploadField} />

                    {/* Submit / Cancel */}
                    <FormButtons onSubmit={handleRedirect} onCancel={handleRedirect} submitLabel="Submit Log Entry" />
                </form>
            </main>
        </>
    );
}

export default InputLog;
