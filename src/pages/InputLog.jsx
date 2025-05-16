import CheckboxGroup from '../components/CheckboxGroup';

function InputLog() {
    
    const handleRedirect = () => {
        window.location.href = './log.html';
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

    return (
        <>
            <header>
                <h1>🌱 Waste Reduction Input Log</h1>
                <p>Log your waste to reduce your impact and gain points!</p>
            </header>
            <main>
                <form>
                    {/* Date */}
                    <label htmlFor="date">Date:</label>
                    <input className="form-element" type="date" id="date" name="date" />

                    {/* Type of Waste */}
                    <CheckboxGroup title="Type of Waste:" name="wasteType" options={wasteTypeOptions} />

                    {/* Amount */}
                    <label htmlFor="amount">Approximate Amount:</label>
                    <select className="form-element" id="amount" name="amount">
                        <option value="">-- Select One --</option>
                        <option>Small (fits in your hand)</option>
                        <option>Medium (fills a small bag)</option>
                        <option>Large (fills a bin or more)</option>
                    </select>

                    {/* Waste Reduction Actions */}
                    <CheckboxGroup title="What did you do with it?" name="wasteAction" options={wasteActionOptions} />

                    {/* Item Details */}
                    <label htmlFor="items">Items Involved + Actions Taken:</label>
                    <input className="form-element" type="text" id="items" name="items" placeholder="e.g. composted food scraps, reused glass jar" />

                    {/* Notes */}
                    <label htmlFor="notes">Notes (optional):</label>
                    <textarea className="form-element" id="notes" name="notes" rows="4" placeholder="Any extra info you'd like to add..." />

                    {/* Upload */}
                    <label htmlFor="upload">Upload a photo (optional):</label>
                    <input className="form-element" type="file" id="upload" name="upload" />

                    {/* Submit / Cancel */}
                    <div className="form-buttons">
                        <button type="button" className="submit-button" onClick={handleRedirect}>
                        Submit Log Entry
                        </button>
                        <button type="button" className="cancel-button" onClick={handleRedirect}>
                        Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default InputLog;
