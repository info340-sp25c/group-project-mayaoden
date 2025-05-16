function InputLog() {
    
    const handleRedirect = () => {
        window.location.href = './log.html';
    };

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
                    <label htmlFor="waste-type">Type of Waste:</label>
                    <div id="waste-type" className="form-element checkboxes">
                        <input type="checkbox" id="plastic" aria-label="Plastic" /> Plastic<br />
                        <input type="checkbox" id="paper" aria-label="Paper" /> Paper<br />
                        <input type="checkbox" id="food" aria-label="Food" /> Food<br />
                        <input type="checkbox" id="glass" aria-label="Glass" /> Glass<br />
                        <input type="checkbox" id="other-waste" aria-label="Other" /> Other<br />
                    </div>

                    {/* Amount */}
                    <label htmlFor="amount">Approximate Amount:</label>
                    <select className="form-element" id="amount" name="amount">
                        <option value="">-- Select One --</option>
                        <option>Small (fits in your hand)</option>
                        <option>Medium (fills a small bag)</option>
                        <option>Large (fills a bin or more)</option>
                    </select>

                    {/* Waste Reduction Actions */}
                    <label htmlFor="waste-action">What did you do with it?</label>
                    <div id="waste-action" className="form-element checkboxes">
                        <input type="checkbox" id="recycled" aria-label="Recycled" /> Recycled<br />
                        <input type="checkbox" id="composted" aria-label="Composted" /> Composted<br />
                        <input type="checkbox" id="reused" aria-label="Reused" /> Reused<br />
                        <input type="checkbox" id="repurposed" aria-label="Repurposed" /> Repurposed<br />
                        <input type="checkbox" id="other-action" aria-label="Other" /> Other<br />
                    </div>

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
